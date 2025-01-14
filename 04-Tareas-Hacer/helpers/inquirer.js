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


    /*
    {
        value: "1",
        name: `${("1.").green} Crear tarea`,
      }
        */
}


module.exports = {
  inquirerMenu,
  pausa,
  leerInput
};
