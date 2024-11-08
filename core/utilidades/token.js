import jwt from "jsonwebtoken";
import { SECRET } from "../configuraciones.js";

export function generarToken(payload) {
  const token = jwt.sign(payload, SECRET, { expiresIn: "8h" });
  return token;
}

export function verificarToken(token) {
  const payload = jwt.verify(token, SECRET);
  return payload;
}
