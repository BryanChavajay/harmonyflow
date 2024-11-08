import { Modulo, Rol, RolPermiso } from "./entidad.js";

export async function obtenerModulos() {
  const modulos = await Modulo.findAll();
  return modulos;
}

export async function crearRol(rol) {
  const nuevoRol = await Rol.create({
    rol,
  });
  return nuevoRol;
}

export async function crearRolModulo(rolModulos) {
  const nuevosPermisos = await RolPermiso.bulkCreate(rolModulos, {
    validate: true,
  });
  return nuevosPermisos;
}

export async function obtenerRoles() {
  const roles = await Rol.findAll();
  return roles;
}

export async function obtenerRolId(idRol) {
  const rol = await Rol.findByPk(idRol)
  return rol;
}

export async function obtenerPermisos(idRol) {
  const permisos = await RolPermiso.findAll({
    where: { id_rol: idRol },
  });
  return permisos;
}
