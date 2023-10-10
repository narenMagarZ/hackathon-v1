
import openAi from "../config/openai.js";
async function fetchCropGrowTime(crop){
     const response = await openAi.chat.completions.create({
          messages:[{
               role:"user",
               content:`Acts as a pro farmer, return the time to grow ${crop} in a json format.Note: The json data should only contain period field, the period must be exact, int type and represents as month.In addition, no need to add introductio and conclusion.`
          }],
          model:"gpt-3.5-turbo"
     })
     console.log(response.choices[0].message.content)
     return JSON.parse(response.choices[0].message.content).period
}

export default fetchCropGrowTime