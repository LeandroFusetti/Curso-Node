const Tarea = require('./tarea')

class Tareas{
    _listado={}

    get listadoArr(){
        const listado= []
        Object.keys(this._listado).forEach(key=>{
            listado.push(this._listado[key])
            
        })
        return listado
    }
    constructor(){
        this._listado= {}
    }
    //carga las tareas leidas de la base de datos
    cargarTareasFromArray(tareas=[]){
        tareas.forEach(tarea=>this._listado[tarea.id]=tarea)
        
    }
    crearTarea(desc=''){
        const tarea= new Tarea(desc)
        this._listado[tarea.id]=tarea
    }

    listadoCompleto(){
        //console.log(this._listado);
        /*
        for(let i=1;i<=this.listadoArr.length;i++){
            console.log(`${i.toString().green}${(".").green} ${this.listadoArr[i-1].desc}::`,this.listadoArr[i-1].completadoEn ==null?"Pendiente".red:"Completado".green);
           
        }
        */    

        this.listadoArr.forEach((tarea,i)=>{
            
            const idx= (i+1).toString().green + (".").green
            const{desc, completadoEn} = tarea
            const estado= completadoEn 
                                ? 'Completado'.green
                                : 'Pendiente'.red

            
            console.log(`${idx} ${desc} :: ${estado}`);
            
        })
       

        
    }

    borrarTarea(id=''){
        if(this._listado[id]){
            delete this._listado[id]
        }
    }
    listarPendientesOCompletadas(completadas=true){
            //let listado= []
           const listado =  this.listadoArr.filter((tarea)=> completadas?tarea.completadoEn != null : tarea.completadoEn ==null )
           //console.log(this.listadoArr);
           /*
           if(completadas){
                listado= this.listadoArr.filter((tarea)=>tarea.completadoEn !=null)
                console.log("entro en completadas");
                
            }else {
                listado= this.listadoArr.filter((tarea)=>tarea.completadoEn == null)
                console.log("entro en pendientes");

            }*/
            
            
            listado.forEach((tarea,i)=>{
                const idx= (i+1).toString().green + (".").green
                const{desc, completadoEn} = tarea
                const estado= completadoEn 
                                    ? completadoEn.green
                                    : 'Pendiente'.red
                console.log(`${idx} ${desc} :: ${estado}`);
                
            })
            
            
        
    }

}


module.exports=Tareas