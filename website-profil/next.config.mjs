/** @type {import('next').NextConfig} */
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  reactCompiler: true,
};

export default nextConfig;