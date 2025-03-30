const{response}=require('express')
const{Producto}=require('../models')

//obtenerCategorias - paginado - total - populate
const obtenerProductos= async(req,res)=>{
    const{limite=5,desde=0}=req.query
    const query = {estado:true}
    const [total,productos] = await Promise.all([
            //cuenta usuarios en estado true
            Producto.countDocuments(query) ,
            //busca los usuarios con estado true
            Producto.find(query).populate('usuario','nombre')
            .populate('categoria','nombre')

            .skip(desde)
            .limit(limite)
        ])

        res.json({
            total,productos
        })
}


//obtenerCategoria - populate {}
const obtenerProducto = async(req,res)=>{

    
        const {id}= req.params
        
        
        const productoDB = await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre')
        if(productoDB.estado){
            res.json({
                productoDB
            })
        }else{
            res.json({
                msg:"el Producto fue borrada"
            })
        }
        
   

   

}
//actualizarCategoria
const actualizarProducto = async (req,res=response)=>{
    const{id}=req.params
    
    
    const {estado,usuario,...data}= req.body
    if(data.nombre){
        data.nombre = data.nombre.toUpperCase()
    }
    
    data.usuario= req.usuario._id
    //el new es opcional
    const producto= await Producto.findByIdAndUpdate(id,data,{new:true}) 
    res.json({
        producto,
        msg:'put API - controlador'})
}
//borrarCategoria - estado:false
const borrarProducto = async (req,res=response)=>{
    const {id}=req.params
    //new para q se vean reflejados los cambios en la respuesta json
    const producto = await Producto.findByIdAndUpdate(id,{estado:false},{new:true})
    res.json({
        producto,
        msg:'producto borrado'
    })
}
const crearProducto=async(req,res=response)=>{
    const {estado,usuario,...body}= req.body
    
    
    const productoDB = await Producto.findOne({nombre:body.nombre.toUpperCase()})

if(productoDB){
    return res.status(400).json({
        msg:`El producto ${productoDB.nombre}, ya existe`
    })
}

//generar la data a guardar
const data={
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario:req.usuario._id
}
const producto= new Producto(data)

await producto.save()
res.status(201).json(producto)
}

//guardar db

module.exports={
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}