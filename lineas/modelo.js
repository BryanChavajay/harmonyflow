import { Op } from "sequelize";
import { LineaDesarrollo, UsuarioLinea } from "./entidad.js";
import { Usuario } from "../usuarios/entidad.js";

export async function buscarLineas() {
  const lineasDesarrollo = await LineaDesarrollo.findAll();
  return lineasDesarrollo;
}

export async function buscarLineaPorId(idLinea) {
  const lineaDesarrollo = await LineaDesarrollo.findOne({
    where: { id_linea: idLinea },
  });
  return lineaDesarrollo;
}

export async function buscarLineaPorNom(nombreLinea) {
  const lineaDesarrollo = await LineaDesarrollo.findOne({
    where: { linea: { [Op.like]: `%${nombreLinea}%` } },
  });
  return lineaDesarrollo;
}

export async function crearLinea(linea) {
  const nuevoLinea = await LineaDesarrollo.create({
    linea,
  });
  return nuevoLinea;
}

export async function modificarLinea(linea) {
  const id_linea = linea.id_linea;
  const [filasActualizadas, [lineaActualizada]] = await LineaDesarrollo.update(
    linea,
    {
      where: { id_linea },
      returning: true,
    }
  );

  return {
    filasActualizadas,
    lineaActualizada,
  };
}

export async function crearUsuariLinea(usuarioLinea) {
  const nuevoUsuarioLinea = await UsuarioLinea.create({ ...usuarioLinea });
  return nuevoUsuarioLinea;
}

export async function sacarUsuarioLinea(id_usuario_linea) {
  const eliminacionResultado = await UsuarioLinea.destroy({
    where: { id_usuario_linea },
  });
  return eliminacionResultado;
}

export async function obUsuariosPorLinea() {
  const lineasConUsuarios = await LineaDesarrollo.findAll({
    include: [
      {
        model: UsuarioLinea,
        include: [
          {
            model: Usuario,
            attributes: ["codigo_usuario", "nombre", "correo", "costo_hora"],
          },
        ],
      },
    ],
    order: [
      ["id_linea", "ASC"],
      [UsuarioLinea, Usuario, "nombre", "ASC"], // Ordena usuarios por nombre dentro de cada línea
    ],
  });

  // Transformar la estructura para agrupar los usuarios por línea
  const resultado = lineasConUsuarios.map((linea) => ({
    id_linea: linea.id_linea,
    linea: linea.linea,
    usuarios: linea.UsuarioLineas.map((userLinea) => userLinea.Usuario),
  }));

  return resultado;
}

export async function obUsuariosDeLinea(idLinea) {
  const lineaConUsuarios = await LineaDesarrollo.findOne({
    where: { id_linea: idLinea },
    include: [
      {
        model: UsuarioLinea,
        include: [
          {
            model: Usuario,
            attributes: ["codigo_usuario", "nombre", "correo", "costo_hora"],
          },
        ],
      },
    ],
    order: [[UsuarioLinea, Usuario, "nombre", "ASC"]], // Ordena usuarios por nombre
  });

  if (!lineaConUsuarios) {
    return null; // Línea no encontrada
  }

  // Estructura para mostrar los datos de la línea y los usuarios asociados
  const resultado = {
    id_linea: lineaConUsuarios.id_linea,
    linea: lineaConUsuarios.linea,
    usuarios: lineaConUsuarios.UsuarioLineas.map(
      (userLinea) => userLinea.Usuario
    ),
  };

  return resultado;
}

export async function buscarUsuarioLinea(idLinea, idUsuario) {
  const usuarioLinea = UsuarioLinea.findOne({
    where: { id_linea: idLinea, id_usuario: idUsuario },
  });
  return usuarioLinea;
}
