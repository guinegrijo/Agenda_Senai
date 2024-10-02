let= cadastros = [];
let idCadastro= 0;

module.exports = class controllerAgenda_Senai {

    static async validaçãodeCadastro(req,res) {
    //Data faz com que não aja outro cadastro com os mesmos dados fornecidos
    const { nome, email, cpf, senha, confSenha } = req.body;


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
      }
      // Verifica se já existe um organizador com o mesmo email
      const existingOrganizador = organizadores.find(
        (organizador) => organizador.email === email
      );
      if (existingOrganizador) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }
  
      const newCadastro = {
        id: idCadastro++,
        nome,
        email,
        senha,
        telefone,
      };
      cadastros.push(newCadastro);
  
      return res
        .status(201)
        .json({
          message: "Usuário criado com sucesso",
          organizador: newOrganizador,
        });
    }
  
    static async getAllCadastro(req, res) {
      return res.status(200).json({ message: "Obtendo todos os usuários", organizadores });
    }
  
    static async updateCadastro(req, res) {
      //Desestrutura e recupera os dados enviados via corpo da requisição
      const { nome, email, senha, telefone } = req.body;
  
      //Validar se todos os campos foram preenchidos
      if (!nome || !email || !senha || !telefone) {
        return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
      }
  
      //Procurar index do organizador no Array 'users' pelo email
      const cadastroIndex = cadastros.findIndex(
        (cadastros) => cadastros.email === email
      );
      //Se usuario não for encontrado organizadorIndex equivale a -1
      if (cadastroIndexIndex == -1) {
        return res.status(400).json({ error: "Usuario não encontrado" });
      }
  
      //Atualiza os dados do usuário no Array 'organizadores'
      cadastros[cadastroIndex] = { nome, email, senha, telefone };
  
      return res.status(200).json({
          message: "Usuario atualizado",
          cadastro: cadastros[cadastroIndex],
        });
    }
  
    static async deleteCadastro(req, res) {
      //Obtém o parametro 'id' da requisição, que é o email do orgaizador a ser deletado
      const CadastroId = req.params.OrganizadorId;
      //params vai na minha url
  
      //Procurar index do usuario no Array 'organizadores' pelo email
      const cadastroIndex = cadastros.findIndex(
        (organizador) => organizador.CadastroId === CadastroId
      );
  
      //Se usuario não for encontrado organizadorIndex equivale a -1
      if (cadastroIndex == -1) {
        return res.status(400).json({ error: "Usuario não encontrado" });
      }
  
      //Removendo o organizador do Array 
      cadastros.splice(cadastroIndex, 1);
      return res.status(200).json({ message: "Usuario Apagado" });
    }
  };
  

//const validaçãoFinal = validaçãodeCadastro(registroData);
