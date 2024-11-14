export const config = {
  apiUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api",
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;
