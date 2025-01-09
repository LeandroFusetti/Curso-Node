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
    const empleado= empleados.find(e=>e.id===id)?.nombre
        empleado?resolve(empleado):reject(`No existe el empleado de id ${id}`)


    })
}

const getSalario =(id)=>{
    return new Promise((resolve,reject)=>{
        const salario= salarios.find(s=>s.id==id)?.salario
        salario?resolve(salario):reject(`No existe salario para el empleado de id ${id}`)
    })
}

const getInfoUsuario = async( id ) => {

    try {
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);
    
        return `El salario del empleado: ${ empleado } es de ${ salario }`;
        
    } catch (error) {
        return error;
    }
}


const id = 4;

getInfoUsuario( id )
    .then( msg => {
        console.log('TODO BIEN!')
        console.log(msg) 
    })
    .catch( err => {
        console.log('TODO MAL!')
        console.log( err ) 
    });