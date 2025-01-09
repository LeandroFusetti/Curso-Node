
const empleados =[
    {
        id:1,
        nombre:"leandro"
    },
    {
        id:2,
        nombre:"salva"
    },
    {
        id:3,
        nombre:"gabo"
    }
]

const salarios=[
    {
        id:1,
        salario:500
    },
    {
        id:2,
        salario:2000
    }
]

const getEmpleado=(id, callback)=>{
    const empleado= empleados.find(e=>e.id===id)

    if(empleado){
        callback (null,empleado)
    
    }else {
        callback( `empleado con id ${id} no existe`)
    }
}

getEmpleado(3,(err,empleado)=>{

    if(err){
        console.log('Error!');
        return console.log(err);
        
    }
    console.log('empleado existe!');
    console.log(empleado);
    
})

const getSalario=(id,callback)=>{
    const salario= salarios.find(s=>s.id==id)?.salario

    if(salario){
        //si no hay error
        callback(null, salario)
    }else{
        //si hay error
        callback(`No existe salario para el empleado con id: ${id}`)
    }


}

getSalario(2,(err,salario)=>{
    if(err){
        return console.log(err);
        
    }else{
        console.log(`El salario del empleado es ${salario.salario}`);
        
    }
})

