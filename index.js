const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json()) // req.body if it has.

const genres = [
    {id: 1, genre: "Scary Movie"},
    {id: 2, genre: "Action"}
]

app.get('/', (req, res) => {
    res.send("Hello moh")
})

// CRUD 

// Read All
app.get('/api/genres', (req, res) => {
    res.send(genres)
})

// Read one
app.get('/api/genres/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const genre = genres.find(genre => genre.id === id);


    if(!genre){
        res.status(404).send(`Genre with the id: ${id} not found`)
        return;
    }

    res.send(genre)
})

app.post('/api/genres', (req, res) => {

    const result = validateGenre(req.body);

    if (result.error){
        res.status(400).send(result.error.message);
        return;
    }
    
    const genre = { id: genres.length + 1, genre: req.body.genre}
    genres.push(genre)
    res.send(genre)
})

app.put('/api/genres/:id', (req, res) => {
    const id = parseFloat(req.params.id);

    const genre = genres.find(genre => genre.id === id);

    if(!genre){
        res.status(404).send(`Course with the id of ${id} was not found.`);
        return;
    }

    //Validate if found
    

    const result = validateGenre(req.body)

    if(result.error){
        res.status(400).send(result.error.message)
        return;
    }

    genre.genre = req.body.genre;
    res.send(genre);
})



//Refactoring validation
function validateGenre(genre){
    const schema = Joi.object({
        genre: Joi.string().min(5).required()
    })

    const result = schema.validate(genre);
    return result

}


// Listen
const port = process.env.PORT || 3001;


app.listen(port)