import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:5173",
  "https://harmonyflow-app.vercel.app/",
  "http://harmonyflow-app.vercel.app/",
  "https://harmonyflow-app.onrender.com/",
  "http://harmonyflow-app.onrender.com/",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  });
