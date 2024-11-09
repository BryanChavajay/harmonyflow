import {
  CampoPrueba,
  CasoPrueba,
  Error,
  PruebaAutomatizada,
} from "./entidad.js";
import { Proyecto } from "../proyectos/entidad.js";
import { Usuario } from "../usuarios/entidad.js";

CasoPrueba.hasOne(PruebaAutomatizada, { foreignKey: "id_caso_prueba" });
PruebaAutomatizada.belongsTo(CasoPrueba, { foreignKey: "id_caso_prueba" });

PruebaAutomatizada.hasMany(CampoPrueba, {
  foreignKey: "id_prueba_automatizada",
});
CampoPrueba.belongsTo(PruebaAutomatizada, {
  foreignKey: "id_prueba_automatizada",
});

CasoPrueba.hasMany(Error, { foreignKey: "id_caso_prueba", as: "errores" }); // Definir el alias aquí
Error.belongsTo(CasoPrueba, { foreignKey: "id_caso_prueba" });

Error.belongsTo(Usuario, {
  foreignKey: "id_usuario_asignado",
  as: "usuarioAsignado",
});
Usuario.hasMany(Error, { foreignKey: "id_usuario_asignado" });

Proyecto.hasMany(CasoPrueba, { foreignKey: "id_proyecto" });
CasoPrueba.belongsTo(Proyecto, { foreignKey: "id_proyecto" });

export async function crearCasoPrueba(casoPrueba) {
  const casoCreado = await CasoPrueba.create({ ...casoPrueba });
  return casoCreado;
}

export async function crearPruebaAuto(pruebaAuto) {
  const pruebaCreda = await PruebaAutomatizada.create({ ...pruebaAuto });
  return pruebaCreda;
}

export async function crearCampoPrueba(camposPrueba) {
  const camposCreados = await CampoPrueba.bulkCreate(camposPrueba, {
    validate: true,
  });
  return camposCreados;
}

export async function crearError(error) {
  const errorCreado = await Error.create({ ...error });
  return errorCreado;
}

export async function obtenerCasos(id_usuario_crea) {
  const casos = await CasoPrueba.findAll({
    include: [
      {
        model: Proyecto,
        where: { activo: true },
        attributes: ["id_proyecto", "nombre"],
      },
    ],
    where: {
      id_usuario_crea,
    },
  });

  return casos;
}

export async function obtenerCasoDePrueba(id_caso_prueba) {
  const casoPrueba = await CasoPrueba.findOne({
    where: { id_caso_prueba },
    include: [
      {
        model: PruebaAutomatizada,
        include: [
          {
            model: CampoPrueba,
          },
        ],
      },
      {
        model: Error,
        as: "errores", // Usar el mismo alias aquí
        include: [
          { model: Usuario, as: "usuarioAsignado", attributes: ["nombre"] },
        ],
      },
    ],
  });

  return casoPrueba;
}

export async function obtenerErrores(id_usuario_asignado) {
  const errores = await Error.findAll({
    where: {
      id_usuario_asignado,
      resuelto: false,
    },
  });
  return errores;
}

export async function actualizarError(error) {
  const id_error = error.id_error;

  const [filasActualizadas, [errorActualizado]] = await Error.update(error, {
    where: { id_error },
    returning: true,
  });
  return {
    filasActualizadas,
    errorActualizado,
  };
}

export async function actualizarPruebaAuto(pruebaAuto) {
  const id_prueba_automatizada = pruebaAuto.id_prueba_automatizada;

  const [filasActualizadas, [pruebaActualizada]] =
    await PruebaAutomatizada.update(pruebaAuto, {
      where: { id_prueba_automatizada },
      returning: true,
    });
  return {
    filasActualizadas,
    pruebaActualizada,
  };
}
