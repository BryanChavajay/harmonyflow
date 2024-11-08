import { z } from "zod";

const LoginEsquema = z.object({
  username: z.string().max(75),
  password: z.string().max(50),
});

export async function ValidarLogin(input) {
  return LoginEsquema.safeParseAsync(input);
}
