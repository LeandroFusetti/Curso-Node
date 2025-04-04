const {response}= require('express')
const path = require('path')
const { v4: uuidv4 } = require('uuid');


const subirArchivo=(files,extensionesValidas=['png','jpg','jpeg','gif'],carpeta='')=>{
    return new Promise((resolve,reject)=>{
        const {archivo} = files;
        const nombreCortado= archivo.name.split('.')
        const extension= nombreCortado[nombreCortado.length -1]
      
        //validar la extension
        if(!extensionesValidas.includes(extension.toLowerCase())){
           return reject(`la extension ${extension} no es permitida - ${extensionesValidas}`)
         
        }
        //le pone un identificador unico al nombre del arhivo, x si se sube varias veces el mismo archivo, lo pone con otro nombre unico
        const nombreTemp = uuidv4()+ '.'+ extension
        const uploadPath =path.join (__dirname , '../uploads/' ,carpeta, nombreTemp)
      
        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, (err) =>{
          if (err){
              
              return reject(err)
      
          }
      
          resolve(nombreTemp)
        });
    })
    
}


module.exports= {
    subirArchivo
}