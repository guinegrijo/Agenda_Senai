const connect = require("../db/connect")

module.exports = class reservaController {
    static async createReserva(req, res) {
        const { data_hora_inicio, data_hora_fim, cpf_usuario, id_sala } = req.body;

        if (!data_hora_inicio || !data_hora_fim || !cpf_usuario || !id_sala) {
            return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
        }

        // Verificação de conflitos de horário
        const conflictQuery = `
            SELECT * FROM reserva 
            WHERE id_sala = ? 
            AND (data_hora_inicio < ? AND data_hora_fim > ?)
        `;
        
        // Aqui passamos o `id_sala`, `data_hora_fim` e `data_hora_inicio` corretamente
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
        const { id_reserva } = req.body;
    
        // Verifica se o CPF foi enviado no corpo da requisição
        if (!id_reserva) {
          return res.status(400).json({ error: "O id_reserva é necessário para deletar" });
        }
    
        // Query para deletar o usuário com base no CPF
        let query = `DELETE FROM reserva WHERE id_reserva = ?`;
        let values = [id_reserva]
    
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
        const { data_hora_inicio , data_hora_fim , cpf_usuario , id_sala, id_reserva } = req.body;
    
        // Verifica se o CPF foi enviado para identificar o usuário
        if (!id_reserva) {
            return res.status(400).json({ error: "O id_reserva é necessário para atualizar" });
        }
    
        // Verifica se ao menos um campo foi fornecido
        if (!data_hora_inicio && !data_hora_fim && !id_sala) {
            return res.status(400).json({ error: "Pelo menos um campo de atualização é necessário (data_hora_inicio, data_hora_fim ou id_sala)" });
        }
    
        
        const arrayToUpdate = [];
        const values = [];
    
        if (data_hora_inicio) {
            arrayToUpdate.push("data_hora_inicio = ?");
            values.push(data_hora_inicio);
        }
        if (data_hora_fim) {
            arrayToUpdate.push("data_hora_fim = ?");
            values.push(data_hora_fim);
        }
        if (id_sala) {
            arrayToUpdate.push("id_sala = ?");
            values.push(id_sala);
        }
        if (cpf_usuario) {
            arrayToUpdate.push("cpf_usuario = ?");
            values.push(cpf_usuario);
        }
    
        values.push(id_reserva); // Adiciona o id_reserva no final para a condição WHERE
    
        // Monta a query SQL dinamicamente com os campos atualizados
        const query = `UPDATE usuario SET ${arrayToUpdate.join(", ")} WHERE id_reserva = ?`;
    
        try {
            connect.query(query, values, function (err, results) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Erro interno do servidor" });
                }
    
                // Verifica se algum registro foi afetado pela query
                if (results.affectedRows > 0) {
                    return res.status(200).json({ message: "Reserva atualizado com sucesso" });
                } else {
                    return res.status(404).json({ error: "Reserva não encontrado" });
                }
            });
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }


}