//document.addEventListener("DOMContentLoaded", getAllSala);
document.addEventListener("DOMContentLoaded", getAllSalaSelect);

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
      const userList = document.getElementById("sala-tabela");
      userList.innerHTML = ""; //Limpa a lista existente

      data.salas.forEach((sala) => {
        const tr = document.createElement("tr");

        const tdNumeroSala = document.createElement("td");
        tdNumeroSala.textContent = sala.numero_da_sala;
        tr.appendChild(tdNumeroSala);

        const tdCapacidade = document.createElement("td");
        tdCapacidade.textContent = sala.capacidade;
        tr.appendChild(tdCapacidade);

        const tdDescricao = document.createElement("td");
        tdDescricao.textContent = sala.descricao;
        tr.appendChild(tdDescricao);

        userList.appendChild(tr);
      });
    })
    .catch((error) => {
      alert("Erro ao obter salas" + error.message);
      console.error("Erro:", error.message);
    });
}

function getAllSalaSelect() {
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
