import { DataTypes } from "sequelize";
import { sequelize } from "../core/db/db.js";

export const LineaDesarrollo = sequelize.define(
  "LineaDesarrollo",
  {
    id_linea: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_linea",
    },
    linea: {
      type: DataTypes.STRING,
      field: "linea",
    },
  },
  {
    timestamps: false,
    tableName: "lineas_desarrollo",
  }
);

export const UsuarioLinea = sequelize.define(
  "UsuarioLinea",
  {
    id_usuario_linea: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_usuario_linea",
    },
    id_linea: {
      type: DataTypes.INTEGER,
      field: "id_linea",
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      field: "id_usuario",
    },
  },
  {
    timestamps: false,
    tableName: "usuarios_lineas",
  }
);

LineaDesarrollo.hasMany(UsuarioLinea, { foreignKey: "id_linea" });
UsuarioLinea.belongsTo(LineaDesarrollo, { foreignKey: "id_linea" });
