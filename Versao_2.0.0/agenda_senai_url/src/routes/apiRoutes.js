//importar a função Router do express (Router é usado para definir rotas específicas da aplicação
const router = require('express').Router()

const usuarioController = require('../controllers/usuarioController');

router.post('/login', usuarioController.loginUsuario);
router.post('/cadastro',usuarioController.createUsuario);
router.get('/usuario',usuarioController.getAllusuario);
router.put('/update',usuarioController.updateUsuario);
router.delete('/delete',usuarioController.deleteUsuario);

module.exports = router


