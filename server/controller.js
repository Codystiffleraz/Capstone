const dogs = require('./db.json')
let dogId = 4

// Get, Put, Push, Delete

module.exports = {
    getDogs: (req, res) => {
        res.status(200).send(dogs)
    },

    addDogs: (req, res) => {
        const {name, picture, description} = req.body

        let newDogsObject = {
            id: dogId,
            name: name,
            picture: picture,
            description: description, 
            likes: 0
        }

        dogs.push(newDogsObject)

        dogId++

        res.status(200).send(dogs)
    },

    
    deleteCats: (req,res) => {
        const index = dogs.findIndex(el => el.id === +req.params.id)

        dogs.splice(index, 1)

        res.status(200).send(dogs)
    },

    updateLikes: (req, res) => {
        const index = dogs.findIndex(el => el.id === +req.params.id)
        const {type} = req.body

        if(type === 'like'){
            dogs[index].likes++
        }else if(type === 'dislike'){
            dogs[index].likes--
        }

        res.status(200).send(dogs)
    }
    
}