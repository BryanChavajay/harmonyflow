import { Router } from "express";
import {
  eliminarUsuarioLinea,
  actualizarLinea,
  obtenerLineaPorId,
  obtenerLineaPorNom,
  obtenerLineas,
  obtenerUsuariosDeLinea,
  obtenerUsuariosPorLinea,
  registrarLinea,
  registrarUsuarioLinea,
} from "./controlador.js";

export const crearEnrutadorLinea = (security) => {
  const lineaEnrutador = Router();

  lineaEnrutador.use(security)

  lineaEnrutador.get("/", obtenerLineas);
  lineaEnrutador.post("/", registrarLinea);
  lineaEnrutador.put("/", actualizarLinea);
  lineaEnrutador.post("/usuariolinea", registrarUsuarioLinea);
  lineaEnrutador.delete("/usuariolinea", eliminarUsuarioLinea);
  lineaEnrutador.get("/nombre", obtenerLineaPorNom);
  lineaEnrutador.get("/usuarioslineas", obtenerUsuariosPorLinea);
  lineaEnrutador.get("/usuarioslinea", obtenerUsuariosDeLinea);
  lineaEnrutador.get("/:id", obtenerLineaPorId);

  return lineaEnrutador;
};
