const connect = require("../db/connect");

module.exports = class usuarioController {
  static async createUsuario(req, res) {
    const { nome, email, senha, cpf_usuario, senhac } = req.body;

    if (!nome || !email ||!senha || !cpf_usuario|| !senhac) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
        //Verifica se o email tem @docente.senai.br
    } else if (!email.includes("@docente.senai.br")) {
      return res
        .status(400)
        .json({
          error: "Email do senai inválido. Deve conter '@docente.senai.br'",
        });

      //Lenght conta quantos numeros tem
    } else if (senha.length < 8 || senha.length > 30) {
      return res
        .status(400)
        .json({ message: "Senha deve ter entre 8 e 30 caracteres." });
    } else if (cpf_usuario.length !== 14) {
      //Verifica se tem só números e se tem 14 dígitos
      return res.status(400).json({
        error:
          "CPF inválido. Deve conter exatamente 14 dígitos contando com . e -",
      });
    }else if (senha !== senhac) {
      return res.status(400).json({
        error: "As senhas devem ser iguais",
      });
    } else {
      // Construção da query INSERT
      //transformar todos os caracteres para letras minúsculas
      const query = `INSERT INTO usuario (nome, email, senha, cpf_usuario) VALUES('${nome}', '${email.toLowerCase()}', '${senha}','${cpf_usuario}')`;

      // Executando a query criada
      try {
        connect.query(query, function (err) {
          if (err) {
            console.log(err);
            console.log(err.code);

            if (err.code === "ER_DUP_ENTRY") {
              // Verifica se a mensagem de erro menciona o campo 'email' ou 'cpf_usuario'
              console.log("AQUI")
              console.log(err.message)
              if (err.message.includes("email")) {
                return res
                  .status(400)
                  .json({ error: "O Email já está vinculado a outro usuário" });
                  
              } else {                
                return res
                  .status(400)
                  .json({ error: "O CPF já está vinculado a outro usuário" });
              }
            } else {
              return res
                .status(500)
                .json({ error: "Erro interno do servidor" });
            }
          } else {
            return res
              .status(201)
              .json({ message: "Usuário criado com sucesso" });
          }
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
      }
    }
  }

  static async getAllusuario(req, res) {
    const query = "SELECT * FROM usuario";

    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do Servidor" });
        }

        return res
          .status(200)
          .json({ message: "Lista de usuario", usuario: results });
      });
    } catch (error) {
      console.error("Erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  // Função de login
  static async loginUsuario(req, res) {
    const { input_email_cpf, senha } = req.body;

    // Verifica se os campos obrigatórios foram enviados
    if (!input_email_cpf || !senha) {
      return res
        .status(400)
        .json({ error: "Email/CPF e senha são obrigatórios." });
    }

    // Verifica se é um e-mail (contém @) ou um CPF (não contém @)
    let query = "";
    let values = [];

    if (input_email_cpf.includes("@")) {
      // Se contém '@', é um e-mail
      query = `SELECT * FROM usuario WHERE email = ? AND senha = ?`;
      values = [input_email_cpf, senha];
    } else {
      // Caso contrário, trata-se de um CPF
      query = `SELECT * FROM usuario WHERE cpf_usuario = ? AND senha = ?`;
      values = [input_email_cpf, senha];
    }

    try {
      // Executa a consulta com base no que foi detectado (email ou CPF)
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        // Verifica se encontrou algum resultado
        if (results.length > 0) {
          return res.status(200).json({ message: `Bem-vindo, ${results[0].nome}!` }); 
        } else {
          return res
            .status(401)
            .json({ error: "Email, CPF ou senha incorretos." });
        }
      });
    } catch (error) {
      console.error("Erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  static async deleteUsuario(req, res) {
    const { cpf_usuario } = req.body;

    // Verifica se o CPF foi enviado no corpo da requisição
    if (!cpf_usuario) {
      return res.status(400).json({ error: "CPF do usuário é necessário para deletar" });
    }

    // Query para deletar o usuário com base no CPF
    let query = "DELETE FROM usuario WHERE cpf_usuario = ?";
    let values = [cpf_usuario]

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        // Verifica se algum registro foi afetado pela query
        if (results.affectedRows > 0) {
          return res.status(200).json({ message: "Usuário deletado com sucesso" });
        } else {
          return res.status(404).json({ error: "Usuário não encontrado" });
        }
      });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  static async updateUsuario(req, res) {
    const { cpf_usuario, nome, email, senha } = req.body;

    // Verifica se o CPF foi enviado para identificar o usuário
    if (!cpf_usuario) {
        return res.status(400).json({ error: "CPF do usuário é necessário para atualizar" });
    }

    // Verifica se ao menos um campo foi fornecido
    if (!nome && !email && !senha) {
        return res.status(400).json({ error: "Pelo menos um campo de atualização é necessário (nome, email ou senha)" });
    }

    
    const arrayToUpdate = [];
    const values = [];

    if (nome) {
        arrayToUpdate.push("nome = ?");
        values.push(nome);
    }
    if (email) {
        // Verificação para e-mail com domínio específico
        if (!email.includes("@docente.senai.br")) {
            return res.status(400).json({ error: "Email inválido. Deve conter '@docente.senai.br'" });
        }
        arrayToUpdate.push("email = ?");
        values.push(email.toLowerCase());
    }
    if (senha) {
        // Validação de tamanho de senha
        if (senha.length < 8 || senha.length > 30) {
            return res.status(400).json({ error: "Senha deve ter entre 8 e 30 caracteres." });
        }
        arrayToUpdate.push("senha = ?");
        values.push(senha);
    }

    values.push(cpf_usuario); // Adiciona o CPF no final para a condição WHERE

    // Monta a query SQL dinamicamente com os campos atualizados
    const query = `UPDATE usuario SET ${arrayToUpdate.join(", ")} WHERE cpf_usuario = ?`;

    try {
        connect.query(query, values, function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Erro interno do servidor" });
            }

            // Verifica se algum registro foi afetado pela query
            if (results.affectedRows > 0) {
                return res.status(200).json({ message: "Usuário atualizado com sucesso" });
            } else {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }
        });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
}


}
