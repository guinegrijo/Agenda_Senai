document.getElementById('btn_agendar').addEventListener("click", createReserva);

function createReserva(event) {
    event.preventDefault();

    const data_hora_inicio = document.getElementById('input_data_hora_inicio').value;
    const data_hora_fim = document.getElementById('input_data_hora_fim').value;
    const cpf_usuario = document.getElementById('input_cpf_usuario').value;

    console.log(data_hora_inicio, data_hora_fim, cpf_usuario);

    // Requisição da URL BASE para o endpoint de agendamento
    fetch("http://localhost:5000/Agenda_Senai/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data_hora_inicio, data_hora_fim, cpf_usuario }),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }

        return response.json().then((err) => {
            throw new Error(err.error);
        });
    })
    .then((data) => {
        alert(data.message);
        console.log(data.message);

        // Reseta os campos do formulário após o sucesso
        document.getElementById("form-agendamento").reset();

        // Redireciona o usuário após o agendamento
        window.location.href = "agendamento.html";
    })
    .catch((error) => {
        alert("Erro ao agendar: " + error.message);
        console.error("Error: ", error.message);
    });
}
