import { Op } from "sequelize";
import { Proyecto } from "./entidad.js";
import { LineaDesarrollo, UsuarioLinea } from "../lineas/entidad.js";

export async function buscarPorPagina(page = 1, pageSize = 1) {
  const OFFSET = (page - 1) * pageSize;

  const { count, rows } = await Proyecto.findAndCountAll({
    offset: OFFSET,
    limit: pageSize,
    order: [["nombre", "ASC"]],
  });

  return {
    total: count,
    totalPages: Math.ceil(count / pageSize),
    currenPage: page,
    pageSize: pageSize,
    data: rows,
  };
}

export async function buscarPorId(idProyecto) {
  const proyecto = Proyecto.findOne({ where: { id_proyecto: idProyecto } });
  return proyecto;
}

export async function buscarPorNombre(nombreProyecto) {
  const proyectos = await Proyecto.findAll({
    where: { nombre: { [Op.like]: `%${nombreProyecto}%` } },
  });
  return proyectos;
}

export async function crearProyecto(proyecto) {
  const proyectoCreado = Proyecto.create({ ...proyecto });
  return proyectoCreado;
}

export async function actualizarProyecto(proyecto) {
  const id_proyecto = proyecto.id_proyecto;

  const [filasActualizadas, [proyectoActualizado]] = await Proyecto.update(
    proyecto,
    {
      where: { id_proyecto },
      returning: true,
    }
  );

  return {
    filasActualizadas,
    proyectoActualizado,
  };
}

export async function buscarMisProyectos(idUsuario) {
  const proyectos = await Proyecto.findAll({
    attributes: ["id_proyecto", "nombre"],
    where: {
      activo: true,
    },
    include: [
      {
        model: LineaDesarrollo,
        required: true,
        include: [
          {
            model: UsuarioLinea,
            required: true,
            where: { id_usuario: idUsuario },
            attributes: [],
          },
        ],
        attributes: [],
      },
    ],
  });

  return proyectos;
}
