//importar a função Router do express (Router é usado para definir rotas específicas da aplicação
const router = require('express').Router()

const usuarioController = require('../controllers/usuarioController');

router.post('/login', usuarioController.loginUsuario);
router.post('/cadastro',usuarioController.createUsuario);
router.get('/usuario',usuarioController.getAllusuario);
router.put('/update',usuarioController.updateUsuario);
router.delete('/delete',usuarioController.deleteUsuario);

const reservaController = require('../controllers/reservaController')

router.post('/reserva', reservaController.createReserva)
router.get('/reserva', reservaController.getAllReserva)
router.delete('/reserva', reservaController.deleteReserva)
router.put('/reserva', reservaController.updateReserva)

const salaController = require('../controllers/salaController')

router.post('/sala', salaController.createSala)
router.get('/sala', salaController.getAllSala)
router.delete('/sala', salaController.deleteSala)
router.put('/sala', salaController.updateSala)

module.exports = router

//http://localhost:5000/Agenda_Senai/
