import { z } from "zod";

const UsuarioEsquema = z.object({
  nombre: z.string().max(100),
  usuario: z.string().max(50),
  correo: z.string().max(50),
  contrasenia: z.string().max(50),
  esta_activo: z.boolean(),
  id_rol: z.number().int().positive(),
  costo_hora: z.number().positive(),
});

const UsuarioParcialEsquema = z.object({
  codigo_usuario: z.string(),
  nombre: z.string().max(100),
  usuario: z.string().max(50),
  correo: z.string().max(50),
  contrasenia: z.string().max(50).optional(),
  esta_activo: z.boolean(),
  id_rol: z.number().int().positive(),
  costo_hora: z.number().positive(),
});

export async function ValidarUsuario(input) {
  return UsuarioEsquema.safeParseAsync(input);
}

export async function ValidarParcialUsuario(input) {
  return UsuarioParcialEsquema.safeParseAsync(input);
}
