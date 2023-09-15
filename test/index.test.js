const app = require('../src/app');
const session = require('supertest');
const agent = session(app);

describe("Test de RUTAS", ()=>{
    describe('GET /rickandmorty/character/:id', ()=>{
        it('Responde con status: 200', async ()=>{
            await agent.get('/rickandmorty/character/1').expect(200)
        })
        
        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async ()=>{ 
            const response = await agent.get('/rickandmorty/character/1')
            expect(response.body).toHaveProperty("id", "name", "species", "gender", "status", "origin" , "image")
        })
        it('Si hay un error responde con status: 500', async ()=>{ 
            await agent.get('/rickandmorty/character/a').expect(500)
        })
        
        
    })
    describe('GET /rickandmorty/login', ()=>{
        it('Responde un objeto con la propiedad: "access"', async ()=>{ 
            const response = await agent.get('/rickandmorty/login?email=""&password=""')
            expect(response.body).toHaveProperty("access")
        })
        it('Responde con un objeto con la propiedad "access = true" cuando se Loguea corresctamente un usuario', async ()=>{ 
            const response2 = await agent.get('/rickandmorty/login/?email=myEmail@mail.com&password=asdFgtrew1')
            expect(response2.body.access).toBeTruthy()
        })
        it('Responde con un objeto con la propiedad "access = false" cuando se Loguea corresctamente un usuario', async ()=>{ 
            const response3 = await agent.get('/rickandmorty/login/?email=noemail@mail.com&password=incorrecta')
            expect(response3.body.access).toBeFalsy()
        })

    })
    const character = {id:1, name:'rick'}
    const character2 = {id:2, name:'morty'}
    describe("POST /rickandmorty/fav", ()=>{
        it('Agrega un personaje correctamente a favoritos', async ()=>{
            const response = await agent.post('/rickandmorty/fav').send(character)
            expect(response.body).toBeInstanceOf(Array)
        })
        it('Agrega otro personaje a favoritos y devuelve una array con los favoritos ya agregados', async ()=>{
            const response = await agent.post('/rickandmorty/fav').send(character2)
            expect(response.body).toContainEqual(character,character2)
        })
    })
    describe("DELETE /rickandmorty/fav/:id", ()=> {
        it("Si el character no existe devuelve todos los favs", async ()=>{
            const response = await agent.delete('/rickandmorty/fav/3')
            expect(response.body).toContainEqual(character,character2)
        })
        it("Si el character no existe se elimina correctamente de los favs", async ()=>{
            const response = await agent.delete('/rickandmorty/fav/1')
            expect(response.body).not.toContainEqual(character)
        })
    })

})