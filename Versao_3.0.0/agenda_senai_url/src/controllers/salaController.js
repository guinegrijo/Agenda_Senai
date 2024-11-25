const connect = require("../db/connect")

module.exports = class reservaController {
    static async createSala(req, res) {
        const { numero_da_sala, capacidade, descricao } = req.body;

        //Se qualquer um dos campos (numero_da_sala, capacidade, descricao) não for preenchido execute o bloco de código
        //A condição será true se pelo menos um dos campos não estiver preenchido
        if (!numero_da_sala || !capacidade || !descricao) {
            return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
        } else if (numero_da_sala.length > 3){
            return res.status(400).json({ error: "numero_da_sala aceita apenas 3 caracteris" });
        }

        const query = `
        INSERT INTO sala (numero_da_sala, capacidade, descricao) VALUES
            (?, ?, ?)
        `

        const values = [numero_da_sala, capacidade, descricao];

        try {
            // Executa a consulta para verificar conflitos
            connect.query(query, values, (err, results) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(400).json({ error: "Essa sala já está vinculada" })
                    }
                    console.error(err);
                    return res.status(500).json({ error: "Erro ao criar sala" })
                }                

                return res.status(201).json({ message: "Sala criada com sucesso!" })

            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro interno do servidor" });
        }
        
    }

    static async getAllSala(req, res) {
        const query = `SELECT * FROM sala`;

        try {
            connect.query(query, function (err, results) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Erro interno do Servidor" });
                }

                return res.status(200).json({ message: "Lista de salas", Salas: results });
            })
        } catch (error) {
            console.error("Erro ao executar consulta:", error);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }


    static async deleteSala(req, res) {
        const { id_sala } = req.body;

        if (!id_sala) {
            return res.status(400).json({ error: "O id_sala é necessário para deletar" });
        }


        const query = `DELETE FROM sala WHERE id_sala = ?`;
        const values = [id_sala]

        try {
            connect.query(query, values, function (err, results) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Erro interno do servidor" });
                }

                // Verifica se algum registro foi afetado pela query
                if (results.affectedRows > 0) {
                    return res.status(200).json({ message: "Sala deletado com sucesso" });
                } else {
                    return res.status(404).json({ error: "Sala não encontrado" });
                }

            })
        } catch (error) {
            console.error("Erro ao deletar reserva:", error);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }

    static async updateSala(req, res) {
        const { numero_da_sala, capacidade, descricao, id_sala } = req.body

        //Se todos os campos (numero_da_sala, capacidade, descricao) não forem preenchidos, execute o bloco de código
        //O operador && retorna true apenas se todos os operandos forem verdadeiros
        if (!numero_da_sala && !capacidade && !descricao) {
            return res.status(400).json({ error: "Pelo menos um dos campos devem ser preenchidos (numero_da_sala, capacidade, descricao)" })
        }

        const arrayToUpdate = []
        const values = []

        if (numero_da_sala) {
            arrayToUpdate.push("numero_da_sala = ?")
            values.push(numero_da_sala)
        }
        if (capacidade) {
            arrayToUpdate.push("capacidade = ?")
            values.push(capacidade)
        }
        if (descricao) {
            arrayToUpdate.push("descricao = ?")
            values.push(descricao)
        }

        values.push(id_sala) // Adiciona o id_sala no final para a condição WHERE

        // Monta a query SQL dinamicamente com os campos atualizados
        const query = `UPDATE sala SET ${arrayToUpdate.join(", ")} WHERE id_sala = ?`

        try {
            connect.query(query, values, function (err, results) {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(400).json({ error: "Essa sala já está vinculada" })
                    }

                    console.error(err)
                    return res.status(500).json({ error: "Erro ao atualizar sala" })
                }

                // Verifica se algum registro foi afetado pela query
                if (results.affectedRows > 0) {
                    return res.status(200).json({ message: "Sala atualizada com sucesso" })
                } else {
                    return res.status(404).json({ error: "Sala não encontrada" })
                }
            })
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            return res.status(500).json({ error: "Erro interno no servidor" })
        }

    }


}