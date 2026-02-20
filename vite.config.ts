import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const productionBase = repositoryName ? `/${repositoryName}/` : "/Annivarsary_Greeting/";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH ?? (process.env.NODE_ENV === "production" ? productionBase : "/"),
});
