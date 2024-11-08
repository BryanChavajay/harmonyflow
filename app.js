import express, { json } from "express";
import { PORT } from "./core/configuraciones.js";
import { verifyToken } from "./core/middlewares/autenticacion.js";
// import { verifyToken } from "./middlewares/auth.js";
// import { corsMiddleware } from "./middlewares/cors.js";
import { crearEnrutadorRoles } from "./roles/ruta.js";
import { crearEnrutadorUsuario } from "./usuarios/ruta.js";
import { crearEnrutadorProyecto } from "./proyectos/ruta.js";
import { crearEnrutadorLinea } from "./lineas/ruta.js";
import { crearEnrutadorLogin } from "./autenticacion/ruta.js";
import { crearEnrutadorTarea } from "./tareas/ruta.js";

const app = express();

app.use(json());
//app.use(corsMiddleware());
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.use("/roles", crearEnrutadorRoles(verifyToken));
app.use("/usuarios", crearEnrutadorUsuario(verifyToken));
app.use("/proyectos", crearEnrutadorProyecto(verifyToken));
app.use("/lineas", crearEnrutadorLinea(verifyToken));
app.use("/auth", crearEnrutadorLogin(verifyToken));
app.use("/tareas", crearEnrutadorTarea(verifyToken));
// app.use("/adopters", createAdoptersRouter(verifyToken));
// app.use("/adoptions", createAdoptionsRouter(verifyToken));
// app.use("/pets", createPetsRouter(verifyToken));
// app.use("/users", createUsersRouter(verifyToken));
// app.use("/auth", createAuthRouter());

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
