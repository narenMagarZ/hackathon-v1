import openAi from "../config/openai.js"

async function getCropHarvestingProcedure(prompt){
     const response = await openAi.chat.completions.create({
          messages:[{
               role:"user",
               content:prompt
          }],
          model:'gpt-3.5-turbo'
     })
     console.log(response.choices[0].message.content)
     const procedure = response.choices[0].message.content
     return procedure
}

export default getCropHarvestingProcedure