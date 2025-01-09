const name= "deadpool"

const real= "wade winston"

const normal = name + ' ' + real
const template= `${name} ${real}`  
console.log(normal);
console.log(template);


//objeto
const deadpool={
    nombre:"deadpool",
    apellido: "winston",
    poder: "regeneracion",
    edad:20,
    getNombre(){
        return `${this.nombre} ${this.apellido} ${this.poder}`
    }
}




function imprimirHeroe({nombre,apellido,poder,edad=0}){
    
    
    console.log(nombre,apellido,poder,edad);
}
imprimirHeroe(deadpool)


const heroes =["deadpool", "superman","batman"]

const [ , , h3]= heroes

console.log(h3);
