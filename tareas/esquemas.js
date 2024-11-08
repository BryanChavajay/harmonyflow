import { z } from "zod";

const TareaEsquema = z.object({
  id_proyecto: z.number().int().positive(),
  nombre_tarea: z.string().max(75),
  descripcion_tarea: z.string().max(256),
  id_estado: z.number().int().positive(),
  fecha_inicio: z.string().date(),
  fecha_finalizacion: z.string().date(),
});

const TareaCompletaEsquema = z.object({
  id_tarea: z.number().int().positive(),
  id_proyecto: z.number().int().positive(),
  nombre_tarea: z.string().max(75),
  descripcion_tarea: z.string().max(256),
  id_estado: z.number().int().positive(),
  fecha_inicio: z.string().date(),
  fecha_finalizacion: z.string().date(),
});

const TareaCortaEsquema = z.object({
  id_tarea: z.number().int().positive(),
  id_estado: z.number().int().positive(),
  fecha_real_inicio: z.string().date().optional(),
  fecha_real_finalizacion: z.string().date().optional(),
});

const HoraEsquema = z.object({
  id_proyecto: z.number().int().positive(),
  horas_trabajadas: z.number().positive(),
  fecha_trabajada: z.string().date(),
});

export async function ValidarTarea(input) {
  return TareaEsquema.safeParseAsync(input);
}

export async function ValidarTareaCompleta(input) {
  return TareaCompletaEsquema.safeParseAsync(input);
}

export async function ValidarTareaCorta(input) {
  return TareaCortaEsquema.safeParseAsync(input);
}

export async function ValidarHora(input) {
  return HoraEsquema.safeParseAsync(input);
}
