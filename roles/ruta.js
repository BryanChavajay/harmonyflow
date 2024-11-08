import { Router } from "express";
import {
  obtenerTodosModulos,
  crearRolPermisos,
  obtenerTodosRoles,
  obtenerRolPorId,
} from "./controlador.js";

export const crearEnrutadorRoles = (security) => {
  const rolesEnrutador = Router();

  rolesEnrutador.use(security);

  rolesEnrutador.get("/modulos", obtenerTodosModulos);
  rolesEnrutador.post("/", crearRolPermisos);
  rolesEnrutador.get("/", obtenerTodosRoles);
  rolesEnrutador.get("/:id", obtenerRolPorId);

  return rolesEnrutador;
};
