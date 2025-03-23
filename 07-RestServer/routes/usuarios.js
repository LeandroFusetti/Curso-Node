const { Router}= require('express')
const {check} = require('express-validator')
const {usuariosGet,usuariosPut,usuariosPost,usuariosDelete,usuariosPatch}= require('../controllers/usuarios')
// const { validarCampos } = require('../middlewares/validar-campos')
// const { validarJWT } = require('../middlewares/validar-jwt')
// const {esAdminRole,tieneRole}=require('../middlewares/validar-roles')
//forma mas ordenada de manejar modulos en node
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
}=require('../middlewares')

const router= Router()

const { esRoleValido,emailExiste ,existeUsuarioPorId} = require('../helpers/db-validators')


router.get('/',  usuariosGet)
router.post('/',[
    //middleware da el mensaje d error en caso de que no sea un correo
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser de mas de 6 letras').isLength({min:6}),
    check('correo').custom(emailExiste),
    //check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    
    check('rol').custom(esRoleValido),// es lo mismo que (rol)=>esRoleValido(rol), si el argumento de la callback es el mismo que el que recibe esRolValido, no es necesario ponerlo
    validarCampos


], usuariosPost)

router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],  usuariosPut)

router.patch('/',usuariosPatch )

router.delete('/:id',[
    //esto es secuencial
    //esAdminRole,
    validarJWT,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)

module.exports = router