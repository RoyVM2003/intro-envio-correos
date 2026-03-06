# Scripts

## Crear una cuenta desde la API (registro)

Para crear una **nueva cuenta desde cero** usando la API:

```bash
node scripts/register-user.js <email> <password> [nombre]
```

**Ejemplos:**

```bash
node scripts/register-user.js miemail@ejemplo.com MiClaveSegura123
node scripts/register-user.js miemail@ejemplo.com MiClaveSegura123 "Mi Nombre"
```

Si la API está en otra URL:

```bash
set VITE_API_BASE=https://tu-dominio.com
node scripts/register-user.js email@ejemplo.com password
```

**Nota:** Si aparece "Datos de entrada inválidos", el backend puede exigir un formato de contraseña (mínimo caracteres, mayúsculas, números, etc.). Prueba con una contraseña más larga y que incluya mayúsculas, minúsculas y números.

Después de crear la cuenta, inicia sesión en la app con ese email y contraseña.
