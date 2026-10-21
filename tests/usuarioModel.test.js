import { listar, criar, atualizar, remover } from "../src/models/usuarioModel.js";

describe("usuarioModel", () => {
  test("listar retorna os usuários iniciais", () => {
    expect(listar()).toContainEqual({ id: 1, nome: "Ana" });
    expect(listar()).toContainEqual({ id: 2, nome: "Bruno" });
  });

  test("criar adiciona um novo usuário", () => {
    const novo = criar("Carla");

    expect(novo.nome).toBe("Carla");
    expect(listar()).toContainEqual(novo);
  });

  test("atualizar muda o nome do usuário", () => {
    const novo = criar("Davi");
    const atualizado = atualizar(novo.id, "Davi Silva");

    expect(atualizado.nome).toBe("Davi Silva");
  });

  test("atualizar retorna null se o id não existir", () => {
    expect(atualizar(999, "Fantasma")).toBeNull();
  });

  test("remover apaga o usuário", () => {
    const novo = criar("Elisa");

    expect(remover(novo.id)).toBe(true);
    expect(listar()).not.toContainEqual(novo);
  });

  test("remover retorna false se o id não existir", () => {
    expect(remover(999)).toBe(false);
  });
});
