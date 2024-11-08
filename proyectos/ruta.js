import { Router } from "express";
import {
  modificarProyecto,
  obtenerPorId,
  obtenerPorNombre,
  obtenerProyectos,
  registrarProyecto,
  obtenerMisProyectos,
} from "./controlador.js";

export const crearEnrutadorProyecto = (security) => {
  const proyectoEnrutador = Router();

  proyectoEnrutador.use(security);

  proyectoEnrutador.get("/", obtenerProyectos);
  proyectoEnrutador.get("/nombre", obtenerPorNombre);
  proyectoEnrutador.get("/misproyectos", obtenerMisProyectos);
  proyectoEnrutador.get("/:id", obtenerPorId);
  proyectoEnrutador.post("/", registrarProyecto);
  proyectoEnrutador.put("/", modificarProyecto);

  return proyectoEnrutador;
};
