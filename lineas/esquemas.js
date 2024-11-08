import { z } from "zod";

const LineaEsquema = z.object({
  linea: z
    .string({
      invalid_type_error:
        "El nombre de la linea debe ser un string de 50 caracteres",
      required_error: "Campo requerido",
    })
    .max(50),
});

const LineaCompletaEsquema = z.object({
  linea: z
    .string({
      invalid_type_error:
        "El nombre de la linea debe ser un string de 50 caracteres",
      required_error: "Campo requerido",
    })
    .max(50),
  id_linea: z.number().int().positive(),
});

const UsuarioLineaEsquema = z.object({
  id_linea: z.number().int().positive(),
  id_usuario: z.string(),
});

export async function ValidarLinea(input) {
  return LineaEsquema.safeParseAsync(input);
}

export async function ValidarLineaCom(input) {
  return LineaCompletaEsquema.safeParseAsync(input);
}

export async function ValidarLineaUsuario(input) {
  return UsuarioLineaEsquema.safeParseAsync(input);
}
