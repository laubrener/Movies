const { Router } = require('express');
const axios = require('axios');
const { Genre } = require('../db');

require('dotenv').config();
const { API_KEY } = process.env;

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const apiGenres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
        const genres = apiGenres.data.genres.map(el => {
            return {
                id: el.id,
                name: el.name
            }
        });
        res.send(genres);
    } catch (error) {
        console.log(error);
    }
    
})  



module.exports = router;