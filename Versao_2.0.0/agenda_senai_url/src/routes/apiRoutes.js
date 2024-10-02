//importar a função Router do express (Router é usado para definir rotas específicas da aplicação
const router = require('express').Router()

const controllerAgenda_Senai = require ("../controllers/controllerAgenda_Senai")

router.post('/cadastro',controllerAgenda_Senai.validaçãodeCadastro);
router.get('/cadastro',controllerAgenda_Senai.getAllCadastro);
router.put('/cadastro',controllerAgenda_Senai.updateCadastro);
router.delete('/cadastro/:cpf',controllerAgenda_Senai.deleteCadastro);

module.exports = router
