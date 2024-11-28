import { Router } from "express";
import {
  obtenerCantidaPruebasProyectos,
  obtenerCostoProyectos,
} from "./controlador.js";

export const crearEnrutadorEstadisticas = (security) => {
  const estadisticasEnrutador = Router();

  estadisticasEnrutador.use(security);

  estadisticasEnrutador.get("/costoproyectos", obtenerCostoProyectos);
  estadisticasEnrutador.get(
    "/pruebasproyectos",
    obtenerCantidaPruebasProyectos
  );

  return estadisticasEnrutador;
};
