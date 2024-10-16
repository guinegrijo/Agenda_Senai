const connect = require("../db/connect");

module.exports = class usuarioController {
  static async createUsuario(req, res) {
    const { nome, email, senha, confSenha } = req.body;

     if (!nome || !email || !senha || !confSenha) {
        return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });


      } else if (!email.includes("@docente.senai.br")) {
        return res.status(400).json({ error: "Email inválido. Deve conter '@docente.senai.br'" });

        //Lenght conta quantos numeros tem 
      }if (senha.length < 8 || senha.length > 30) {
            return res.status(400)({ message: "Senha deve ter entre 8 e 30 caracteres." });

      }if (senha !== confSenha) {
                return res.status(400)({ message: "Confirmação de senha deve ser igual à senha." });

      }else if (isNaN(cpf) || cpf.length !== 11) {
        return res.status(400).json({ error: "CPF inválido. Deve conter exatamente 11 dígitos numéricos" });
      
    } else {
      // Construção da query INSERT
      const query = `INSERT INTO usuario (nome,cpf, email,senha,confSenha) VALUES('${cpf}', '${senha}', '${email}', '${name}')`;
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

  static async updateUsuario(req, res) {
    // Desestrutura e recupera os dados enviados via corpo da requisição
    const { id, nome, email, senha, confSenha} = req.body;

    // Validar se todos os campos foram preenchidos
    if (!nome || !email || !senha || !confSenha) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    const query = `UPDATE usuario SET nome=?,email=?,senha=?,confSenha=? WHERE id_usuario = ?`;
    const values = [nome, email, senha, confSenha, id];

    try{
      connect.query(query,values,function(err,results){
        if(err){
          if(err.code === "ER_DUP_ENTRY"){
            return res.status(400).json({error:"Email já cadastrado por outro usuario"});
          }else{
            console.error(err);
            return res.status(500).json({error:"Erro interno do servidor"});
          }
        }
        if(results.affectedRows === 0){
          return res.status(404).json({error:"Usuário não encontrado"});
        }
        return res.status(200).json({message:"Usuário atualizado com sucesso"});
        

      })
      
  }
    catch(error){
      console.error("Erro ao executar consulta",error);
      return res.status(500).json({error: "Erro interno no servidor"});

    }

  }

  static async deleteUsuario(req, res) {
    const usuarioId = req.params.id;
    const query = `DELETE FROM usuario WHERE id_usuario=?`;
    const values = [usuarioId]
    try{
      connect.query(query,values,function(err,results){
        if(err){
        console.error(err);
        return res.status(500).json({error:"Erro interno no servidor"})
        }
        if(results.affectedRows===0){
          return res.status(404).json({error:"Usuário não encontrado"})
        }

        return res.status(200).json({
          message:"Usuário excluido com sucesso"
        })

      })
    }catch(error){
      console.error(error);
      return res.status(500).json({error:"Erro interno no servidor"})

    }

  }
};
