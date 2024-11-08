import { DataTypes } from "sequelize";
import { sequelize } from "../core/db/db.js";
import { UsuarioLinea } from '../lineas/entidad.js'

export const Usuario = sequelize.define(
  "Usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_usuario",
    },
    codigo_usuario: {
      type: DataTypes.UUIDV4,
      field: "codigo_usuario",
    },
    nombre: {
      type: DataTypes.STRING,
      field: "nombre",
    },
    usuario: {
      type: DataTypes.STRING,
      field: "usuario",
    },
    correo: {
      type: DataTypes.STRING,
      field: "correo",
    },
    contrasenia: {
      type: DataTypes.STRING,
      field: "contrasenia",
    },
    esta_activo: {
      type: DataTypes.BOOLEAN,
      field: "esta_activo",
    },
    id_rol: {
      type: DataTypes.INTEGER,
      field: "id_rol",
    },
    costo_hora: {
      type: DataTypes.FLOAT,
      field: "costo_hora",
    },
  },
  {
    timestamps: false,
    tableName: "usuarios",
  }
);

Usuario.hasMany(UsuarioLinea, { foreignKey: "id_usuario" });
UsuarioLinea.belongsTo(Usuario, { foreignKey: "id_usuario" });