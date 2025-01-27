const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')


class Server{
    constructor(){
        this.app= express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.middlewares()
        //rutas de mi app
        this.routes()

        //conectar a base de datos
        this.conectarDB()

    }
    async conectarDB(){
          await dbConnection()  
    }
    middlewares(){
      //cors
      this.app.use(cors())
      //lectura y parseo del body
      this.app.use(express.json())
        //directorio publico
        this.app.use(express.static('public'))
    }
    routes(){
       this.app.use(this.usuariosPath,require('../routes/usuarios'))
    }


    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log('Servidor corriendo en puerto',this.port);
            
        })
    }


}

module.exports= Server