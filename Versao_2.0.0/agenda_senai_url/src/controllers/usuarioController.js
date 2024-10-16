const connect = require("../db/connect");

module.exports = class usuarioController {
  static async createUsuario(req, res) {
    const { nome, email, senha, cpf_usuario } = req.body;

     if (!nome || !email || !senha || !cpf_usuario) {
        return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });


      } else if (!email.includes("@docente.senai.br")) {
        return res.status(400).json({ error: "Email inválido. Deve conter '@docente.senai.br'" });

        //Lenght conta quantos numeros tem 
      }else if (senha.length < 8 || senha.length > 30) {
            return res.status(400)({ message: "Senha deve ter entre 8 e 30 caracteres." });

      }else if (isNaN(cpf_usuario) || cpf_usuario.length !== 11) {
        //Verifica se tem só números e se tem 11 dígitos
        return res.status(400).json({
          error: "CPF inválido. Deve conter exatamente 11 dígitos numéricos",
        });
        
    } else {
      // Construção da query INSERT
      const query = `INSERT INTO usuario (nome, email,senha,cpf_usuario) VALUES('${senha}', '${email}', '${nome}','${cpf_usuario }')`;
      // Executando a query criada
      try {
        connect.query(query, function (err) {
          if (err) {
            console.log(err);
            console.log(err.code);
            if (err.code === "ER_DUP_ENTRY") {
              return res
                .status(400)
                .json({ error: "O Email já está vinculado a outro usuário" });
            } else {
              return res
                .status(500)
                .json({ error: "Erro interno do servidor" });
            }
          }else{
            return res.status(201).json({message: "Usuário criado com sucesso"});
          }
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({error:"Erro interno do servidor"})
      }

    }
  }

  static async getAllusuario(req, res) {

    const query = 'SELECT * FROM usuario';

    try{
      connect.query(query,function(err,results){
        if(err){
          console.error(err);
          return res.status(500).json({error:"Erro interno do Servidor"})
        }

        return res.status(200).json({message:"Lista de usuario",usuario:results})
      })
    }
    catch(error){
      console.error("Erro ao executar consulta:",error)
      return res.status(500).json({error:"Erro interno no servidor"});
    }

  }

   // Função de login
   static async loginUsuario(req, res) {
    const { email, senha,cpf_usuario } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    const query = `SELECT * FROM usuario WHERE email = '${email}' AND password = '${senha}'`;

    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.length > 0) {
          return res.status(200).json({ message: `Bem-vindo, ${results[0].name}!` });
        } else {
          return res.status(401).json({ error: "Email ou senha incorretos." });
        }
      });
    } catch (error) {
      console.error("Erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}
