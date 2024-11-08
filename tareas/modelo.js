import { sequelize } from "../core/db/db.js";
import { Hora, Tarea } from "./entidad.js";
import { Proyecto } from "../proyectos/entidad.js";

export async function buscarTareaPorId(idTarea) {
  const tarea = await Tarea.findByPk(idTarea);
  return tarea;
}

export async function busTareasAgrupadasUsuario(id_usuario) {
  Proyecto.hasMany(Tarea, { foreignKey: "id_proyecto" });
  Tarea.belongsTo(Proyecto, { foreignKey: "id_proyecto" });
  const tareasAgrupadas = await Tarea.findAll({
    include: [
      {
        model: Proyecto,
        where: { activo: true },
        attributes: [],
      },
    ],
    where: { id_usuario },
    attributes: [
      "id_estado",
      [
        sequelize.fn(
          "json_agg",
          sequelize.literal(
            `json_build_object(
              'id_tarea', "Tarea"."id_tarea",
              'nombre_tarea', "Tarea"."nombre_tarea",
              'descripcion_tarea', "Tarea"."descripcion_tarea",
              'fecha_inicio', "Tarea"."fecha_inicio",
              'fecha_finalizacion', "Tarea"."fecha_finalizacion",
              'fecha_real_inicio', "Tarea"."fecha_real_inicio",
              'fecha_real_finalizacion', "Tarea"."fecha_real_finalizacion",
              'id_proyecto', "Tarea"."id_proyecto"
            )`
          )
        ),
        "tareas",
      ],
    ],
    group: ["id_estado"],
    raw: true,
  });

  return tareasAgrupadas;
}

export async function buscarTareasUsuario(id_usuario) {
  Proyecto.hasMany(Tarea, { foreignKey: "id_proyecto" });
  Tarea.belongsTo(Proyecto, { foreignKey: "id_proyecto" });
  const tareasUsuario = await Tarea.findAll({
    include: [
      {
        model: Proyecto,
        where: { activo: true }, // Filtrar solo los proyectos activos
        attributes: [], // No incluir atributos de Proyecto en la respuesta
      },
    ],
    where: { id_usuario },
    raw: true,
  });

  return tareasUsuario;
}

export async function crearTarea(tarea) {
  const tareaCreada = await Tarea.create({ ...tarea });
  return tareaCreada;
}

export async function actualizarTarea(tarea) {
  const id_tarea = tarea.id_tarea;
  const [filasActualizadas, [tareaActualizada]] = await Tarea.update(tarea, {
    where: { id_tarea },
    returning: true,
  });

  return {
    filasActualizadas,
    tareaActualizada,
  };
}

export async function eliminarTarea(id_tarea) {
  const eliminacionResultado = await Tarea.destroy({
    where: { id_tarea },
  });
  return eliminacionResultado;
}

export async function buscarHoraPorId(idHora) {
  const hora = await Hora.findByPk(idHora);
  return hora;
}

export async function buscarHoraUsuario(id_usuario, id_proyecto = null) {
  Proyecto.hasMany(Hora, { foreignKey: "id_proyecto" });
  Hora.belongsTo(Proyecto, { foreignKey: "id_proyecto" });
  if (id_proyecto !== null) {
    const horasUsuario = await Hora.findAll({
      include: [
        {
          model: Proyecto,
          where: { activo: true, id_proyecto },
          attributes: [],
        },
      ],
      where: { id_usuario },
      raw: true,
    });

    return horasUsuario;
  }

  const horasUsuario = await Hora.findAll({
    include: [
      {
        model: Proyecto,
        where: { activo: true },
        attributes: [],
      },
    ],
    where: { id_usuario },
    raw: true,
  });

  return horasUsuario;
}

export async function buscarHorasProyecto(id_proyecto) {
  const horas = await Hora.findAll({ where: { id_proyecto } });
  return horas;
}

export async function crearHora(tarea) {
  const horaCreada = await Hora.create({ ...tarea });
  return horaCreada;
}

export async function actualizarHora(hora) {
  const id_hora = hora.id_hora;
  const [filasActualizadas, [horaActualizada]] = await Hora.update(hora, {
    where: { id_hora },
    returning: true,
  });

  return {
    filasActualizadas,
    horaActualizada,
  };
}

export async function eliminarHora(id_hora) {
  const eliminacionResultado = await Hora.destroy({
    where: { id_hora },
  });
  return eliminacionResultado;
}
