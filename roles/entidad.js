import { DataTypes } from "sequelize";
import { sequelize } from "../core/db/db.js";

export const Modulo = sequelize.define(
  "Modulo",
  {
    id_modulo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_modulo",
    },
    modulo: {
      type: DataTypes.STRING,
      field: "modulo",
    },
  },
  {
    timestamps: false,
    tableName: "modulos",
  }
);

export const Rol = sequelize.define(
  "Rol",
  {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_rol",
    },
    rol: {
      type: DataTypes.STRING,
      field: "rol",
    },
  },
  {
    timestamps: false,
    tableName: "roles",
  }
);

export const RolPermiso = sequelize.define(
  "RolPermiso",
  {
    id_rol_permiso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_rol_permiso",
    },
    id_rol: {
      type: DataTypes.INTEGER,
      field: "id_rol",
    },
    id_modulo: {
      type: DataTypes.INTEGER,
      field: "id_modulo",
    },
    id_permiso: {
      type: DataTypes.INTEGER,
      field: "id_permiso",
    },
  },
  {
    timestamps: false,
    tableName: "roles_permisos",
  }
);
