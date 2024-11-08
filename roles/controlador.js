import { ValidarRol } from "./esquemas.js";
import {
  obtenerModulos,
  crearRol,
  crearRolModulo,
  obtenerRoles,
  obtenerPermisos,
  obtenerRolId,
} from "./modelo.js";

export async function obtenerTodosModulos(req, res) {
  try {
    const modulos = await obtenerModulos();
    res.status(200).json({
      status: 200,
      message: "Petición completada",
      data: modulos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function obtenerTodosRoles(req, res) {
  try {
    const roles = await obtenerRoles();
    res.status(200).json({
      status: 200,
      message: "Petición completada",
      data: roles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function obtenerRolPorId(req, res) {
  try {
    const { id } = req.params;
    const rol = await obtenerRolId(id);

    if (!rol) {
      return res.status(404).json({
        status: 404,
        message: "No se encontró el recurso",
      });
    }

    const permisosRol = await obtenerPermisos(id);

    res.status(200).json({
      status: 200,
      message: "Petición completada",
      data: {
        ...rol.toJSON(), // Convertimos rol a JSON si es un modelo de Sequelize
        permisos: permisosRol.map((permiso) => permiso.toJSON()), // Convertimos cada permiso a JSON
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function crearRolPermisos(req, res) {
  try {
    const validarPeticion = await ValidarRol(req.body);

    if (!validarPeticion.success) {
      return res.status(400).json({
        status: 400,
        message: JSON.parse(validarPeticion.error.message),
      });
    }

    const rolCreado = await crearRol(validarPeticion.data.rol);

    const permisosActivos = validarPeticion.data.permisos
      .filter((permiso) => permiso.activo)
      .map((permiso) => ({
        id_rol: rolCreado.id_rol,
        id_modulo: permiso.id_modulo,
      }));

    const permisosDelRol = await crearRolModulo(permisosActivos);

    res.status(200).json({
      status: 200,
      message: "Rol creado con exito",
      data: {
        info_rol: rolCreado,
        permisos: permisosDelRol,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}
