const { leerInput, inquirerMenu ,pausa, listarLugares} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");



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
                if(idSeleccionado=='0')continue
                
                const lugarSeleccionado = lugares.find(lugar=>lugar.id == idSeleccionado  )
                
                //guardar en DB
                busquedas.agregarHistorial(lugarSeleccionado.nombre)
                  
              
                //console.log({lugarSeleccionado});
                const climaLugar =await busquedas.climaLugar(lugarSeleccionado.lat,lugarSeleccionado.lng)

                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad'.green,lugarSeleccionado.nombre.yellow);
                console.log('Lat'.green,lugarSeleccionado.lat.yellow);
                console.log('Lng'.green,lugarSeleccionado.lng.yellow);
                console.log('Descripcion:'.green,climaLugar.desc.yellow);

                console.log('Temperatura:'.green,climaLugar.temp);
                console.log('Mínima:'.green,climaLugar.min);
                console.log('Máxima:'.green,climaLugar.max);

                
                
                
                
                
                
            break
            case 2:
                busquedas.historial.forEach((lugar,i)=>{
                    const idx =`${i+1}.`.green
                    console.log(`${idx}${lugar}`);
                    
                })
        }
        if(opt !=0)await pausa()
        
        
    } while (opt!=0);
}
main()