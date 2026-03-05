# Intro → Home → Panel (envío de correos)

Proyecto con flujo de 3 pasos:

1. **Página de introducción** (`/`)  
   Información importante y botón **Iniciar** que lleva a `/home`.

2. **Home** (`/home`)  
   Segunda pantalla con botón **Iniciar envío** que lleva a `/panel`.

3. **Panel** (`/panel`)  
   Proceso para enviar correos: pasos (Importar contactos → Diseñar mensaje → Enviar campaña).  
   La estructura y el estilo están inspirados en el proyecto `panel-promociones`; aquí es un esqueleto para que luego integres los componentes reales (Excel, formulario, envío).

## Cómo ejecutar

```bash
cd intro-envio-correos
npm install
npm run dev
```

Abre la URL que indique Vite (por ejemplo `http://localhost:5173`) y navega: Intro → Iniciar → Home → Iniciar envío → Panel.

## Rutas

| Ruta     | Descripción                          |
|----------|--------------------------------------|
| `/`      | Página de introducción (info + Iniciar) |
| `/home`  | Home intermedio (Iniciar envío)       |
| `/panel` | Proceso de envío de correos (pasos)  |
