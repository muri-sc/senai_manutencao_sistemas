import { jest } from "@jest/globals";

// Mock do pool: os testes não precisam de um MySQL rodando
const query = jest.fn();
jest.unstable_mockModule("../src/db.js", () => ({ pool: { query } }));

const { listar, criar, atualizar, remover } = await import(
  "../src/models/usuarioModel.js"
);

describe("usuarioModel", () => {
  beforeEach(() => query.mockReset());

  test("listar retorna os usuários do banco", async () => {
    const linhas = [{ id: 1, nome: "Ana" }, { id: 2, nome: "Bruno" }];
    query.mockResolvedValue([linhas]);

    expect(await listar()).toEqual(linhas);
  });

  test("criar insere e devolve o novo usuário com o id gerado", async () => {
    query.mockResolvedValue([{ insertId: 3 }]);

    expect(await criar("Carla")).toEqual({ id: 3, nome: "Carla" });
    expect(query).toHaveBeenCalledWith(
      "INSERT INTO usuarios (nome) VALUES (?)",
      ["Carla"]
    );
  });

  test("atualizar muda o nome do usuário", async () => {
    query.mockResolvedValue([{ affectedRows: 1 }]);

    expect(await atualizar(1, "Ana Silva")).toEqual({ id: 1, nome: "Ana Silva" });
  });

  test("atualizar retorna null se o id não existir", async () => {
    query.mockResolvedValue([{ affectedRows: 0 }]);

    expect(await atualizar(999, "Fantasma")).toBeNull();
  });

  test("remover apaga o usuário", async () => {
    query.mockResolvedValue([{ affectedRows: 1 }]);

    expect(await remover(1)).toBe(true);
  });

  test("remover retorna false se o id não existir", async () => {
    query.mockResolvedValue([{ affectedRows: 0 }]);

    expect(await remover(999)).toBe(false);
  });
});
