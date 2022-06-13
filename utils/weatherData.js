const request = require('request');
const constants = require('../config');

const weatherData = (address, callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    
    request({url, json:true}, (error, {body})=> {
        if(error) {
            callback("No disponible", undefined)
        } else if(!body.main || !body.main.temp || !body.name || !body.weather) {
            callback("No disponible, verifica los datos introducidos o prueba con otro nombre", undefined);
        } else {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
})
}

module.exports = weatherData;