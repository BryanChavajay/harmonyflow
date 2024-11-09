import { DataTypes } from "sequelize";
import { sequelize } from "../core/db/db.js";

export const CasoPrueba = sequelize.define(
  "CasoPrueba",
  {
    id_caso_prueba: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_caso_prueba",
    },
    id_proyecto: {
      type: DataTypes.INTEGER,
      field: "id_proyecto",
    },
    id_tarea: {
      type: DataTypes.INTEGER,
      field: "id_tarea",
    },
    nombre_caso: {
      type: DataTypes.STRING,
      field: "nombre_caso",
    },
    descripcion_caso: {
      type: DataTypes.STRING,
      field: "descripcion_caso",
    },
    criterios_aceptacion: {
      type: DataTypes.TEXT,
      field: "criterios_aceptacion",
    },
    id_usuario_crea: {
      type: DataTypes.INTEGER,
      field: "id_usuario_crea",
    },
  },
  {
    timestamps: false,
    tableName: "casos_prueba",
  }
);

export const PruebaAutomatizada = sequelize.define(
  "PruebaAuto",
  {
    id_prueba_automatizada: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_prueba_automatizada",
    },
    id_caso_prueba: {
      type: DataTypes.INTEGER,
      field: "id_caso_prueba",
    },
    estado_esperado: {
      type: DataTypes.INTEGER,
      field: "estado_esperado",
    },
    cuerpo_devuelto: {
      type: DataTypes.TEXT,
      field: "cuerpo_devuelto",
    },
    estado_devuelto: {
      type: DataTypes.INTEGER,
      field: "estado_devuelto",
    },
    correcto: {
      type: DataTypes.BOOLEAN,
      field: "correcto",
    },
    ejecutado: {
      type: DataTypes.BOOLEAN,
      field: "ejecutado",
    },
  },
  {
    timestamps: false,
    tableName: "pruebas_automatizadas",
  }
);

export const CampoPrueba = sequelize.define(
  "CampoPrueba",
  {
    id_campo_prueba: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_campo_prueba",
    },
    id_prueba_automatizada: {
      type: DataTypes.INTEGER,
      field: "id_prueba_automatizada",
    },
    tipo_dato: {
      type: DataTypes.INTEGER,
      field: "tipo_dato",
    },
    nombre_campo: {
      type: DataTypes.STRING,
      field: "nombre_campo",
    },
    contenido: {
      type: DataTypes.TEXT,
      field: "contenido",
    },
  },
  {
    timestamps: false,
    tableName: "campos_prueba",
  }
);

export const Error = sequelize.define(
  "Error",
  {
    id_error: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_error",
    },
    id_caso_prueba: {
      type: DataTypes.INTEGER,
      field: "id_caso_prueba",
    },
    descripcion: {
      type: DataTypes.STRING,
      field: "descripcion",
    },
    id_usuario_asignado: {
      type: DataTypes.INTEGER,
      field: "id_usuario_asignado",
    },
    fecha_reporte: {
      type: DataTypes.DATEONLY,
      field: "fecha_reporte",
    },
    resuelto: {
      type: DataTypes.BOOLEAN,
      field: "resuelto",
    },
    fecha_resuelto: {
      type: DataTypes.DATEONLY,
      field: "fecha_resuelto",
    },
  },
  {
    timestamps: false,
    tableName: "errores",
  }
);
