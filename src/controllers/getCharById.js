const axios = require("axios")
const URL = "https://rickandmortyapi.com/api/character"

// const getCharById = (req,res)=>{ //Implementacion con promesas
//     axios.get(`${URL}/${req.params.id}`)
//         .then(({data})=>{
//              const character = {
//                     id: data.id,
//                     status: data.status,
//                     name: data.name,
//                     species: data.species,
//                     origin: data.origin,
//                     image: data.image,
//                     gender: data.gender
//                 }
//                 res.json(character)
//         })
//         .catch((error)=>{
//             if(error.response.status=== 404)res.status(404).send("Not found")
//             else res.status(500).send(error.message) 
//         })
        
// }
const getCharById = async (req,res)=>{ //implementacion con asynmc await
    try{
        const {data} = await axios.get(`${URL}/${req.params.id}`)
        const character = {
               id: data.id,
               status: data.status,
               name: data.name,
               species: data.species,
               origin: data.origin,
               image: data.image,
               gender: data.gender
           }
           res.status(200).json(character)
    }
    catch(error){
            if(error.response.status=== 404)res.status(404).json({error:"Not found"})
            else res.status(500).json({error:error.message}) 
    }
}

module.exports = getCharById