// CONTROLLER: recebe a requisição, chama o model e devolve a resposta (a "view" aqui é o JSON)
import * as Usuario from "../models/usuarioModel.js";

export function listar(req, res) {
  res.json(Usuario.listar());
}

export function criar(req, res) {
  const novo = Usuario.criar(req.body.nome);
  res.status(201).json(novo);
}

export function atualizar(req, res) {
  const usuario = Usuario.atualizar(Number(req.params.id), req.body.nome);
  if (!usuario) return res.status(404).json({ erro: "Não encontrado" });

  res.json(usuario);
}

export function remover(req, res) {
  const removido = Usuario.remover(Number(req.params.id));
  if (!removido) return res.status(404).json({ erro: "Não encontrado" });

  res.status(204).send();
}
