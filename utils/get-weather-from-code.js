


// Code	Description
// 0	Clear sky
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail

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