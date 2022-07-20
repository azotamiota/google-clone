const express = require('express')
const app = express()
const data = require('./data')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1 style="text-align : center; padding: 1em">Welcome to the Google clone created by Aggie & Norbert</h1>')
})

app.get('/results', (req, res) => {
    res.json(data)
})


module.exports = app
