const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
    {id: 1, name: "Scary Movie"},
    {id: 2, name: "Action"}
]

// CRUD 

// Read All
router.get('/', (req, res) => {
    res.send(genres)
})

// Read one
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const genre = genres.find(genre => genre.id === id);


    if(!genre){
        res.status(404).send(`Genre with the id: ${id} not found`)
        return;
    }

    res.send(genre)
})

router.post('/', (req, res) => {

    const result = validateGenre(req.body);

    if (result.error){
        res.status(400).send(result.error.message);
        return;
    }
    
    const genre = { id: genres.length + 1, genre: req.body.genre}
    genres.push(genre)
    res.send(genre)
})

router.put('/:id', (req, res) => {
    const id = parseFloat(req.params.id);

    const genre = genres.find(genre => genre.id === id);

    if(!genre){
        res.status(404).send(`Genre with the id of ${id} was not found.`);
        return;
    }

    //Validate if found

    const result = validateGenre(req.body)

    if(result.error){
        res.status(400).send(result.error.message)
        return;
    }

    genre.name = req.body.genre;
    res.send(genre);
})

router.delete('/:id', (req, res) => {
    const id = parseFloat(req.params.id);

    const genre = genres.find(genre => genre.id === id);

    if (!genre) {
        res.status(404).send(`Genre with the id of ${id} was not found.`);
        return;
    }

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
})

//Refactoring validation
function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    })

    const result = schema.validate(genre);
    return result

}

module.exports = router;