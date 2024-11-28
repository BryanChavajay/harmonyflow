import { Router } from "express";
import {
  registrarTarea,
  actualizarTareaCompleta,
  actualizarTareaEnCurso,
  actualizarTareaTerminada,
  actualizarTareaEnProgreso,
  obHorasUsuarioProyecto,
  obTareasAgrupadasUsuario,
  obtenerHorasUsuario,
  obtenerTarea,
  obtenerTareasUsuario,
  quitarTarea,
  registrarHora,
} from "./controlador.js";

export const crearEnrutadorTarea = (security) => {
  const enrutadorTarea = Router();

  enrutadorTarea.use(security);
  enrutadorTarea.post("/", registrarTarea);
  enrutadorTarea.put("/", actualizarTareaCompleta);
  enrutadorTarea.delete("/", quitarTarea);
  enrutadorTarea.get("/", obtenerTareasUsuario);
  enrutadorTarea.put("/progreso", actualizarTareaEnProgreso);
  enrutadorTarea.put("/curso", actualizarTareaEnCurso);
  enrutadorTarea.put("/completada", actualizarTareaTerminada);
  enrutadorTarea.get("/agrupadas", obTareasAgrupadasUsuario);
  enrutadorTarea.get("/unica", obtenerTarea);
  enrutadorTarea.post("/hora", registrarHora);
  enrutadorTarea.get("/hora", obtenerHorasUsuario);
  enrutadorTarea.get("/horaproyecto", obHorasUsuarioProyecto);

  return enrutadorTarea;
};
