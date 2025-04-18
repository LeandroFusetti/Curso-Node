const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
const fileUpload = require('express-fileUpload')


class Server{
    constructor(){
        this.app= express()
        this.port = process.env.PORT

        this.paths={
            auth: '/api/auth',
            buscar: '/api/buscar',
            uploads:'/api/uploads',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos:'/api/productos',

        }
        // this.usuariosPath = '/api/usuarios'
        
        // this.authPath = '/api/auth'
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
        //fileupload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true //me crea la carpeta si no existe
        }));

    }
    routes(){
        this.app.use(this.paths.auth,require('../routes/auth'))
        this.app.use(this.paths.buscar,require('../routes/buscar'))
       this.app.use(this.paths.usuarios,require('../routes/usuarios'))
       this.app.use(this.paths.categorias,require('../routes/categorias'))
       this.app.use(this.paths.productos,require('../routes/productos'))
       this.app.use(this.paths.uploads,require('../routes/uploads'))

       



    }


    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log('Servidor corriendo en puerto',this.port);
            
        })
    }


}

module.exports= Server