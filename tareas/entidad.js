import { DataTypes } from "sequelize";
import { sequelize } from "../core/db/db.js";
import { Proyecto } from "../proyectos/entidad.js";

export const Tarea = sequelize.define(
  "Tarea",
  {
    id_tarea: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_tarea",
    },
    id_proyecto: {
      type: DataTypes.INTEGER,
      field: "id_proyecto",
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      field: "id_usuario",
    },
    nombre_tarea: {
      type: DataTypes.STRING,
      field: "nombre_tarea",
    },
    descripcion_tarea: {
      type: DataTypes.STRING,
      field: "descripcion_tarea",
    },
    id_estado: {
      type: DataTypes.INTEGER,
      field: "id_estado",
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      field: "fecha_inicio",
    },
    fecha_finalizacion: {
      type: DataTypes.DATEONLY,
      field: "fecha_finalizacion",
    },
    fecha_real_inicio: {
      type: DataTypes.DATEONLY,
      field: "fecha_real_inicio",
    },
    fecha_real_finalizacion: {
      type: DataTypes.DATEONLY,
      field: "fecha_real_finalizacion",
    },
  },
  {
    timestamps: false,
    tableName: "tareas",
  }
);

export const Hora = sequelize.define(
  "Hora",
  {
    id_hora: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_hora",
    },
    id_proyecto: {
      type: DataTypes.INTEGER,
      field: "id_proyecto",
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      field: "id_usuario",
    },
    costo_hora: {
      type: DataTypes.FLOAT,
      field: "costo_hora",
    },
    horas_trabajadas: {
      type: DataTypes.FLOAT,
      field: "horas_trabajadas",
    },
    fecha_trabajada: {
      type: DataTypes.DATEONLY,
      field: "fecha_trabajada",
    },
  },
  {
    timestamps: false,
    tableName: "horas",
  }
);
