const fs=require("fs");
//const { argv } = require("process");
const crearArchivo =async(base=1,listar=false,hasta) =>{
const colors = require('colors')
try {
    
    let salida= ""
    let consola= ""
    
    for(let i=1;i<=hasta;i++){

        consola +=`${base} ${colors.green("x")} ${i} ${colors.green("=")}  ${base * i}\n`
        salida +=`${base} x ${i} = ${base * i}\n`
        
    }
    
    if(listar){
        console.log("==============================".yellow);
        console.log("====", "tabla de multiplicar".green ,"====");
        
        console.log("==============================".yellow);
        console.log(consola);
    }
  
    
    
    fs.writeFileSync(`./salida/tabla-${base}.txt`,salida)
    return `tabla-${base}.txt `;
} catch (error) {
    throw error
}

 

}

module.exports ={
    crearArchivo
}