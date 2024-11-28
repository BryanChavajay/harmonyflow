import { Proyecto } from "../proyectos/entidad.js";
import { Hora } from "../tareas/entidad.js";
import { CasoPrueba } from "../pruebas/entidad.js";
import { sequelize } from "../core/db/db.js";

Proyecto.hasMany(Hora, {
  foreignKey: "id_proyecto",
  sourceKey: "id_proyecto",
});

Hora.belongsTo(Proyecto, {
  foreignKey: "id_proyecto",
  targetKey: "id_proyecto",
});

Proyecto.hasMany(CasoPrueba, {
  foreignKey: "id_proyecto",
  sourceKey: "id_proyecto",
});

CasoPrueba.belongsTo(Proyecto, {
  foreignKey: "id_proyecto",
  targetKey: "id_proyecto",
});

export async function obtenerCostoTotalPorProyecto() {
  const proyectosConHoras = await Proyecto.findAll({
    attributes: [
      "id_proyecto",
      "nombre",
      "costo_estimado",
      [
        sequelize.fn(
          "SUM",
          sequelize.literal('"Horas"."costo_hora" * "Horas"."horas_trabajadas"')
        ),
        "costo_total",
      ],
    ],
    where: {
      eliminado: false,
    },
    include: [
      {
        model: Hora,
        attributes: [],
        required: true, // Solo incluir proyectos que tengan registros de horas
        as: "Horas", // Usar el alias correcto para la tabla Hora
      },
    ],
    group: ["Proyecto.id_proyecto", "Proyecto.nombre"],
    raw: true, // Obtiene los resultados como objetos planos
  });

  return proyectosConHoras;
}

export async function obtenerProCantidadCasos() {
  const proyectos = await Proyecto.findAll({
    attributes: [
      "id_proyecto",
      "nombre",
      [
        sequelize.fn("COUNT", sequelize.col("CasoPruebas.id_caso_prueba")),
        "cantidad_casos",
      ],
    ],
    where: { eliminado: false },
    include: [
      {
        model: CasoPrueba,
        attributes: [],
        required: true,
      },
    ],
    group: ["Proyecto.id_proyecto"], // Agrupamos por el id del proyecto
    raw: true, // Para obtener el resultado como un objeto plano
  });

  return proyectos;
}
