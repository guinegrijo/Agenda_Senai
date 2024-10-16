document.getElementById("form").addEventListener("submit", function (event) {

    event.preventDefault();

    const nome = window.document.getElementById('input_nome')
    const email = window.document.getElementById('input_email')
    const cpf = window.document.getElementById('input_cpf')
    const senha = window.document.getElementById('input_password')

    // Requisição da URL BASE para o endpoint de cadastro de usuário
    fetch("http://localhost:5000/api/v1/user/", {
        // Realiza uma chamada HTTP para o servidor (a rota definida)
        method: "POST",
  
        headers: {
          // A requisição será em formato JSON
          "Content-Type": "application/json",
        },
  
        // Transforma os dados do formulário em uma string JSON para serem enviados no corpo da requisição
        body: JSON.stringify({ nome, email, cpf, senha }),
    }) 
    .then((response) => {
        //tratamento da resposta do servidor (API)

        if (response.ok) {
          // ok verifica se a resposta foi bem sucedida
          return response.json();
        }

        return response.json().then((err) => {
          //convertendo o erro em formado json
          throw new Error(err.error);
        });
    })
    .then((data) => {
        // Executa a resposta de sucesso

        // alert("Usuário cadastrado com sucesso " + data.user.name);
        alert(data.message + "alert 01")

    })
    .catch((error) => {
        //catch captura qualquer erro que ocorra durande o precesso de requisição

        alert("Error no cadastro: " + error.message + "alert 02");

        console.error("Error: ", error.message);
    })
})