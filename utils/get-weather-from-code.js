
function getWeatherFromCode(code){
     const weather = new Map()
     weather.set(0,"Clear sky")
     weather.set(1,"Mainly clear")
     weather.set(2,"Partly cloudy")
     weather.set(3,"Overcast")
     weather.set(45,"Fog")
     weather.set(48,"Depositing rime fog")
     weather.set(51,"Drizzle: Light")
     weather.set(53,"Drizzle: Moderate")
     weather.set(55,"Drizzle: Dense")
     weather.set(56,"Freezing Drizzle: Light")
     weather.set(57,"Freezing Drizzle: Dense")
     weather.set(61,"Rain: Sligh")
     weather.set(63,"Rain: Moderate")
     weather.set(65,"Rain: Heavy")
     weather.set(66,"Freezing Rain: Light")
     weather.set(67,"Freezing Rain: Heavy")
     return weather.get(code)


}

export default getWeatherFromCode