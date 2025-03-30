const {Schema,model}= require('mongoose')

const ProductoSchema= Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio'],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    precio:{
        type:Number,
        default:0,
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        required:true
    },
    descripcion:{types:String},
    disponible:{type:Boolean,default:true}
})

ProductoSchema.methods.toJSON= function(){
//saca el __v de lo que devuelve
//convierte el documento mongoose en un objeto js
    const{__v,estado, ...data}=this.toObject()
    
    return data
}

module.exports= model('Producto',ProductoSchema)