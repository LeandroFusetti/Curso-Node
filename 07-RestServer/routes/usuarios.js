const { Router}= require('express')
const {usuariosGet,usuariosPut,usuariosPost,usuariosDelete,usuariosPatch}= require('../controllers/usuarios')
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const router= Router()

const { esRoleValido,emailExiste } = require('../helpers/db-validators')


router.get('/',  usuariosGet)
router.post('/',[
    //middleware da el mensaje d error en caso de que no sea un correo
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser de mas de 6 letras').isLength({min:6}),
    //check('correo').custom(emailExiste),
    //check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    
    check('rol').custom(esRoleValido),// es lo mismo que (rol)=>esRoleValido(rol), si el argumento de la callback es el mismo que el que recibe esRolValido, no es necesario ponerlo
    validarCampos


], usuariosPost)
router.put('/:id',  usuariosPut)
router.patch('/',usuariosPatch )
router.delete('/', usuariosDelete)

module.exports = router