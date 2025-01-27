const {response} = require('express')

const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const usuariosGet=(req, res= response)=> {
    const {nombre,apellido='no apellido',page=1} = req.query
    res.json({
    nombre,
    apellido,
    page,
    msg:'get API - controlador'})
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
const usuariosPut =  (req, res= response)=>{
    const {id} = req.params
    res.json({
        id,
        msg:'put API - controlador'})
}
const usuariosPatch = (req, res= response)=>{
    res.json({
    
        msg:'patch API - controlador'})
}
const usuariosDelete = (req, res= response)=>{
    res.json({
    
        msg:'delete API - controlador'})
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete

}