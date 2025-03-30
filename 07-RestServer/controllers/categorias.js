const{response}=require('express')
const{Categoria}=require('../models')

//obtenerCategorias - paginado - total - populate
const obtenerCategorias= async(req,res)=>{
    const{limite=5,desde=0}=req.query
    const query = {estado:true}
    const [total,categorias] = await Promise.all([
            //cuenta usuarios en estado true
            Categoria.countDocuments(query) ,
            //busca los usuarios con estado true
            Categoria.find(query).populate('usuario','nombre')
            .skip(desde)
            .limit(limite)
        ])

        res.json({
            total,categorias
        })
}


//obtenerCategoria - populate {}
const obtenerCategoria = async(req,res)=>{

    
        const {id}= req.params
        
        
        const categoriaDB = await Categoria.findById(id).populate('usuario','nombre')
        if(categoriaDB.estado){
            res.json({
                categoriaDB
            })
        }else{
            res.json({
                msg:"la categoria fue borrada"
            })
        }
        
   

   

}
//actualizarCategoria
const actualizarCategoria = async (req,res=resonse)=>{
    const{id}=req.params
    
    
    const {estado,usuario,...data}= req.body
    data.nombre=data.nombre.toUpperCase()
    data.usuario= req.usuario._id
    //el new es opcional
    const categoria= await Categoria.findByIdAndUpdate(id,data,{new:true}) 
    res.json({
        categoria,
        msg:'put API - controlador'})
}
//borrarCategoria - estado:false
const borrarCategoria = async (req,res=response)=>{
    const {id}=req.params
    //new para q se vean reflejados los cambios en la respuesta json
    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true})
    res.json({
        categoria,
        msg:'categoria borrada'
    })
}
const crearCategoria=async(req,res=response)=>{
    const nombre= req.body.nombre.toUpperCase()
    const categoriaDB =await Categoria.findOne({nombre})

if(categoriaDB){
    return res.status(400).json({
        msg:`La categoria ${categoriaDB.nombre}, ya existe`
    })
}

//generar la data a guardar
const data={
    nombre,
    usuario:req.usuario._id
}
const categoria= new Categoria(data)

await categoria.save()
res.status(201).json(categoria)
}

//guardar db

module.exports={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}