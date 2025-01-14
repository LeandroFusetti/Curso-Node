const inquirer = require("inquirer").createPromptModule();
require("colors");

const preguntas = [
  {
    type: "list",
    name: "option",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${("1.").green} Crear tarea`,
      },
      {
        value: "2",
        name: `${("2.").green} Listar tareas`,
      },
      {
        value: "3",
        name: `${("3.").green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${("4.").green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${("5.").green} Completar tareas`,
      },
      {
        value: "6",
        name: `${("6.").green} Borrar tareas`,
      },
      {
        value: "0",
        name: `${("0.").green} Salir`,
      }
    ]
  }
];

const inquirerMenu = async () => {
  
    
    console.clear()
    console.log("=======================".green);
    console.log(" Seleccione una opcion".white);
    console.log("=======================\n".green);

  const { option } = await inquirer(preguntas);
  

  return option;
}

const pausa = async () => {
    
  const pausaContinuar = [
    {
      type: "input",
      name: "continuar",
      message: `\nPresione ${"Enter".green} para continuar\n`,
    },
  ]
  const { continuar } = await inquirer(pausaContinuar);
  return continuar;
}

const leerInput = async (message) => {
    
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      }
    }
  ]

  const {desc}= await inquirer(question)
  return desc
}


const listadoTareasBorrar = async (tareas=[])=>{

  const choices = tareas.map((tarea,i)=>{
    const idx = `${i + 1}.`.green

    return{
      value: tarea.id,
      name: `${idx}${tarea.desc}`
    }
  })
  choices.unshift({
    value:'0',
    name: '0.'.green + 'Cancelar'
  })
  const preguntas= [
    {
      type:'list',
      name:'id',
      message: 'Borrar',
      choices
    }
  ]
  //devuelve un objeto con el nombre que esta en name
  const { id } = await inquirer(preguntas);
  return id
    /*
    {
        value: "1",
        name: `${("1.").green} Crear tarea`,
      }
        */
}

const confirmar= async(message)=>{
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]
  const {ok}= await inquirer(question)
  return ok
}
const mostrarListadoChecklist = async (tareas=[])=>{

  const choices = tareas.map((tarea,i)=>{
    const idx = `${i + 1}.`.green

    return{
      value: tarea.id,
      name: `${idx}${tarea.desc}`,
      checked: (tarea.completadoEn) ? true : false
    }
  })
 
  const preguntas= [
    {
      type:'checkbox',
      name:'ids',
      message: 'Selecciones',
      choices
    }
  ]
  //devuelve un objeto con el nombre que esta en name
  const { ids } = await inquirer(preguntas);
  return ids
   
}
module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
};
