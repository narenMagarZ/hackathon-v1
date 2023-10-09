import axios from "axios";

async function getClimate(lat,lng){
     const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`)
     const current_weather = response.data.current_weather
     return current_weather
}

export default  getClimate