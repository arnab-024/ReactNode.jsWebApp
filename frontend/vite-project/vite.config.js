import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: "localhost",
    port: 5173,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "certs/localhost-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "certs/localhost.pem")),
    },
  },
});
