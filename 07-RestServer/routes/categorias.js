const { Router}= require('express')
const {check} = require('express-validator')
const { validarJWT, validarCampos ,existeCategoriaPorId, esAdminRole} = require('../middlewares')
const { borrarCategoria,actualizarCategoria,crearCategoria, obtenerCategorias, obtenerCategoria } = require('../controllers/categorias')

const router= Router()


// obtener todas las categorias - publico
router.get('/',
    obtenerCategorias
)

//obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorId)
],obtenerCategoria
)

//crear categoria - privado - cualquier persona con un token válido 
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
    ],crearCategoria)

//actualizar - privado- cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),

    check('id','No es un ID válido').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorId)
],actualizarCategoria)

//borrar una categoria - admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un ID válido').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorId)
],borrarCategoria)

module.exports= router