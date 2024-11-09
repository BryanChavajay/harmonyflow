import { DataTypes } from "sequelize";
import { sequelize } from "../core/db/db.js";
import { LineaDesarrollo } from "../lineas/entidad.js";

export const Proyecto = sequelize.define(
  "Proyecto",
  {
    id_proyecto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_proyecto",
    },
    nombre: {
      type: DataTypes.STRING,
      field: "nombre",
    },
    descripcion: {
      type: DataTypes.STRING,
      field: "descripcion",
    },
    id_linea: {
      type: DataTypes.INTEGER,
      field: "id_linea",
    },
    costo_estimado: {
      type: DataTypes.FLOAT,
      field: "costo_estimado",
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      field: "fecha_inicio",
    },
    fecha_final: {
      type: DataTypes.DATEONLY,
      field: "fecha_final",
    },
    activo: {
      type: DataTypes.BOOLEAN,
      field: "activo",
    },
    id_usuario_lider: {
      type: DataTypes.INTEGER,
      field: "id_usuario_lider",
    },
    eliminado: {
      type: DataTypes.BOOLEAN,
      field: "eliminado",
    },
  },
  {
    timestamps: false,
    tableName: "proyectos",
  }
);

// Relaciones con las lineas de desarrollo
Proyecto.belongsTo(LineaDesarrollo, { foreignKey: "id_linea" });
LineaDesarrollo.hasMany(Proyecto, { foreignKey: "id_linea" });
