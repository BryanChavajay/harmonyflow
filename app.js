import express, { json } from "express";
import cors from 'cors'
import { PORT } from "./core/configuraciones.js";
import { verifyToken } from "./core/middlewares/autenticacion.js";
import { corsMiddleware } from "./core/middlewares/cors.js";
import { crearEnrutadorRoles } from "./roles/ruta.js";
import { crearEnrutadorUsuario } from "./usuarios/ruta.js";
import { crearEnrutadorProyecto } from "./proyectos/ruta.js";
import { crearEnrutadorLinea } from "./lineas/ruta.js";
import { crearEnrutadorLogin } from "./autenticacion/ruta.js";
import { crearEnrutadorTarea } from "./tareas/ruta.js";
import { crearEnrutadorPruebas } from "./pruebas/ruta.js";
import { crearEnrutadorEstadisticas } from "./estadisticas/ruta.js";

const app = express();

app.use(json());
//app.use(corsMiddleware());
app.use(cors());
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.use("/auth", crearEnrutadorLogin());
app.use("/roles", crearEnrutadorRoles(verifyToken));
app.use("/usuarios", crearEnrutadorUsuario(verifyToken));
app.use("/proyectos", crearEnrutadorProyecto(verifyToken));
app.use("/lineas", crearEnrutadorLinea(verifyToken));
app.use("/tareas", crearEnrutadorTarea(verifyToken));
app.use("/pruebas", crearEnrutadorPruebas(verifyToken));
app.use("/estadisticas", crearEnrutadorEstadisticas(verifyToken));

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
