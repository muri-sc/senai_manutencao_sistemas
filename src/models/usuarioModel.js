// MODEL: acessa o banco de dados (MySQL)
import { pool } from "../db.js";

export async function listar() {
  const [rows] = await pool.query("SELECT id, nome FROM usuarios");
  return rows;
}

export async function criar(nome) {
  const [resultado] = await pool.query(
    "INSERT INTO usuarios (nome) VALUES (?)",
    [nome]
  );
  return { id: resultado.insertId, nome };
}

export async function atualizar(id, nome) {
  const [resultado] = await pool.query(
    "UPDATE usuarios SET nome = ? WHERE id = ?",
    [nome, id]
  );
  if (resultado.affectedRows === 0) return null;

  return { id, nome };
}

export async function remover(id) {
  const [resultado] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
  return resultado.affectedRows > 0;
}
