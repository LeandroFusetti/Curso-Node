const fs = require('fs')
require('dotenv').config()
const axios = require('axios')

class Busquedas {

    historial = []
    dbPath= './db/database.json'
    constructor (){
        this.leerDb()
        
    }
    async ciudad (lugar= ''){

        try {

        const intance = axios.create({
            baseURL:`https://nominatim.openstreetmap.org/search?q=${lugar}&format=json`
        })
            //const resp = await axios.get(`https://nominatim.openstreetmap.org/search?q=${lugar}&format=json`)
        const resp = await intance.get()
            //console.log(resp.data);

        return resp.data.map(lugar=>({
            id: lugar.place_id,
            nombre: lugar.display_name,
            lng:lugar.lon,
            lat: lugar.lat,


        }))
        } catch (error) {
            return []
        }
        
        
        
    }
    get paramsOpenWeather(){
        return {
            'appid':process.env.OPENWEATHER_KEY,
            'lang':'es',
            'units':'metric'
            
        }
    }

    async climaLugar (lat,lon){
        
        try {
            const intance =axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather?`,
                params: {...this.paramsOpenWeather,lat,lon}

            })
            const resp = await intance.get()
            //console.log(resp.data);
            
            return {
                desc:resp.data.weather[0].description,
                min:resp.data.main.temp_min,
                max:resp.data.main.temp_max,
                temp:resp.data.main.temp
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    agregarHistorial(lugar=''){
        if(this.historial.includes(lugar)){
            return;
        }
        this.historial = this.historial.splice(0,5)
        this.historial.unshift(lugar)
        this.guardarDb()
    }

    guardarDb(){
        const payload ={
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath,JSON.stringify(payload))
    }
    leerDb(){
        if(!fs.existsSync(this.dbPath)){
            return
        }
        const info = fs.readFileSync(this.dbPath,{encoding:'utf-8'})
        const data= JSON.parse(info)
        this.historial = data.historial
        
        
    }
}



module.exports= Busquedas