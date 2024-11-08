import { Op } from "sequelize";
import { Usuario } from "./entidad.js";

export async function obtenerPorId(usuarioId) {
  const usuario = await Usuario.findByPk(usuarioId);
  return usuario;
}

export async function buscarParcialPorId(usuarioId) {
  const usuario = await Usuario.findByPk(usuarioId, {
    attributes: {
      exclude: [
        "contrasenia",
        "id_usuario",
        "usuario",
        "id_rol",
        "esta_activo",
      ],
    },
  });
  return usuario;
}

export async function obtenerParcialPorUuid(uuidUsuario) {
  const usuario = await Usuario.findOne({
    where: { codigo_usuario: uuidUsuario },
    attributes: { exclude: ["id_usuario", "contrasenia"] },
  });
  return usuario;
}

export async function obtenerPorUuid(uuidUsuario) {
  const usuario = await Usuario.findOne({
    where: { codigo_usuario: uuidUsuario },
  });
  return usuario;
}

export async function obtenerUsuariosPaginados(page = 1, pageSize = 10) {
  const OFFSET = (page - 1) * pageSize;

  const { count, rows } = await Usuario.findAndCountAll({
    offset: OFFSET,
    limit: pageSize,
    order: [["nombre", "ASC"]],
    attributes: { exclude: ["id_usuario", "contrasenia"] },
  });

  return {
    total: count,
    totalPages: Math.ceil(count / pageSize),
    currenPage: page,
    pageSize: pageSize,
    data: rows,
  };
}

export async function buscarPorNombre(nombreUsuario) {
  const usuario = await Usuario.findAll({
    where: { nombre: { [Op.like]: `%${nombreUsuario}%` } },
    attributes: { exclude: ["id_usuario", "contrasenia"] },
  });
  return usuario;
}

export async function buscarPorCorreoUsuario(correo) {
  const usuario = await Usuario.findOne({
    where: {
      [Op.or]: [{ correo: correo }, { usuario: correo }],
    },
  });
  return usuario;
}

export async function crearUsuario(usuario) {
  const usuarioCreado = await Usuario.create({ ...usuario });

  return usuarioCreado;
}

export async function actualizarUsuario(usuario) {
  const codigo_usuario = usuario.codigo_usuario;
  const [filasActualizadas, [usuarioActualizado]] = await Usuario.update(
    usuario,
    {
      where: { codigo_usuario },
      returning: true,
    }
  );

  const { id_usuario, contrasenia, ...usuarioSimple } =
    usuarioActualizado.toJSON();

  return {
    filasActualizadas,
    usuarioActualizado: usuarioSimple,
  };
}
