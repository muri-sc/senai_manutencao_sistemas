// MODEL: guarda os dados e as regras de acesso a eles
const usuarios = [
  { id: 1, nome: "Ana" },
  { id: 2, nome: "Bruno" },
];
let proximoId = 3;

export function listar() {
  return usuarios;
}

export function criar(nome) {
  const novo = { id: proximoId++, nome };
  usuarios.push(novo);
  return novo;
}

export function atualizar(id, nome) {
  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) return null;

  usuario.nome = nome;
  return usuario;
}

export function remover(id) {
  const indice = usuarios.findIndex((u) => u.id === id);
  if (indice === -1) return false;

  usuarios.splice(indice, 1);
  return true;
}
