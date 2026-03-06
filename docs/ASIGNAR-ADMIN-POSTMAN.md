# Cómo asignar rol de administrador (Postman o similar)

Si el botón del panel no funciona o necesitas asignar el rol manualmente, puedes usar **Postman**, **Insomnia** o **curl**.

---

## Paso 1: Obtener tu token de administrador

Solo un usuario que **ya sea administrador** puede asignar el rol a otros. Si te dieron el rol de admin, inicia sesión para obtener el token.

**POST** `https://osdemsventas.site/api/v1/auth/login`

**Headers:**
- `Content-Type: application/json`

**Body (raw JSON):**
```json
{
  "email": "tu-correo-admin@ejemplo.com",
  "password": "tu-contraseña"
}
```

**Respuesta** (ejemplo):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

Copia el valor de `token` para usarlo en los siguientes pasos.

---

## Paso 2: Listar usuarios o buscar por correo

### Opción A: Listar todos los usuarios

**GET** `https://osdemsventas.site/api/v1/admin/users`

**Headers:**
- `Authorization: Bearer TU_TOKEN_AQUI`

En la respuesta verás la lista de usuarios. Cada usuario tendrá un `id` (o `userId`, `user_id`). Anota el **ID** del usuario al que quieres asignar el rol de administrador (por ejemplo, `marketing@osdemsdigital.com`).

### Opción B: Buscar por correo (si la API lo soporta)

**GET** `https://osdemsventas.site/api/v1/admin/users/search?email=marketing@osdemsdigital.com`

**Headers:**
- `Authorization: Bearer TU_TOKEN_AQUI`

---

## Paso 3: Asignar rol de administrador

**PUT** `https://osdemsventas.site/api/v1/admin/users/{ID_DEL_USUARIO}`

Sustituye `{ID_DEL_USUARIO}` por el ID que obtuviste en el paso 2 (por ejemplo: `123` o un UUID).

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer TU_TOKEN_AQUI`

**Body (raw JSON)** – prueba primero con:
```json
{
  "role": "administrator"
}
```

Si el backend responde con error, prueba con:
```json
{
  "panel_role": "administrator"
}
```

---

## Ejemplo con curl

```bash
# 1. Login y guardar token
TOKEN=$(curl -s -X POST https://osdemsventas.site/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"tu-admin@ejemplo.com","password":"tu-pass"}' \
  | jq -r '.token')

# 2. Listar usuarios
curl -s https://osdemsventas.site/api/v1/admin/users \
  -H "Authorization: Bearer $TOKEN" | jq .

# 3. Asignar admin (reemplaza USER_ID por el ID real)
curl -X PUT "https://osdemsventas.site/api/v1/admin/users/USER_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"role":"administrator"}'
```

---

## Notas

- Si no tienes token de admin, alguien que ya sea administrador debe asignarte el rol primero (o hacerlo directamente en la base de datos).
- La estructura exacta de la respuesta de usuarios puede variar. Si ves el mensaje "No se pudo obtener el ID del usuario", revisa en Postman el JSON que devuelve `GET /api/v1/admin/users` y localiza en qué campo viene el identificador (`id`, `userId`, etc.).
