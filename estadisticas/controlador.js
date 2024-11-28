import {
  obtenerCostoTotalPorProyecto,
  obtenerProCantidadCasos,
} from "./modelo.js";

export async function obtenerCostoProyectos(req, res) {
  try {
    const proyectos = await obtenerCostoTotalPorProyecto();

    res.status(200).json({
      status: 200,
      message: "Petición completada",
      data: proyectos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function obtenerCantidaPruebasProyectos(req, res) {
  try {
    const proyectos = await obtenerProCantidadCasos();

    res.status(200).json({
      status: 200,
      message: "Petición completada",
      data: proyectos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}
