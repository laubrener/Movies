const { Router } = require('express');
const axios = require('axios');
const { Movie, Genre } = require('../db');

require('dotenv').config();
const { API_KEY } = process.env;

const router = Router();

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=1a3687f41687ec6075ab5b76373fe38d&language=en-US&page=1`);
    const apiInfo = await apiUrl.data.results.map(el => {
        return {
            id: el.id,
            genre_ids: [el.genre_ids.map(el => el)],
            original_language: el.original_language,
            original_title: el.original_title,
            overview: el.overview,
            poster_path: `https://image.tmdb.org/t/p/w500${el.poster_path}`,
            release_date: el.release_date,
            vote_average: el.vote_average,
        };
    });
    return apiInfo;
}

const getDbInfo = async () => {
    return await Movie.findAll({ 
        include:{ //traeme todos los datos e incluime el modelo genres
            model: Genre,
            attributes: ['name'], //incluime el atributo name del modelo
            through: {
                attributes: [],
            },
        }
    })
}

const getAllFilms = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/', async (req, res) => {
    try {
        const { original_title } = req.query;
        let allFilms = await getAllFilms();
        if (original_title) {
            let title = await allFilms.filter(el => el.original_title.toLowerCase().includes(original_title.toLowerCase()));
            title.length ?
            res.send(title) :
            res.status(404).send('Movie not found');
        } else {
            res.send(allFilms);
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => { 
    try {
        const { id,
            original_lenguage,
            original_title,
            overview,
            poster_path,
            release_date,
            vote_average,
        } = req.body;

        const newFilm = await Movie.create({ //creo una peli con esos parametros
            id,
            original_lenguage,
            original_title,
            overview,
            poster_path,
            release_date,
            vote_average,
        });

        res.status(201).send('New film created!');
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const allFilms = await getAllFilms();

        if (id){
            let film = await allFilms.filter(el => el.id.toString() === id.toString());
            if(film.length) {
                res.json(film);
            } else {
                res.status(404).send("Movie doesn't exist");
            }
        }
    } catch(error){
        console.log(error);
    }
})


module.exports = router;