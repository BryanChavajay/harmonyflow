INSERT INTO modulos(modulo) VALUES ('MI-AGENDA'),('MI-TABLERO'),('BACKLOG'),('PRUEBAS'),('PROYECTOS'),
('LINEAS-DESARROLLO'),('ESTADISTICAS'),('USUARIOS'),('ROLES');

INSERT INTO roles(rol) VALUES('ADMIN'),('SR'),('JR');

INSERT INTO estados(estado) VALUES ('EN PROGRESO'), ('EN CURSO'), ('TERMINADO')

INSERT INTO lineas_desarrollo(linea) VALUES ('GENERAL')

INSERT INTO proyectos(nombre, descripcion, id_linea, costo_estimado, fecha_inicio, fecha_final, activo, id_usuario_lider, eliminado)
	VALUES ('SIN PROYECTO ASIGNADO', 'Destinado a registrar tareas generales', 1, 0, '2024-01-01', '2024-12-31', TRUE, 1, FALSE)
