const {crearArchivo}= require("./helpers/multiplicar")
const argv = require('./config/yargs')
console.clear();



/*
const [,,arg3= base=1]=process.argv
const[,base=1]=arg3.split('=')
console.log(base);
*/


crearArchivo(argv.b,argv.l,argv.h)
    .then(nombreArchivo=>console.log(nombreArchivo,"creado"))
    .catch(err=>console.log(err))


//console.log(process.argv);
//console.log(argv);



