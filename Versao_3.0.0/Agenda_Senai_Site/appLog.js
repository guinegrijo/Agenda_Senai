document.getElementById('btn_entrar').addEventListener("click", loginUser)

 function loginUser(event) {

    event.preventDefault();

    const input_email_cpf = window.document.getElementById('input_email').value
    const senha = window.document.getElementById('input_password').value


    console.log(input_email_cpf, senha)

    // Requisição da URL BASE para o endpoint de cadastro de usuário
    fetch("http://localhost:5000/Agenda_Senai/login", {
        // Realiza uma chamada HTTP para o servidor (a rota definida)
        method: "POST",
  
        headers: {
          // A requisição será em formato JSON
          "Content-Type": "application/json",
        },
  
        // Transforma os dados do formulário em uma string JSON para serem enviados no corpo da requisição
        body: JSON.stringify({input_email_cpf, senha}),
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
        //document.getElementById("form").reset();

        window.location.href = "pagina_principal.html"; 

    })
    .catch((error) => {
        //catch captura qualquer erro que ocorra durande o precesso de requisição

        alert("Error no cadastro: " + error.message);

        console.error("Error: ", error.message);
    })
}