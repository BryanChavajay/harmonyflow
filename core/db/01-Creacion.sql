CREATE EXTENSION "uuid-ossp";

CREATE TABLE "modulos" (
  "id_modulo" SERIAL PRIMARY KEY NOT NULL,
  "modulo" VARCHAR(50)
);

CREATE TABLE "permisos" (
  "id_permiso" SERIAL PRIMARY KEY NOT NULL,
  "permiso" VARCHAR(50)
);

CREATE TABLE "roles" (
  "id_rol" SERIAL PRIMARY KEY NOT NULL,
  "rol" VARCHAR(75)
);

CREATE TABLE "roles_permisos" (
  "id_rol_permiso" SERIAL PRIMARY KEY NOT NULL,
  "id_rol" INT,
  "id_modulo" INT,
  "id_permiso" INT
);

CREATE TABLE "usuarios" (
  "id_usuario" SERIAL PRIMARY KEY NOT NULL,
  "codigo_usuario" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "nombre" VARCHAR(100),
  "usuario" VARCHAR(50),
  "correo" VARCHAR(75),
  "contrasenia" VARCHAR(300),
  "esta_activo" BOOL,
  "id_rol" INT,
  "costo_hora" FLOAT
);

CREATE TABLE "lineas_desarrollo" (
  "id_linea" SERIAL PRIMARY KEY NOT NULL,
  "linea" VARCHAR(50)
);

CREATE TABLE "proyectos" (
  "id_proyecto" SERIAL PRIMARY KEY NOT NULL,
  "nombre" VARCHAR(100),
  "descripcion" VARCHAR(256),
  "id_linea" INT,
  "costo_estimado" FLOAT,
  "fecha_inicio" DATE,
  "fecha_final" DATE,
  "activo" BOOL,
  "id_usuario_lider" INT
);

CREATE TABLE "usuarios_lineas" (
  "id_usuario_linea" SERIAL PRIMARY KEY NOT NULL,
  "id_linea" INT,
  "id_usuario" INT
);

CREATE TABLE "estados" (
  "id_estado" SERIAL PRIMARY KEY NOT NULL,
  "estado" VARCHAR(50)
);

CREATE TABLE "tareas" (
  "id_tarea" SERIAL PRIMARY KEY NOT NULL,
  "id_proyecto" INT,
  "id_usuario" INT,
  "nombre_tarea" VARCHAR(75),
  "descripcion_tarea" VARCHAR(256),
  "id_estado" INT,
  "fecha_inicio" DATE,
  "fecha_finalizacion" DATE,
  "fecha_real_inicio" DATE,
  "fecha_real_finalizacion" DATE
);

CREATE TABLE "horas" (
  "id_hora" SERIAL PRIMARY KEY NOT NULL,
  "id_proyecto" INT,
  "id_usuario" INT,
  "costo_hora" FLOAT,
  "horas_trabajadas" FLOAT,
  "fecha_trabajada" DATE
);

CREATE TABLE "casos_prueba" (
  "id_caso_prueba" SERIAL PRIMARY KEY NOT NULL,
  "id_proyecto" INT,
  "id_tarea" INT,
  "nombre_caso" VARCHAR(75),
  "descripcion_caso" VARCHAR(75),
  "criterios_aceptacion" TEXT,
  "id_usuario_crea" INT
);

CREATE TABLE "pruebas_automatizadas" (
  "id_prueba_automatizada" SERIAL PRIMARY KEY NOT NULL,
  "id_caso_prueba" INT,
  "estado_esperado" INT,
  "cuerpo_devuelto" TEXT,
  "estado_devuelto" INT,
  "correcto" BOOL,
  "ejecutado" BOOL
);

CREATE TABLE "campos_prueba" (
  "id_campo_prueba" SERIAL PRIMARY KEY NOT NULL,
  "id_prueba_automatizada" INT,
  "tipo_dato" INT,
  "nombre_campo" VARCHAR(100),
  "contenido" TEXT
);

CREATE TABLE "errores" (
  "id_error" SERIAL PRIMARY KEY NOT NULL,
  "id_caso_prueba" INT,
  "descripcion" VARCHAR(255),
  "id_usuario_asignado" INT,
  "fecha_reporte" DATE,
  "resuelto" BOOL,
  "fecha_resuelto" DATE
);

ALTER TABLE "roles_permisos" ADD FOREIGN KEY ("id_rol") REFERENCES "roles" ("id_rol");
ALTER TABLE "roles_permisos" ADD FOREIGN KEY ("id_modulo") REFERENCES "modulos" ("id_modulo");
ALTER TABLE "roles_permisos" ADD FOREIGN KEY ("id_permiso") REFERENCES "permisos" ("id_permiso");


ALTER TABLE "usuarios" ADD FOREIGN KEY ("id_rol") REFERENCES "roles" ("id_rol");


ALTER TABLE "proyectos" ADD FOREIGN KEY ("id_linea") REFERENCES "lineas_desarrollo" ("id_linea");
ALTER TABLE "proyectos" ADD FOREIGN KEY ("id_usuario_lider") REFERENCES "usuarios" ("id_usuario");


ALTER TABLE "usuarios_lineas" ADD FOREIGN KEY ("id_linea") REFERENCES "lineas_desarrollo" ("id_linea");
ALTER TABLE "usuarios_lineas" ADD FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id_usuario");


ALTER TABLE "tareas" ADD FOREIGN KEY ("id_proyecto") REFERENCES "proyectos" ("id_proyecto");
ALTER TABLE "tareas" ADD FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id_usuario");
ALTER TABLE "tareas" ADD FOREIGN KEY ("id_estado") REFERENCES "estados" ("id_estado");


ALTER TABLE "horas" ADD FOREIGN KEY ("id_proyecto") REFERENCES "proyectos" ("id_proyecto");
ALTER TABLE "horas" ADD FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id_usuario");


ALTER TABLE "casos_prueba" ADD FOREIGN KEY ("id_proyecto") REFERENCES "proyectos" ("id_proyecto");
ALTER TABLE "casos_prueba" ADD FOREIGN KEY ("id_tarea") REFERENCES "tareas" ("id_tarea");
ALTER TABLE "casos_prueba" ADD FOREIGN KEY ("id_usuario_crea") REFERENCES "usuarios" ("id_usuario");


ALTER TABLE "pruebas_automatizadas" ADD FOREIGN KEY ("id_caso_prueba") REFERENCES "casos_prueba" ("id_caso_prueba");


ALTER TABLE "campos_prueba" ADD FOREIGN KEY ("id_prueba_automatizada") REFERENCES "pruebas_automatizadas" ("id_prueba_automatizada");


ALTER TABLE "errores" ADD FOREIGN KEY ("id_caso_prueba") REFERENCES "casos_prueba" ("id_caso_prueba");
ALTER TABLE "errores" ADD FOREIGN KEY ("id_usuario_asignado") REFERENCES "usuarios" ("id_usuario");
