import { compare, hash } from "bcrypt";
import { SALT_ROUNDS } from "../configuraciones.js";

export async function encriptar(texto) {
  const textoHasheado = await hash(texto, SALT_ROUNDS);
  return textoHasheado;
}

export async function compararTexto(textoPlano, textoHasheado) {
  return compare(textoPlano, textoHasheado);
}
