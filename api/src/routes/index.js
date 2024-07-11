const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getDogsHandler } = require('../handlers/getDogsHandler');
const { getDogByIdHandler } = require('../handlers/getDogByIDHandler')
const { getDogsByNameHandler } = require('../handlers/getDogsByNameHandler');
const { getTemperamentsHandler } = require('../handlers/getTemperamentsHandler');

const router = Router();
router.get('/dogs', getDogsHandler);
router.get('/dogs/name', getDogsByNameHandler);
router.get('/dogs/:id', getDogByIdHandler);
router.post('/dogs', getDogsByNameHandler);
router.get ('/temperaments', getTemperamentsHandler)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
