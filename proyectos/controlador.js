import { ValidarProyecto, ValidarProyectoActualizado } from "./esquemas.js";
import {
  actualizarProyecto,
  buscarPorId,
  buscarPorNombre,
  buscarPorPagina,
  crearProyecto,
  buscarMisProyectos,
} from "./modelo.js";
import { buscarParcialPorId, obtenerPorUuid } from "../usuarios/modelo.js";

export async function obtenerProyectos(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const proyectos = await buscarPorPagina(page, pageSize);

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
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

export async function obtenerPorId(req, res) {
  try {
    const { id } = req.params;

    const proyecto = await buscarPorId(id);

    if (!proyecto) {
      return res.status(404).json({
        status: 404,
        message: "No se encontró el recurso",
      });
    }

    const proyectoConvertido = proyecto.toJSON();

    const usuarioLider = await buscarParcialPorId(
      proyectoConvertido.id_usuario_lider
    );

    delete proyectoConvertido.id_usuario_lider;

    proyectoConvertido.usuario_lider = usuarioLider.toJSON();

    res.json({
      status: 200,
      message: "Peticion completada",
      data: proyectoConvertido,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function obtenerPorNombre(req, res) {
  try {
    const { nombre } = req.query;

    const proyectos = await buscarPorNombre(nombre);

    if (proyectos.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se encontró el recurso",
      });
    }

    res.json({
      status: 200,
      message: "Peticion completada",
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

export async function registrarProyecto(req, res) {
  try {
    const validarPeticion = await ValidarProyecto(req.body);

    if (!validarPeticion.success) {
      return res.status(400).json({
        status: 400,
        message: JSON.parse(validarPeticion.error.message),
      });
    }

    const usuarioLider = await obtenerPorUuid(
      validarPeticion.data.id_usuario_lider
    );

    if (!usuarioLider) {
      return res.status(400).json({
        status: 400,
        message: "El usuario no esta registrado",
      });
    }

    const usuarioConvertido = usuarioLider.toJSON();

    validarPeticion.data.id_usuario_lider = usuarioConvertido.id_usuario;
    validarPeticion.data.eliminado = false;

    const proyectoRegistrado = await crearProyecto(validarPeticion.data);

    res.status(200).json({
      status: 200,
      message: "Rol creado con exito",
      data: proyectoRegistrado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function modificarProyecto(req, res) {
  try {
    const validarPeticion = await ValidarProyectoActualizado(req.body);

    if (!validarPeticion.success) {
      return res.status(400).json({
        status: 400,
        message: JSON.parse(validarPeticion.error.message),
      });
    }

    const usuarioLider = await obtenerPorUuid(
      validarPeticion.data.id_usuario_lider
    );

    if (!usuarioLider) {
      return res.status(400).json({
        status: 400,
        message: "El usuario no esta registrado",
      });
    }

    const usuarioConvertido = usuarioLider.toJSON();

    validarPeticion.data.id_usuario_lider = usuarioConvertido.id_usuario;

    const proyectoActualizado = await actualizarProyecto(validarPeticion.data);

    if (proyectoActualizado.filasActualizadas === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se encontró el recurso",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Proyecto actualizado con exito",
      data: proyectoActualizado.proyectoActualizado,
    });
  } catch (error) {
    res.status(200).json({
      status: 200,
      message: "Rol creado con exito",
      data: usuarioCreado.usuarioActualizado,
    });
  }
}

export async function eliminarProyecto(req, res) {
  try {
    const id = parseInt(req.query.id);

    const proyectoEliminar = {
      id_proyecto: id,
      eliminado: true,
      activo: false,
    };

    const proyectoActualizado = await actualizarProyecto(proyectoEliminar);

    if (proyectoActualizado.filasActualizadas === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se encontró el recurso",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Se elimino el proyecto",
    });
  } catch (error) {
    res.status(200).json({
      status: 200,
      message: "Rol creado con exito",
      data: usuarioCreado.usuarioActualizado,
    });
  }
}

export async function obtenerMisProyectos(req, res) {
  try {
    const proyectos = await buscarMisProyectos(req.idUsuario);

    if (proyectos.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se encontró el recurso",
      });
    }

    res.json({
      status: 200,
      message: "Peticion completada",
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
