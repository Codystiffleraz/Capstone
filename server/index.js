const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {
    getDogs, 
    addDogs,
    deleteCats,
    updateLikes
} = require("./controller")

app.get('/getDogs', getDogs)
app.post('/addDogs', addDogs)
app.delete('/deleteCats/:id', deleteCats)
app.put('/updateLikes/:id', updateLikes)

app.listen(1010, () => console.log('I think this works on port 1010'))