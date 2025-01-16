const inquirer = require("inquirer").createPromptModule();
require("colors");

const preguntas = [
  {
    type: "list",
    name: "option",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: 1,
        name: `${("1.").green} Buscar ciudad`,
      },
      {
        value: 2,
        name: `${("2.").green} Historial`,
      },
      {
        value: 0,
        name: `${("0.").green} Salir`,
      },
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


const listarLugares = async (lugares=[])=>{

  const choices = lugares.map((lugar,i)=>{
    const idx = `${i + 1}.`.green

    return{
      value: lugar.id,
      name: `${idx}${lugar.nombre}`
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
      message: 'Seleccione lugar',
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

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
  confirmar,
  
};
