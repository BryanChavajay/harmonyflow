import { Router } from "express";
import { Login } from "./controlador.js";

export const crearEnrutadorLogin = () => {
  const loginEnrutador = Router();

  loginEnrutador.post("/", Login);

  return loginEnrutador;
};
