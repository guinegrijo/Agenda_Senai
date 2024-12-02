document.addEventListener("DOMContentLoaded", getAllSala);

function getAllSala() {
  fetch("http://10.89.240.67:5000/Agenda_Senai/sala", {

    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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
      const select = document.getElementById("sala-select");
      select.innerHTML =
        '<option value="" disabled selected>Salas</option>'; // Limpa as opções existentes

      data.salas.forEach((sala) => {
        const option = document.createElement("option");
        option.value = sala.numero_da_sala; // Define um valor único
        option.textContent = `${sala.numero_da_sala} - Capacidade: ${sala.capacidade} - Descição: ${sala.descricao}`;
        select.appendChild(option);
      });
    })
    .catch((error) => {
      alert("Erro ao obter salas" + error.message);
      console.error("Erro:", error.message);
    });

  }
