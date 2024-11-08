import { z } from "zod";

const CasoPruebaEsquema = z.object({
  id_proyecto: z.number().int().positive(),
  id_tarea: z.number().int().positive(),
  nombre_caso: z.string().max(75),
  descripcion_caso: z.string().max(75),
  criterios_aceptacion: z.string(),
  es_automatizada: z.boolean(),
  prueba_automatizada: z
    .array(
      z.object({
        estado_esperado: z.number().int().positive(),
        campos: z.array(
          z.object({
            tipo_dato: z.number().int().positive(),
            nombre_campo: z.string().max(100),
            contenido: z.string(),
          })
        ),
      })
    )
    .optional(),
});

const ResultadoPruebaEsquema = z.object({
  id_prueba_automatizada: z.number().int().positive(),
  cuerpo_devuelto: z.string(),
  estado_devuelto: z.number().int().positive(),
});

const ErrorEsquema = z.object({
  id_caso_prueba: z.number().int().positive(),
  descripcion: z.string().max(255),
  id_usuario_asignado: z.number().int().positive(),
  fecha_reporte: z.string().date(),
});

export async function ValidarCasoPrueba(input) {
  return CasoPruebaEsquema.safeParseAsync(input);
}

export async function ValidarResultadoPrueba(input) {
  return ResultadoPruebaEsquema.safeParseAsync(input);
}

export async function ValidarError(input) {
  return ErrorEsquema.safeParseAsync(input);
}
