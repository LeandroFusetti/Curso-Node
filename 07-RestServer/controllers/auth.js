const {response}= require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')
const {generarJWT}=require('../helpers/generar-jwt')
const { googleVerify } = require('../helpers/google-verify')

const login = async(req,res =response)=>{
    const {correo, password}=req.body

    try {
        //si el mail existe
        const usuario = await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos - correo'
            })
        }
        //si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos - estado:false'
            })
        }
        //verificar la constraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos - password'
            })
        }
        //generar el jwt
        const token = await generarJWT(usuario.id)
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
    
}


const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    
    try {
        const {correo,nombre,img}=await googleVerify(id_token)
        let usuario= await Usuario.findOne({correo})

        if(!usuario){
            //tengo q crearlo
            const data={
                nombre,
                correo,
                password:':P',
                google:true,
                rol:'ADMIN_ROLE'
            }
            usuario= new Usuario(data)
           
                
                await usuario.save()
            
        }
        //Si el usuario en db
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            })
        }
       
         //generar el JWT
         const token= await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);       
        res.status(400).json({
            msg:'El Token no se puedo verificar'
        })
    }
}



module.exports = {
    login,
    googleSignIn
}