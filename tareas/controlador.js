import {
  crearTarea,
  busTareasAgrupadasUsuario,
  buscarTareasUsuario,
  eliminarTarea,
  actualizarTarea,
  crearHora,
  buscarHoraPorId,
  buscarHoraUsuario,
  eliminarHora,
  actualizarHora,
  buscarTareaPorId,
} from "./modelo.js";
import {
  ValidarHora,
  ValidarTarea,
  ValidarTareaCorta,
  ValidarTareaCompleta,
} from "./esquemas.js";
import { fechaActual } from "../core/utilidades/fechas.js";

export async function obTareasAgrupadasUsuario(req, res) {
  try {
    const tareas = await busTareasAgrupadasUsuario(req.idUsuario);

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      data: tareas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function obtenerTareasUsuario(req, res) {
  try {
    const tareas = await buscarTareasUsuario(req.idUsuario);

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      data: tareas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function obtenerTarea(req, res) {
  try {
    const id = parseInt(req.query.id);

    const tarea = await buscarTareaPorId(id);
    
    if (tarea === null) {
      return res.status(404).json({
        status: 404,
        message: "No se encontro la tarea",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      data: tarea,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function quitarTarea(req, res) {
  try {
    const { id } = req.query;

    const resultado = await eliminarTarea(id);

    if (resultado === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se encontro la tarea",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function registrarTarea(req, res) {
  try {
    const validarPeticion = await ValidarTarea(req.body);

    if (!validarPeticion.success) {
      return res.status(400).json({
        status: 400,
        message: JSON.parse(validarPeticion.error.message),
      });
    }

    const fechaHoy = fechaActual();

    const ESTADO_EN_CUROS = 2;
    const ESTADO_TERMINADO = 3;
    if (validarPeticion.data.id_estado === ESTADO_EN_CUROS) {
      validarPeticion.data.fecha_real_inicio = fechaHoy;
    }

    if (validarPeticion.data.id_estado === ESTADO_TERMINADO) {
      validarPeticion.data.fecha_real_finalizacion = fechaHoy;
    }

    validarPeticion.data.id_usuario = req.idUsuario;

    const tareaCreada = await crearTarea(validarPeticion.data);

    res.status(200).json({
      status: 200,
      message: "Tarea creada con exito",
      data: tareaCreada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function actualizarTareaCompleta(req, res) {
  try {
    const validarPeticion = await ValidarTareaCompleta(req.body);

    if (!validarPeticion.success) {
      return res.status(400).json({
        status: 400,
        message: JSON.parse(validarPeticion.error.message),
      });
    }

    const fechaHoy = fechaActual();

    const ESTADO_EN_CUROS = 2;
    const ESTADO_TERMINADO = 3;
    if (validarPeticion.data.id_estado === ESTADO_EN_CUROS) {
      validarPeticion.data.fecha_real_inicio = fechaHoy;
    }

    if (validarPeticion.data.id_estado === ESTADO_TERMINADO) {
      validarPeticion.data.fecha_real_finalizacion = fechaHoy;
    }

    const tareaActualizada = await actualizarTarea(validarPeticion.data);

    if (tareaActualizada.filasActualizadas === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se pudo actualizar el recurso",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Tarea creada con exito",
      data: tareaActualizada.tareaActualizada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function actualizarTareaEnProgreso(req, res) {
  try {
    const { id } = req.query;
    
    const ESTADO_EN_PROGRESO = 1;


    const dataTarea = {
      id_tarea: id,
      id_estado: ESTADO_EN_PROGRESO,
    };

    const tareaActualizada = await actualizarTarea(dataTarea);

    if (tareaActualizada.filasActualizadas === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se pudo actualizar la tarea",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Tarea creada con exito",
      data: tareaActualizada.tareaActualizada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function actualizarTareaEnCurso(req, res) {
  try {
    const { id } = req.query;
    
    const ESTADO_EN_CUROS = 2;

    const fechaHoy = fechaActual();

    const dataTarea = {
      id_tarea: id,
      id_estado: ESTADO_EN_CUROS,
      fecha_real_inicio: fechaHoy,
    };

    const tareaActualizada = await actualizarTarea(dataTarea);

    if (tareaActualizada.filasActualizadas === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se pudo actualizar la tarea",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Tarea creada con exito",
      data: tareaActualizada.tareaActualizada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function actualizarTareaTerminada(req, res) {
  try {
    const { id } = req.query;

    const ESTADO_TERMINADO = 3;

    const fechaHoy = fechaActual();

    const dataTarea = {
      id_tarea: id,
      id_estado: ESTADO_TERMINADO,
      fecha_real_finalizacion: fechaHoy,
    };

    const tareaActualizada = await actualizarTarea(dataTarea);

    if (tareaActualizada.filasActualizadas === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se pudo actualizar la tarea",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Tarea creada con exito",
      data: tareaActualizada.tareaActualizada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

// Horas
export async function registrarHora(req, res) {
  try {
    const validarPeticion = await ValidarHora(req.body);

    if (!validarPeticion.success) {
      return res.status(400).json({
        status: 400,
        message: JSON.parse(validarPeticion.error.message),
      });
    }

    validarPeticion.data.id_usuario = req.idUsuario;
    validarPeticion.data.costo_hora = req.costoHora;

    const horaCreada = await crearHora(validarPeticion.data);

    res.status(200).json({
      status: 200,
      message: "Tarea creada con exito",
      data: horaCreada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function obtenerHorasUsuario(req, res) {
  try {
    const horas = await buscarHoraUsuario(req.idUsuario);

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      data: horas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function obHorasUsuarioProyecto(req, res) {
  try {
    const id = parseInt(req.query.id);

    const horas = await buscarHoraUsuario(req.idUsuario, id);

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      data: horas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}
