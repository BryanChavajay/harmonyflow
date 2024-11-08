import { ValidarLogin } from "./esquema.js";
import { buscarPorCorreoUsuario } from "../usuarios/modelo.js";
import { compararTexto } from "../core/utilidades/encriptacion.js";
import { generarToken } from "../core/utilidades/token.js";

export async function Login(req, res) {
  try {
    const validarPeticion = await ValidarLogin(req.body);

    if (!validarPeticion.success) {
      return res.status(400).json({
        status: 400,
        message: JSON.parse(validarPeticion.error.message),
      });
    }

    const usuario = await buscarPorCorreoUsuario(validarPeticion.data.username);

    if (!usuario) {
      return res.status(404).json({
        status: 404,
        message: "Usuario o contraseña incorrectos",
      });
    }

    const usuarioConvertido = usuario.toJSON();

    const contraseniaCorrecta = await compararTexto(
      validarPeticion.data.password,
      usuarioConvertido.contrasenia
    );

    if (!contraseniaCorrecta) {
      return res.status(404).json({
        status: 404,
        message: "Usuario o contraseña incorrectos",
      });
    }

    const payload = {
      user: usuarioConvertido.usuario,
      random: usuarioConvertido.codigo_usuario,
    };

    const tokenGenerado = generarToken(payload);

    res.status(200).json({
      status: 200,
      message: "Petición exitosa",
      data: {
        token: tokenGenerado,
        type: "Bearer",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, revise su petición o intente luego",
      data: {},
    });
  }
}
