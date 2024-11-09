import { Router } from "express";
import {
  buscarCaso,
  buscarCasos,
  buscarErrores,
  modificarError,
  modificarPrueba,
  registrarCasoPrueba,
  registrarError,
} from "./controlador.js";

export const crearEnrutadorPruebas = (security) => {
  const pruebaEnrutador = Router();

  pruebaEnrutador.use(security);
  pruebaEnrutador.post("/", registrarCasoPrueba);
  pruebaEnrutador.post("/error", registrarError);
  pruebaEnrutador.put("/", modificarPrueba);
  pruebaEnrutador.put("/error", modificarError);
  pruebaEnrutador.get("/casos", buscarCasos);
  pruebaEnrutador.get("/errores", buscarErrores);
  pruebaEnrutador.get("/:id", buscarCaso);

  return pruebaEnrutador;
};
