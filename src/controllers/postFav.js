const {Favorite}=require("../DB_connection")
//const {User}=require("../DB_connection")

const postFav = async (req,res)=>{
    try {
        const {id,name, origin, status, image, species , gender} = req.body
        if(!id||!name||!origin||!status||!image||!species||!gender)
            return res.status(401).json({error:"Faltan datos"})
        
        const newFavorite = await Favorite.findOrCreate({
            where:{id,name,origin,status,image,species,gender}
        })
        //User.addFavorite(newFavorite)
        const favs = await Favorite.findAll()

        return res.status(200).json(favs) 
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports = postFav