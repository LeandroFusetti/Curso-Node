const{response}= require('express')

const validarArchivo = (req,res=response,next)=>{
    if (!req.files || Object.keys(req.files).length === 0||!req.files.archivo) {
        return res.status(400).json({
            msg:'no hay archivos que subir - validarArchivoSubir'});
      }
      //para q continue el siguiente middleware
      next()
}


module.exports={
    validarArchivo
}