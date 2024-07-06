const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDogsHandler = require('../handlers/getDogsHandler');
const getDogByIdHandler = require('../handlers/getDogByIDHandler')


const router = Router();
router.use('/dogs', getDogsHandler)
router.use('/dogs/:id', getDogByIdHandler)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
