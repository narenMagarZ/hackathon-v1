import openAi from '../config/openai.js'

async function getSuggestedCrops(prompt){
     const response = await openAi.chat.completions.create({
          model:'gpt-3.5-turbo',
          messages:[{
               role:'user',
               content:prompt
          }]
     })
     const crops = response.choices[0].message.content
     const cropsInJson = JSON.parse(crops)
     return cropsInJson
}

export default getSuggestedCrops