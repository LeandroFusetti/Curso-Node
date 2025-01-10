const inquirer = require('inquirer').createPromptModule()
require('colors')

const preguntas =[
    {
        type:'list',
        name:'option',
        message:'¿Que desea hacer?',
        choices:[
            {
                value: '1',
                name:'1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tareas'
            
            },
            {
                value: '3',
                name: '3. Listar tareas compleatadas'
            },
            {
                value:'4',
                name:'4. Listar tareas pendientes' 
            },
            {
                value:'5',
                name:'5. Completar tarea(s)'
            },
            {
                value:'6',
                name: '6. Borrar tarea'
            },
            {
                value: '0',
                name: '0. Salir'
            }
    


        ]
    }
]




const inquirerMenu = async()=>{
    console.clear();
    console.log('======================='.green);
    console.log(' Seleccione una opcion'.green);

    console.log('=======================\n'.green);

    const {option} = await inquirer(preguntas)
    //console.log(option);
    
    return option
}

const pausa = async()=>{
    const pausaContinuar=[
        {
            type:'input',
            name:'continuar',
            message:`\nPresione ${'Enter'.green} para continuar\n`,
        }
    ]
    const{continuar}=await inquirer(pausaContinuar)
    return continuar
}


module.exports={
    inquirerMenu,pausa
}