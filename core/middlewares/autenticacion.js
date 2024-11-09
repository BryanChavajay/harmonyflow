import { verificarToken } from "../utilidades/token.js";
import { obtenerPorUuid } from "../../usuarios/modelo.js";

export async function verifyToken(req, res, next) {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No tiene acceso" });
  }
  try {
    const tokenVerificado = verificarToken(token);

    const usuario = await obtenerPorUuid(tokenVerificado.random);

    if (!usuario) {
      return res.status(401).json({ message: "No tiene acceso" });
    }

    const usuarioConvertido = usuario.toJSON();

    req.user = usuarioConvertido.usuario;
    req.idUsuario = usuarioConvertido.id_usuario;
    req.costoHora = usuarioConvertido.costo_hora;
    req.idRol = usuarioConvertido.id_rol;

    next();
  } catch (error) {
    return res
      .status(403)
      .json({ status: 403, message: "El token no es valido" });
  }
}
