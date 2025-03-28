require('colors')

const {inquirerMenu,pausa,leerInput,listadoTareasBorrar,confirmar, mostrarListadoChecklist}=require('./helpers/inquirer')
const {guardarDB,leerDB}= require('./helpers/guardarArchivo')
const Tareas = require('./models/tareas')

const main = async()=>{
    
    
    let opt=''
    const tareas= new Tareas()
    //leo del archivo las tareas (base de datos)
    const tareasDB=leerDB()
    //
    if(tareasDB){
        //cargo y muestro las tareas en la consola
        tareas.cargarTareasFromArray(tareasDB)
    }
    
    do{
    
    
    console.clear()
    //menu con opciones de lo que quiero hacer
    opt = await inquirerMenu()
    
    
    switch(opt){
        case '1':
            const desc= await leerInput('Descripcion: ')
            tareas.crearTarea(desc)
            console.clear()
        break
        case '2':
            tareas.listadoCompleto();
        break
        case '3':
            tareas.listarPendientesOCompletadas(true)
            
        
        break
        case '4':
            

            tareas.listarPendientesOCompletadas(false)

            break
        case '5':
            const ids = await mostrarListadoChecklist(tareas.listadoArr)
            tareas.toggleCompletadas(ids)
            

            break    
        case '6':
            const id = await listadoTareasBorrar(tareas.listadoArr)  
            if(id !=='0'){
                const ok = await confirmar('¿Esta seguro?')
                if(ok){
                    tareas.borrarTarea(id)
                    console.log('Tarea borrada');
                    
                }
            }
            
            break
    }
    
   
    
    
    //console.log(tareas.listadoArr);
    //actualizo el archivo de la base de datos
    guardarDB(tareas.listadoArr)
    if(opt!='0')await pausa()
        
        
    
    
    }while (opt !='0')
    
}

main()