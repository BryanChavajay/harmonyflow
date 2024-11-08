import {
  ValidarLinea,
  ValidarLineaUsuario,
  ValidarLineaCom,
} from "./esquemas.js";
import {
  buscarLineaPorId,
  buscarLineaPorNom,
  buscarLineas,
  crearLinea,
  buscarUsuarioLinea,
  crearUsuariLinea,
  modificarLinea,
  obUsuariosDeLinea,
  obUsuariosPorLinea,
  sacarUsuarioLinea,
} from "./modelo.js";
import { obtenerPorUuid } from "../usuarios/modelo.js";

export async function obtenerLineas(req, res) {
  try {
    const lineas = await buscarLineas();

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      data: lineas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function obtenerLineaPorId(req, res) {
  try {
    const { id } = req.params;
    const linea = await buscarLineaPorId(id);

    if (!linea) {
      return res.status(404).json({
        status: 404,
        message: "Recurso no encontrado",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      data: linea,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function obtenerLineaPorNom(req, res) {
  try {
    const { nombre } = req.query;
    const linea = await buscarLineaPorNom(nombre);

    if (!linea) {
      return res.status(404).json({
        status: 404,
        message: "Recurso no encontrado",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      data: linea,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function registrarLinea(req, res) {
  try {
    const validarPeticion = await ValidarLinea(req.body);

    if (!validarPeticion.success) {
      return res.status(400).json({
        status: 400,
        message: JSON.parse(validarPeticion.error.message),
      });
    }

    const lineaCreada = await crearLinea(validarPeticion.data.linea);

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      data: lineaCreada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function actualizarLinea(req, res) {
  try {
    const validarPeticion = await ValidarLineaCom(req.body);

    if (!validarPeticion.success) {
      return res.status(400).json({
        status: 400,
        message: JSON.parse(validarPeticion.error.message),
      });
    }

    const lineaActualizada = await modificarLinea(validarPeticion.data);

    if (lineaActualizada.filasActualizadas === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se encontró el recurso",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      data: lineaActualizada.lineaActualizada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function registrarUsuarioLinea(req, res) {
  try {
    const validarPeticion = await ValidarLineaUsuario(req.body);

    if (!validarPeticion.success) {
      return res.status(400).json({
        status: 400,
        message: JSON.parse(validarPeticion.error.message),
      });
    }

    const linea = await buscarLineaPorId(validarPeticion.data.id_linea);

    if (!linea) {
      return res.status(400).json({
        status: 400,
        message: "La linea no existe",
      });
    }

    const usuario = await obtenerPorUuid(validarPeticion.data.id_usuario);

    if (!usuario) {
      return res.status(400).json({
        status: 400,
        message: "El usuario no esta registrado",
      });
    }

    const usuarioConvertido = usuario.toJSON();

    const usuarioRegistrado = await buscarUsuarioLinea(
      validarPeticion.data.id_linea,
      usuarioConvertido.id_usuario
    );

    if (usuarioRegistrado) {
      return res.status(400).json({
        status: 400,
        message: "El usuario ya esta registrado en la linea",
      });
    }

    validarPeticion.data.id_usuario = usuarioConvertido.id_usuario;

    const lineaCreada = await crearUsuariLinea(validarPeticion.data);

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      linea_creada: lineaCreada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function eliminarUsuarioLinea(req, res) {
  try {
    const { id } = req.query;

    const resultadoEliminacion = await sacarUsuarioLinea(id);

    if (resultadoEliminacion === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se encontro el registro a eliminar",
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

export async function obtenerUsuariosPorLinea(req, res) {
  try {
    const usuariosPorLinea = await obUsuariosPorLinea();

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      data: usuariosPorLinea,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function obtenerUsuariosDeLinea(req, res) {
  try {
    const { id } = req.query;

    const usuariosPorLinea = await obUsuariosDeLinea(id);

    if (!usuariosPorLinea) {
      return res.satus(404).json({
        status: 404,
        message: "No se encontro la linea",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      data: usuariosPorLinea,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}
