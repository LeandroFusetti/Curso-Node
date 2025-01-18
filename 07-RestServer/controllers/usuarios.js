const {response} = require('express')

const usuariosGet=(req, res= response)=> {
    const {nombre,apellido='no apellido',page=1} = req.query
    res.json({
    nombre,
    apellido,
    page,
    msg:'get API - controlador'})
}


const usuariosPost = (req, res= response)=>{

    const body = req.body
    res.json({
        
        msg:'post API - controlador',
        body
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