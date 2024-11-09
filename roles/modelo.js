import { Modulo, Rol, RolPermiso } from "./entidad.js";

// Asociación entre RolPermiso y Modulo
RolPermiso.belongsTo(Modulo, { foreignKey: "id_modulo" });
Modulo.hasMany(RolPermiso, { foreignKey: "id_modulo" });

// Asociación entre Rol y RolPermiso
Rol.hasMany(RolPermiso, { foreignKey: "id_rol" });
RolPermiso.belongsTo(Rol, { foreignKey: "id_rol" });

export async function obtenerModulosRol(id_rol) {
  const permisos = await RolPermiso.findAll({
    where: { id_rol },
    include: [
      {
        model: Modulo,
        attributes: ["id_modulo", "modulo"],
      },
    ],
    attributes: [], // Excluye los atributos de RolPermiso
  });

  // Extraer los datos de los módulos en un array
  const modulos = permisos.map((permiso) => ({
    id_modulo: permiso.Modulo.id_modulo,
    modulo: permiso.Modulo.modulo,
  }));

  return modulos;
}

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
  const rol = await Rol.findByPk(idRol);
  return rol;
}

export async function obtenerPermisos(idRol) {
  const permisos = await RolPermiso.findAll({
    where: { id_rol: idRol },
  });
  return permisos;
}
