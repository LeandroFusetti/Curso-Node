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

const getEmpleado  = (id)=>{
    return new Promise ((resolve,reject)=>{
    const empleado= empleados.find(e=>e.id===id)
        empleado?resolve(empleado):reject(`No existe el empleado de id ${id}`)


    })
}

const getSalario =(id)=>{
    return new Promise((resolve,reject)=>{
        const salario= salarios.find(s=>s.id==id)?.salario
        salario?resolve(salario):reject(`No existe salario para el empleado de id ${id}`)
    })
}


const id=4

/*
getEmpleado(id)
    .then(empleado=>console.log(empleado))
    .catch(err=>console.log(err))

getSalario(id)
    .then(salario=>console.log(`el salario del empleado id: ${id} es de ${salario}`))
    .catch(err=>console.log(err))

*/
getEmpleado(id)
    .then(empleado=>{
            getSalario(id)
                .then(salario=>{console.log(`El empleado ${empleado.nombre} de id: ${id} tiene un salario de ${salario}`)})
                .catch(err=>console.log(err)) 
            })
    .catch(err=>console.log(err))