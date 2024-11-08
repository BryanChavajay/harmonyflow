import { encriptar } from "../core/utilidades/encriptacion.js";
import { ValidarParcialUsuario, ValidarUsuario } from "./esquemas.js";
import {
  actualizarUsuario,
  buscarPorNombre,
  crearUsuario,
  obtenerParcialPorUuid,
  obtenerPorId,
  obtenerPorUuid,
  obtenerUsuariosPaginados,
  buscarPorCorreoUsuario,
} from "./modelo.js";
import { crearUsuariLinea } from "../lineas/modelo.js";

export function verificar(req, res) {
  try {
    res.status(200).json({
      status: 200,
      message: "Bievenido de nuevo",
      usuario: req.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function obtenerUsuarios(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const informacionUsuarios = await obtenerUsuariosPaginados(page, pageSize);

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      data: informacionUsuarios,
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

    const usuarios = await buscarPorNombre(nombre);

    if (usuarios.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se encontró el recurso",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      data: usuarios,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function obtenerPorCodigo(req, res) {
  try {
    const { codigo } = req.query;

    const usuario = await obtenerParcialPorUuid(codigo);

    if (!usuario) {
      return res.status(404).json({
        status: 404,
        message: "No se encontró el recurso",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      data: usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function crearNuevoUsuario(req, res) {
  try {
    const validarPeticion = await ValidarUsuario(req.body);

    if (!validarPeticion.success) {
      return res.status(400).json({
        status: 400,
        message: JSON.parse(validarPeticion.error.message),
      });
    }

    const correoRegistrado = await buscarPorCorreoUsuario(
      validarPeticion.data.correo
    );

    if (correoRegistrado) {
      return res.status(400).json({
        status: 400,
        message: "Correo registrado",
      });
    }

    const usuarioRegistrado = await buscarPorCorreoUsuario(
      validarPeticion.data.usuario
    );

    if (usuarioRegistrado) {
      return res.status(400).json({
        status: 400,
        message: "Usuario registrado",
      });
    }

    const contraseniaEncriptada = await encriptar(
      validarPeticion.data.contrasenia
    );

    validarPeticion.data.contrasenia = contraseniaEncriptada;

    const usuarioCreado = await crearUsuario(validarPeticion.data);

    const { id_usuario, contrasenia, ...usuarioSinId } = usuarioCreado.toJSON();

    const lineaDesarrolloDefecto = await crearUsuariLinea({
      id_usuario,
      id_linea: 1,
    });

    res.status(200).json({
      status: 200,
      message: "Rol creado con exito",
      data: usuarioSinId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function modificarUsuario(req, res) {
  try {
    const validarPeticion = await ValidarParcialUsuario(req.body);

    if (!validarPeticion.success) {
      return res.status(400).json({
        status: 400,
        message: JSON.parse(validarPeticion.error.message),
      });
    }

    if (validarPeticion.data.contrasenia) {
      validarPeticion.data.contrasenia = await encriptar(
        validarPeticion.data.contrasenia
      );
    }

    const usuarioCreado = await actualizarUsuario(validarPeticion.data);

    if (usuarioCreado.filasActualizadas === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se encontró el recurso",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Usuario actualizado con exito",
      data: usuarioCreado.usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}
