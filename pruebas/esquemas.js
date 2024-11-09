import { z } from "zod";

const CampoPruebaEsquema = z.object({
  tipo_dato: z.number().int().positive(),
  nombre_campo: z.string().max(100),
  contenido: z.string(),
});

const PruebaAutomatizadaEsquema = z.object({
  estado_esperado: z.number().int().positive(),
  campos: z.array(CampoPruebaEsquema),
});

const CasoPruebaEsquema = z.object({
  id_proyecto: z.number().int().positive(),
  nombre_caso: z.string().max(75),
  descripcion_caso: z.string().max(75),
  criterios_aceptacion: z.string(),
  prueba_automatizada: PruebaAutomatizadaEsquema.optional(),
});

const ResultadoPruebaEsquema = z.object({
  id_prueba_automatizada: z.number().int().positive(),
  cuerpo_devuelto: z.string(),
  estado_devuelto: z.number().int().positive(),
  correcto: z.boolean(),
});

const ErrorEsquema = z.object({
  id_caso_prueba: z.number().int().positive(),
  descripcion: z.string().max(255),
  id_usuario_asignado: z.string(),
  fecha_reporte: z.string().date(),
});

const ErrorParcialEsquema = z.object({
  id_error: z.number().int().positive(),
  resuelto: z.boolean(),
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

export async function ValidarErrorParcial(input) {
  return ErrorParcialEsquema.safeParseAsync(input);
}
