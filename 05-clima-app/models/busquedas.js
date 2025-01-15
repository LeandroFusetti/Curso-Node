require('dotenv').config()
const axios = require('axios')

class Busquedas {

    historial = []

    constructor (){

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
}

module.exports= Busquedas