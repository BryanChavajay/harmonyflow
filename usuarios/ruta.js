import { Router } from "express";
import {
  crearNuevoUsuario,
  modificarUsuario,
  obtenerPorCodigo,
  obtenerPorNombre,
  obtenerUsuarios,
  verificar,
} from "./controlador.js";

export const crearEnrutadorUsuario = (security) => {
  const usuarioEnrutador = Router();

  usuarioEnrutador.use(security);

  usuarioEnrutador.get("/", obtenerUsuarios);
  usuarioEnrutador.get("/buscar", obtenerPorCodigo);
  usuarioEnrutador.get("/buscarnombre", obtenerPorNombre);
  usuarioEnrutador.post("/", crearNuevoUsuario);
  usuarioEnrutador.put("/", modificarUsuario);
  usuarioEnrutador.post("/verificar", verificar);

  return usuarioEnrutador;
};
