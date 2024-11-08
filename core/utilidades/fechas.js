import { format } from "@formkit/tempo";

export function fechaActual() {
  const fechaActual = format({
    date: new Date(),
    format: "YYYY-MM-DD",
    tz: "America/Guatemala",
  });
  return fechaActual;
}
