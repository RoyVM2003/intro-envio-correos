/**
 * Re-export API base para servicios del panel. Compatible con el front anterior en Dokploy.
 * VITE_API_AI_BASE (opcional) permite apuntar la IA a otro backend.
 */
import { API_BASE_URL, TOKEN_KEY, EMAIL_KEY } from '../lib/api'

const envAi = import.meta.env.VITE_API_AI_BASE && String(import.meta.env.VITE_API_AI_BASE).trim()
export const API_BASE = API_BASE_URL
export const API_AI_BASE = envAi || API_BASE
export { TOKEN_KEY, EMAIL_KEY }
