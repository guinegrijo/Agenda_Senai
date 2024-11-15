const connect = require("../db/connect")

module.exports = class reservaController {
    static async createReserva(req, res) {
        const { data_hora_inicio, data_hora_fim, cpf_usuario, id_sala } = req.body;

        if (!data_hora_inicio || !data_hora_fim || !cpf_usuario || !id_sala) {
            return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
        } else if (cpf_usuario.length !== 14) {
            //Verifica se tem só números e se tem 14 dígitos
            return res.status(400).json({
              error: "CPF inválido. Deve conter exatamente 14 dígitos contando com . e -",
            })
        }

        // Verificação de conflitos de horário
        const conflictQuery = `
            SELECT * FROM reserva 
            WHERE id_sala = ? 
            AND (data_hora_inicio < ? AND data_hora_fim > ?)
        `
        
        // Aqui passamos o `id_sala`, `data_hora_fim` e `data_hora_inicio`
        const values = [id_sala, data_hora_fim, data_hora_inicio];

        try {
            // Executa a consulta para verificar conflitos
            connect.query(conflictQuery, values, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Erro ao verificar conflitos de horário" });
                }

                if (results.length > 0) {
                    // Existe um conflito de horário
                    return res.status(409).json({ error: "Horário já reservado para essa sala" });
                }

                // Insere a reserva se não houver conflito
                const insertQuery = `
                    INSERT INTO reserva (data_hora_inicio, data_hora_fim, cpf_usuario, id_sala)
                    VALUES (?, ?, ?, ?)
                `;

                const newValues = [data_hora_inicio, data_hora_fim, cpf_usuario, id_sala];

                connect.query(insertQuery, newValues, (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ error: "Erro ao reservar" }); 
                    } 
                    return res.status(201).json({ message: "Reserva criada com sucesso!" });
                });    
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    static async getAllReserva(req, res) {
        const query = `SELECT * FROM reserva`;

        try {
        connect.query(query, function (err, results) {
            if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro interno do Servidor" });
            }

            return res
            .status(200)
            .json({ message: "Lista de reservas", reservas: results });
        })
        } catch (error) {
            console.error("Erro ao executar consulta:", error);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }


    static async deleteReserva(req, res) {
        const { id_reserva, cpf_usuario } = req.body;
    
       
        if (!id_reserva || !cpf_usuario) {
          return res.status(400).json({ error: "O id_reserva e cpf_usuario são necessários para deletar" });
        }
    
        // Query para deletar a reserva com base no id_reserva e CPF
        let query = `DELETE FROM reserva WHERE id_reserva = ? AND cpf_usuario = ?`
        let values = [id_reserva, cpf_usuario]
    
        try {
          connect.query(query, values, function (err, results) {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: "Erro interno do servidor" });
            }
    
            // Verifica se algum registro foi afetado pela query
            if (results.affectedRows > 0) {
              return res.status(200).json({ message: "Reserva deletado com sucesso" });
            } else {
              return res.status(404).json({ error: "Reserva não encontrado" });
            }
          });
        } catch (error) {
          console.error("Erro ao deletar reserva:", error);
          return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }

    static async updateReserva(req, res) { 
        
    }


}