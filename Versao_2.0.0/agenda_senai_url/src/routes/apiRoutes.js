//importar a função Router do express (Router é usado para definir rotas específicas da aplicação
const router = require('express').Router()

const usuarioController = require('../controllers/usuarioController');

router.post('/login', usuarioController.loginUsuario);

router.post('/cadastro',usuarioController.createUsuario);

router.get('/usuario',usuarioController.getAllusuario);
//router.put('/usuario',usuarioController.updateUsuario);
//router.delete('/usuario/:cpf',usuarioController.deleteUsuario);

module.exports = router


