const { Router}= require('express')
const {check} = require('express-validator')
const { validarJWT, validarCampos ,existeProductoPorId, existeCategoriaPorId,esAdminRole} = require('../middlewares')
const { borrarProducto,actualizarProducto,crearProducto, obtenerProductos, obtenerProducto } = require('../controllers/productos')

const router= Router()


// obtener todas las productos - publico
router.get('/',
    obtenerProductos
)

//obtener una producto por id - publico
router.get('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),
    validarCampos,
    check('id').custom(existeProductoPorId)
],obtenerProducto
)

//crear producto - privado - cualquier persona con un token válido 
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    
    validarCampos,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    
    ],crearProducto)

//actualizar - privado- cualquiera con token válido
router.put('/:id',[
    validarJWT,
    

    //check('id','No es un ID válido').isMongoId(),
    validarCampos,
    check('id').custom(existeProductoPorId)
],actualizarProducto)

//borrar una categoria - admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un ID válido').isMongoId(),
    validarCampos,
    check('id').custom(existeProductoPorId)
],borrarProducto)

module.exports= router