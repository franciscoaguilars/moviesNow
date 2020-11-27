const express = require('express');
const genres = require('./routes/genres');
const app = express();


app.use(express.json()) // req.body if it has.
app.use('/api/genres', genres);


// Listen
const port = process.env.PORT || 3001;


app.listen(port)