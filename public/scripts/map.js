

navigator.geolocation.getCurrentPosition((data)=>{
     
     const coords = data.coords
     const lat = coords.latitude
     const lng = coords.longitude
     const zoom = 6
     const map = L.map('map').setView([lat,lng],zoom)
     // needs to fetch geojson data 
     const search_button = document.getElementById("search-btn")
     const searchField = document.getElementById('search_bar')

     search_button.addEventListener('click',()=>{
          console.log(searchField.dataset)
          const dataset = searchField.dataset
          const coord = JSON.parse(dataset.id)
          const marker = L.marker([coord.latitude,coord.longitude]).addTo(map)
          map.setView(marker.getLatLng(), 8)
     })
     
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
          .addTo(map);
          fetch('http://localhost:5000/map/map.geojson')
          .then(async res=>{
               const mapData = await res.json()
               L.geoJSON(mapData,{
                    style:(feature)=>{
                         return {color:feature.properties.fill}
                    }
               }).addTo(map)
          map.on('click',(e)=>{
               const latlng = e.latlng
               const lat = latlng.lat
               const lng = latlng.lng
               L.popup()
               .setLatLng(latlng)
               .setContent("Loading...")
               .openOn(map)
               fetch(`http://localhost:5000/api/soildata?lat=${lat}&lng=${lng}`).then(async res=>{
                    const data = await res.json()
                    console.log(data)
                    const {suggestedCrops,climate,soilData} = data
                    L.popup()
                    .setLatLng(latlng)
                    .setContent(`
                         <p class="m-0">
                              Weather: <span class="fw-bold text-success">${climate.weather}</span>
                         </p>
                         <p class="m-0">
                              Soil type: <span class="fw-bold text-success">${soilData.parentsoil}</span>
                         </p>
                    `)
                    .openOn(map)
                    const soilDataCard = document.getElementById('soil-data-card')
                    if(soilDataCard){
                         soilDataCard.innerHTML = ""
                         soilDataCard.append(climateInfo(climate))
                         soilDataCard.append(soilInfo(soilData))
                         // soilDataCard.append(suggestedCropsInfo(suggestedCrops.crops))
                    }
               }).catch(err=>{
                    console.error(err)
               })
          })

     })
     .catch(err=>{
          console.error(err)
     })
})

function climateInfo(climate){
     const {time,temperature,weather,winddirection,windspeed} = climate
     const climateWrapper = createDiv()
     const div = createDiv()
     const p0 = createP()
     p0.innerText = "Climate"
     addClass(p0,["fw-bold"])
     div.append(p0)
     div.append(climateWrapper)
     addClass(climateWrapper,["p-0","pt-0","text-secondary"])
     const p1 = createP()
     p1.innerText = "Temperature: "
     const span1 = createSpan()
     span1.innerText = temperature
     p1.append(span1)
     const p2 = createP()
     p2.innerText = "Time:"
     const span2 = createSpan()
     span2.innerText = time
     p2.append(span2)
     const p3 = createP()
     p3.innerText = "Weather: "
     const span3 = createSpan()
     span3.innerText = weather
     p3.append(span3)
     const p4 = createP()
     p4.innerText = "Wind direction: "
     const span4 = createSpan()
     span4.innerText = winddirection
     p4.append(span4)
     const p5 = createP()
     p5.innerText = "Wind speed: "
     const span5 = createSpan()
     span5.innerText = windspeed 
     p5.append(span5)
     climateWrapper.append(p1)
     climateWrapper.append(p2)
     climateWrapper.append(p3)
     climateWrapper.append(p4)
     climateWrapper.append(p5)
     addClass(span1,["text-success"])
     addClass(span2,["text-success"])
     addClass(span3,["text-success"])
     addClass(span4,["text-success"])
     addClass(span5,["text-success"])
     return div
}


function soilInfo(soil){
     const {parentsoil,totalNitrogen,sand,ph,boron,clay,organicMatter} = soil
     const soilWrapper = createDiv()
     const div = createDiv()
     const p0 = createP()
     p0.innerText = "Soil"
     addClass(p0,["fw-bold"])
     div.append(p0)
     div.append(soilWrapper)
     addClass(soilWrapper,["p-0","pt-0","text-secondary"])
     const p1 = createP()
     p1.innerText = "Parent soil:"
     const span1 = createSpan()
     span1.innerText = parentsoil
     p1.append(span1)
     const p2 = createP()
     p2.innerText = "Nitrogen:"
     const span2 = createSpan()
     span2.innerText = totalNitrogen
     p2.append(span2)
     const p3 = createP()
     p3.innerText = "Sand: "
     const span3 = createSpan()
     span3.innerText = sand
     p3.append(span3)
     const p4 = createP()
     p4.innerText = "Ph: "
     const span4 = createSpan()
     span4.innerText = ph
     p4.append(span4)
     const p5 = createP()
     p5.innerText = "Boron: "
     const span5 = createSpan()
     span5.innerText = boron 
     p5.append(span5)
     const p6 = createP()
     p6.innerText = "Clay: "
     const span6 = createSpan()
     span6.innerText = clay 
     p6.append(span6)
     const p7 = createP()
     p7.innerText = "Organic matter: "
     const span7 = createSpan()
     span7.innerText = organicMatter 
     p7.append(span7)
     soilWrapper.append(p1)
     soilWrapper.append(p2)
     soilWrapper.append(p3)
     soilWrapper.append(p4)
     soilWrapper.append(p5)
     soilWrapper.append(p6)
     soilWrapper.append(p7)
     addClass(span1,["text-success"])
     addClass(span2,["text-success"])
     addClass(span3,["text-success"])
     addClass(span4,["text-success"])
     addClass(span5,["text-success"])
     addClass(span6,["text-success"])
     addClass(span7,["text-success"])

     return div
}

function suggestedCropsInfo(crops){
     const div = createDiv()
     div.innerText = "Suggested Crops"
     addClass(div,["fw-bold"])
     const ul = createUl()
     crops.forEach(crop=>{
          const li = createLi()
          li.innerText = crop.name
          addClass(li,["text-success"])
          ul.append(li)
     })
     div.append(ul)
     return div
}


const createUl = ()=>document.createElement('ul')
const createLi = ()=>document.createElement('li')
const addClass = (elem,styleClass)=>elem.classList.add(...styleClass)
const createDiv = ()=>document.createElement('div')
const createP = ()=>document.createElement('p')
const createSpan = ()=>document.createElement('span')

