const express = require('express');
const app = express();

app.use(express.json()) // req.body if it has.

const courses = [
    {id: 1, genre: "Scary Movie"},
    {id: 2, genre: "Action"}
]

app.get('/', (req, res) => {
    res.send("Hello moh")
})

// CRUD 

app.get('/api/courses', (req, res) => {
    res.send(courses)
})


// Listen
const port = process.env.PORT || 3001;


app.listen(port)