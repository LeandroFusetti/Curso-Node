const { Router}= require('express')

const { validarCampos} = require('../middlewares/validar-campos')
const { validarArchivo} = require('../middlewares/validar-archivo')

const{cargarArchivo,actualizarImagen,mostrarImagen} = require('../controllers/uploads')
const { check } = require('express-validator')
const {coleccionesPermitidas}= require('../helpers')

const router= Router()


router.post('/',validarArchivo,cargarArchivo)

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagen)

router.get('/:coleccion/:id',[
    
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen)

module.exports= router