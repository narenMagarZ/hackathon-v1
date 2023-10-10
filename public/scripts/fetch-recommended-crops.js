import createCropCard from './create-crop-card.js'

navigator.geolocation.getCurrentPosition(data=>{
     const coord = data.coords
     const lat = coord.latitude
     const lng = coord.longitude
     fetch(`http://localhost:5000/api/suggestedcrops?lat=${lat}&lng=${lng}`).then(async res=>{
          const {suggestedCrops} = await res.json()
          const recommendedCropContainer = document.getElementById('recommended-crop-container')
          const spinner = document.getElementById('spinner')
          if(spinner){
               recommendedCropContainer.removeChild(spinner)
          }
          if(recommendedCropContainer){
               suggestedCrops.crops.forEach(({name})=>{
                    const containerDiv = createCropCard(name)
                    recommendedCropContainer.append(containerDiv)
               })
          }
     }).catch(err=>{
          console.error(err)
     })
})
