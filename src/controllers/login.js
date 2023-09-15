//const usersList = require("../utils/users")
const {User} = require("../DB_connection")

const login = async (req,res)=>{
    try{
        const {email,password} = req.query

        if (!email||!password) return res.status(400).json({error:"Faltan datos"})

        const user = await User.findOne({
            where:{email:email}
        })
        
        if(!user) return res.status(404).json({error:"Usuario no encontrado"})
        
        if(user.password !== password) return res.status(403).json({error:"Contraseña incorrecta"})
        
        return res.status(200).json({access: true})
    }
    catch(error){
       res.status(500).json({error:error.message})
    }
        
}

module.exports = login

// const userLogin  = (req,res)=>{
//     const {email, password} = req.query
//     const login= {
//         access : true && !!usersList
//             .filter(user=>user.email === email)
//             .filter(trylog=>trylog.password === password).length
//     }
//     res.json(login)
// }
// module.exports = userLogin