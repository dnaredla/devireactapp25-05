const request = require('request-promise');
const API_KEY = '6ef1b8c87a14fddae80ce6d5e1dbc77f';

class weather{
    static retrieveByCity(city, callback){
    request({
        uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`,
        json:true
    }).then(function(res){
        callback(res);
    }).catch(function(err){
            console.log(err);
            callback({error: 'could not reach openweathermap API.'});
    });
    }
}

module.exports = weather; 