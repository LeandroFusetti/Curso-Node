const argv= require("yargs")
                .option('b',{
                    alias: 'base',
                    type:'number',
                    demandOption:true,
                    describe:'Es la base de la tabla de multiplicar'
                })   
                .option('l',{
                    alias: 'listar',
                    type:'boolean',
                    default:false,
                    describe:'Imprime en consola lo del archivo'
                })
                .option('h',{
                    alias: 'hasta',
                    type:'number',
                    default: 10,
                    describe:'Indica hasta que numero llega la tabla'
                })
                .check((argv,options)=>{
                    if(isNaN(argv.b)){
                        throw 'La base tiene que ser un numero'
                    }
                    if(isNaN(argv.h)){
                        throw 'El limite tiene que ser un numero'
                    }
                    return true
                })           
                .argv

module.exports =argv