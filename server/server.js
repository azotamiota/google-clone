const express = require('express')
const cors = require('cors')
const app = express()
const data = require('./data')

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1 style="text-align : center; padding: 1em">Welcome to the Google clone created by Aggie & Norbert</h1>')
})

app.get('/results', (req, res) => {
    res.json(data)
})

app.get('/results/random', (req, res) => {
    const randomResult = data[String(Math.ceil(Math.random() * Object.entries(data).length))]
    res.json(randomResult)
})

app.get('/results/:id', (req, res) => {
    const id = req.params.id
    if (!data[id]) {
        res.status(404).send('<h1 style="text-align : center; padding: 1em">No results found</h1>')
    } else {
        res.status(200).json(data[id])
    }
})


module.exports = app
