import { z } from "zod";

const ProyectoEsquema = z.object({
  nombre: z.string().max(100),
  descripcion: z.string().max(256),
  id_linea: z.number().int().positive(),
  costo_estimado: z.number().positive(),
  fecha_inicio: z.string().date(),
  fecha_final: z.string().date(),
  activo: z.boolean(),
  id_usuario_lider: z.string(),
});

const ProyectoActualizadoEsquema = z.object({
  id_proyecto: z.number().int().positive(),
  nombre: z.string().max(100),
  descripcion: z.string().max(256),
  id_linea: z.number().int().positive(),
  costo_estimado: z.number().positive(),
  fecha_inicio: z.string().date(),
  fecha_final: z.string().date(),
  activo: z.boolean(),
  id_usuario_lider: z.string(),
});

export async function ValidarProyecto(input) {
  return ProyectoEsquema.safeParseAsync(input);
}

export async function ValidarProyectoActualizado(input) {
  return ProyectoActualizadoEsquema.safeParseAsync(input);
}
