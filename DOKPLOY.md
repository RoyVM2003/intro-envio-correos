# Reemplazar el front "front" (panel-ventas) en Dokploy

Este proyecto (**intro-envio-correos**) está preparado para sustituir al front actual del servicio **front** (panel-ventas / production) en Dokploy. Usa las **mismas variables de entorno** y consume las **mismas APIs** que el proyecto anterior.

---

## 1. Configuración del proyecto anterior (para copiar)

En el servicio **front** de Dokploy tenías algo así:

| Dónde | Qué |
|-------|-----|
| **Provider** | GitHub / Gitlab / etc. (repositorio del código) |
| **Deploy** | Build del frontend (Vite) |
| **Environment** | Variables para la API |

### Variables de entorno (Environment)

Configura en la pestaña **Environment** del servicio **front** (igual que el proyecto anterior):

| Variable | Valor típico | Descripción |
|----------|--------------|-------------|
| `VITE_API_BASE` | `https://osdemsventas.site` | URL base del backend (auth, excel, campañas, envío) |
| `VITE_API_AI_BASE` | `https://osdemsventas.site` | (Opcional) URL para la API de IA; si no se pone, se usa `VITE_API_BASE` |

Con eso el front ya apunta al mismo backend que el anterior.

---

## 2. Cómo consume las APIs este proyecto

### Auth (login, verificación, olvidar contraseña)

- **Base:** `VITE_API_BASE` (ej. `https://osdemsventas.site`).
- **Endpoints:**
  - `POST /api/v1/auth/login` — login (token + email en `sessionStorage`).
  - `POST /api/v1/auth/forgot-password` — olvidé contraseña.
  - `POST /api/v1/auth/verify` — verificar correo con código.
  - `POST /api/v1/auth/resend-verification` — reenviar código.
- **Archivos:** `src/lib/api.js`, `src/context/AuthContext.jsx`, `src/services/authService.js` (si se usa).

### Excel y campañas

- **Base:** `VITE_API_BASE` (mismo que auth).
- **Endpoints:**
  - `POST /api/v1/excel/import` — subir Excel de contactos.
  - `GET /api/v1/excel/campaigns` — listar campañas (paginación opcional).
  - `POST /api/v1/excel/campaigns` — crear campaña.
  - `GET /api/v1/excel/campaigns/:id` — obtener una campaña.
  - `PUT /api/v1/excel/campaigns/:id` — actualizar campaña.
  - `DELETE /api/v1/excel/campaigns/:id` — eliminar campaña.
- **Archivos:** `src/services/excelService.js`, `src/services/campaignService.js`, `src/services/api.js`.

### Envío de correos (lanzar campaña)

- **Endpoint:** `POST /api/v1/campaigns/send`.
- **Body:** `{ subject, message, body }` (token Bearer en cabecera).
- **Archivo:** `src/services/campaignService.js` → `sendCampaign(subject, message)`.

La lógica de “enviar campaña” es solo llamar a este endpoint; el envío real lo hace el backend.

### IA (sugerencia de campaña)

- **Base:** `VITE_API_AI_BASE` (si no existe, se usa `VITE_API_BASE`).
- **Endpoint:** `POST /api/v1/ai/campaign-suggestion` con `{ prompt }`.
- **Archivo:** `src/services/aiService.js`.

---

## 3. Pasos para reemplazar en Dokploy

1. **Código nuevo**
   - Si el despliegue es por **Git**: cambia el **repositorio** del servicio **front** al repo donde esté **intro-envio-correos** (y la rama que uses).
   - Si subes build a mano: genera `npm run build` y despliega la carpeta `dist` como antes.

2. **Build (igual que antes)**
   - **Build command:** `npm run build` (o `npm ci && npm run build` si quieres instalar en el servidor).
   - **Output:** carpeta `dist` (Vite). En Dokploy suele usarse como raíz del sitio estático.

3. **Environment**
   - En el servicio **front** → **Environment**, deja o añade:
     - `VITE_API_BASE=https://osdemsventas.site`
     - `VITE_API_AI_BASE=https://osdemsventas.site` (opcional; si no, se usa `VITE_API_BASE`).
   - No hace falta cambiar nada más si el backend sigue en `osdemsventas.site`.

4. **Deploy**
   - **Deploy** (o **Rebuild** si solo cambiaste repo/env).  
   - Tras el deploy, el front nuevo (intro-envio-correos) estará en la misma URL, consumiendo las mismas APIs y la misma lógica de envío de correos vía backend.

---

## 4. Resumen

| Aspecto | Proyecto anterior (front) | Este proyecto (intro-envio-correos) |
|---------|---------------------------|-------------------------------------|
| Env vars | `VITE_API_BASE`, `VITE_API_AI_BASE` | Igual |
| API por defecto | `https://osdemsventas.site` | `https://osdemsventas.site` |
| Auth | `/api/v1/auth/*` | Igual |
| Excel / campañas | `/api/v1/excel/*`, `/api/v1/campaigns/send` | Igual |
| IA | `/api/v1/ai/campaign-suggestion` | Igual |
| Build | `npm run build` → `dist` | Igual |

Solo cambias el origen del código (repo o build) y mantienes el mismo Environment; el reemplazo queda listo.
