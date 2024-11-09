import {
  ValidarCasoPrueba,
  ValidarError,
  ValidarResultadoPrueba,
  ValidarErrorParcial,
} from "./esquemas.js";
import {
  actualizarError,
  actualizarPruebaAuto,
  crearCampoPrueba,
  crearCasoPrueba,
  crearError,
  crearPruebaAuto,
  obtenerCasoDePrueba,
  obtenerCasos,
  obtenerErrores,
} from "./modelo.js";
import { obtenerPorUuid } from "../usuarios/modelo.js";
import { fechaActual } from "../core/utilidades/fechas.js";

export async function buscarCasos(req, res) {
  try {
    const casosPrueba = await obtenerCasos(req.idUsuario);
    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      usuario: casosPrueba,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function buscarCaso(req, res) {
  try {
    const id = parseInt(req.params.id);

    const casoPrueba = await obtenerCasoDePrueba(id);

    if (!casoPrueba) {
      return res.status(404).json({
        status: 404,
        message: "No se encontro la prueba",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      usuario: casoPrueba,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function buscarErrores(req, res) {
  try {
    const errores = await obtenerErrores(req.idUsuario);

    res.status(200).json({
      status: 200,
      message: "Peticion completada",
      usuario: errores,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function registrarCasoPrueba(req, res) {
  try {
    const validarPeticion = await ValidarCasoPrueba(req.body);

    if (!validarPeticion.success) {
      return res.status(400).json({
        status: 400,
        message: JSON.parse(validarPeticion.error.message),
      });
    }

    const { prueba_automatizada, ...casoPrueba } = validarPeticion.data;
    casoPrueba.id_usuario_crea = req.idUsuario;
    const casoPruebaCreado = await crearCasoPrueba(casoPrueba);

    console.log(casoPruebaCreado);

    if (validarPeticion.data.prueba_automatizada) {
      const prueba = validarPeticion.data.prueba_automatizada;

      const { estado_esperado, campos } = prueba;

      const pruebaDB = {
        id_caso_prueba: casoPruebaCreado.id_caso_prueba,
        estado_esperado,
        correcto: false,
        ejecutado: false,
      };

      const pruebaCreada = await crearPruebaAuto(pruebaDB);

      const camposDB = campos.map((campo) => {
        return {
          id_prueba_automatizada: pruebaCreada.id_prueba_automatizada,
          tipo_dato: campo.tipo_dato,
          nombre_campo: campo.nombre_campo,
          contenido: campo.contenido,
        };
      });

      const camposCreados = await crearCampoPrueba(camposDB);
    }

    res.status(200).json({
      status: 200,
      message: "Caso registrado con exito",
      data: casoPruebaCreado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function registrarError(req, res) {
  try {
    const validarPeticion = await ValidarError(req.body);

    if (!validarPeticion.success) {
      return res.status(400).json({
        status: 400,
        message: JSON.parse(validarPeticion.error.message),
      });
    }

    const usuarioAsignado = await obtenerPorUuid(
      validarPeticion.data.id_usuario_asignado
    );

    if (!usuarioAsignado) {
      return res.status(400).json({
        status: 400,
        message: "El usuario no esta registrado",
      });
    }

    const usuarioConvertido = usuarioAsignado.toJSON();

    validarPeticion.data.id_usuario_asignado = usuarioConvertido.id_usuario;

    validarPeticion.data.resuelto = false;

    const errorCreado = await crearError(validarPeticion.data);

    res.status(200).json({
      status: 200,
      message: "Caso registrado con exito",
      data: errorCreado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function modificarError(req, res) {
  try {
    const validarPeticion = await ValidarErrorParcial(req.body);

    if (!validarPeticion.success) {
      return res.status(400).json({
        status: 400,
        message: JSON.parse(validarPeticion.error.message),
      });
    }

    const fechaHoy = fechaActual();
    validarPeticion.data.fecha_resuelto = fechaHoy;

    const errorActualizado = await actualizarError(validarPeticion.data);

    if (errorActualizado.filasActualizadas === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se encontró el recurso",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Caso registrado con exito",
      data: errorActualizado.errorActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}

export async function modificarPrueba(req, res) {
  try {
    const validarPeticion = await ValidarResultadoPrueba(req.body);

    if (!validarPeticion.success) {
      return res.status(400).json({
        status: 400,
        message: JSON.parse(validarPeticion.error.message),
      });
    }

    validarPeticion.data.ejecutado = true;

    const pruebaActualizada = await actualizarPruebaAuto(validarPeticion.data);

    if (pruebaActualizada.filasActualizadas === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se encontró el recurso",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Caso registrado con exito",
      data: pruebaActualizada.pruebaActualizada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor, intente luego",
    });
  }
}
