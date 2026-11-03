// CONTROLLER: recebe a requisição, chama o model e devolve a resposta (a "view" aqui é o JSON)
import * as Usuario from "../models/usuarioModel.js";

// Repassa erros de funções async para o Express (v4 não faz isso sozinho)
const tratar = (fn) => (req, res, next) => fn(req, res, next).catch(next);

export const listar = tratar(async (req, res) => {
  res.json(await Usuario.listar());
});

export const criar = tratar(async (req, res) => {
  const novo = await Usuario.criar(req.body.nome);
  res.status(201).json(novo);
});

export const atualizar = tratar(async (req, res) => {
  const usuario = await Usuario.atualizar(Number(req.params.id), req.body.nome);
  if (!usuario) return res.status(404).json({ erro: "Não encontrado" });

  res.json(usuario);
});

export const remover = tratar(async (req, res) => {
  const removido = await Usuario.remover(Number(req.params.id));
  if (!removido) return res.status(404).json({ erro: "Não encontrado" });

  res.status(204).send();
});
