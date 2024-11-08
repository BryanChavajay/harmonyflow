import { z } from "zod";

const RolPermisoEsquema = z.object({
  id_modulo: z
    .number({
      invalid_type_error: "El id_modulo debe ser un entero positivo",
      required_error: "El id_modulo es obligatorio",
    })
    .int()
    .positive(),
  activo: z.boolean({
    invalid_type_error: "El activo debe ser un boleano",
    required_error: "Activo es obligatorio",
  }),
  id_rol_permiso: z.number().int().positive().optional(),
});

const RolEsquema = z.object({
  rol: z
    .string({
      invalid_type_error:
        "El nombre del rol debe ser un string de 50 caracteres",
      required_error: "Campo requerido",
    })
    .max(50),
  permisos: z.array(RolPermisoEsquema),
});

export async function ValidarRol(input) {
  return RolEsquema.safeParseAsync(input);
}

export async function ValidarRolPermiso(input) {
  return RolPermisoEsquema.safeParseAsync(input);
}
