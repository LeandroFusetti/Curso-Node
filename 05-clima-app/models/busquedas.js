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
        
        
        return []
    }
}

module.exports= Busquedas