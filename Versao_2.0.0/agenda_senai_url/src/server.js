//Importa a instância do Express configurada em index.js
const app = require("./index");
const cors= require('cors');

//configuração de cors com origens permitidas
const corOptions={
    origin: '*', //Substitua pela origem permitida
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',//Metodos http permitidos
    credentials: true,//Permite o uso de cookies e credenciais
    optionsSucessStatus: 204, //Define o status de resposta para o metodo OPTIONS
};

//Aplicando o middlewers CORS no app
app.use(cors(corOptions));
app.listen(5000);
