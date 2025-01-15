const { leerInput, inquirerMenu ,pausa, listarLugares} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
const axios = require('axios')


const main = async ()=>{
    const busquedas = new Busquedas()
    let opt
    do {
        opt = await inquirerMenu()
        switch(opt){
            case 1:
                //mostrar mensaje
                const lugar = await leerInput('Ciudad: ')
                //buscar lugares
                const lugares = await busquedas.ciudad(lugar)
                //seleccionar el lugar
                const idSeleccionado = await listarLugares(lugares)
                //console.log({idSeleccionado});
                const lugarSeleccionado = lugares.find(lugar=>{
                   return lugar.id == idSeleccionado
                })
                console.log({lugarSeleccionado});
                const climaLugar =await busquedas.climaLugar(lugarSeleccionado.lat,lugarSeleccionado.lng)

                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad',lugarSeleccionado.nombre);
                console.log('Lat',lugarSeleccionado.lat);
                console.log('Lng',lugarSeleccionado.lng);
                console.log('Descripcion:',climaLugar.desc);

                console.log('Temperatura:',climaLugar.temp);
                console.log('Mínima:',climaLugar.max);
                console.log('Máxima:',climaLugar.min);

                
                
                
                
                
                
            break
        }
        if(opt !=0)await pausa()
        
        
    } while (opt!=0);
}
main()