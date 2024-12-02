document.getElementById('form').addEventListener("submit", createUser)

 function createUser(event) {

    event.preventDefault();

    const nome = window.document.getElementById('input_nome').value
    const email = window.document.getElementById('input_email').value
    const cpf_usuario = window.document.getElementById('input_cpf').value
    const senha = window.document.getElementById('input_password').value
    const senhac = window.document.getElementById('input_conf_password').value


    console.log(nome, email, cpf_usuario, senha, senhac )

    // Requisição da URL BASE para o endpoint de cadastro de usuário
    fetch("http://10.89.240.67:5000/Agenda_Senai/cadastro", {
        // Realiza uma chamada HTTP para o servidor (a rota definida)
        method: "POST",
  
        headers: {
          // A requisição será em formato JSON
          "Content-Type": "application/json",
        },
  
        // Transforma os dados do formulário em uma string JSON para serem enviados no corpo da requisição
        body: JSON.stringify({ nome, email, cpf_usuario, senha, senhac }),
    }) 
    .then((response) => {
        //tratamento da resposta do servidor (API)

        if (response.ok) {
          // ok verifica se a resposta foi bem sucedida
          return response.json()
        }

        return response.json().then((err) => {
          //convertendo o erro em formado json
          throw new Error(err.error);
        })

    })
    .then((data) => {
        // Executa a resposta de sucesso

        alert(data.message);
        console.log(data.message);

        //Reseta os campos do formulário
      document.getElementById("form").reset();

    })
    .catch((error) => {
        //catch captura qualquer erro que ocorra durande o precesso de requisição

        alert("Error no cadastro: " + error.message);

        console.error("Error: ", error.message);
    })
}