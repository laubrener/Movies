const { Router } = require('express');

const films = require('./Movie');
const genres = require('./Genre');

const router = Router();

router.use('/films', films);
router.use('/genres', genres);


module.exports = router;
