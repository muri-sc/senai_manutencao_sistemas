import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();

app.use(express.json());
app.use("/usuarios", usuarioRoutes);

// Erros inesperados (ex.: banco fora do ar)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: "Erro interno" });
});

export default app;
