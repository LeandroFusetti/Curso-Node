const {response} = require('express')

const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const usuariosGet=async(req, res= response)=> {
    //const {nombre,apellido='no apellido',page=1} = req.query
    const{limite=5,desde=0}=req.query
    
    
    const [total,usuarios] = await Promise.all([
        //cuenta usuarios en estado true
        Usuario.countDocuments({estado:true}) ,
        //busca los usuarios con estado true
        Usuario.find({estado:true})
        .skip(desde)
        .limit(limite)
    ])

    res.json({
        total,usuarios})
}


const usuariosPost =async (req, res= response)=>{
    
    const {nombre,correo, password,rol} = req.body
    const usuario = new Usuario({nombre,correo,password,rol})

   
    //encripta la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password= bcryptjs.hashSync(password,salt)

    //guarda en base de datos
    await usuario.save()
    res.json({
        
        
        usuario
    })
}
const usuariosPut =  async(req, res= response)=>{
    const {id} = req.params
    const {_id,password,google,correo,...resto}= req.body
    //encripto la contraseña que me amndan
if(password){
    const salt = bcryptjs.genSaltSync()
    resto.password= bcryptjs.hashSync(password,salt)
}
const usuario= await Usuario.findByIdAndUpdate(id,resto)

    res.json({
        usuario,
        msg:'put API - controlador'})
}
const usuariosPatch = (req, res= response)=>{
    res.json({
    
        msg:'patch API - controlador'})
}
const usuariosDelete = async(req, res= response)=>{
    const {id}=req.params

    //Fisicamente lo borramos
    //const usuario= await Usuario.findByIdAndDelete(id)

    const usuario= await Usuario.findByIdAndUpdate(id,{estado:false})
    const usuarioAutenticado = req.usuario
    res.json({usuario,usuarioAutenticado}
    
        )
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete

}