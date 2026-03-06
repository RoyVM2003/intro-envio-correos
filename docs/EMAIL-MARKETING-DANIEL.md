# Respuestas para Daniel – Email marketing (enlaces, imágenes, responder, CTA)

## 1. Links de YouTube o TikTok

**Sí se puede hacer desde el frontend.** En el campo de **Mensaje** (Paso 2) puedes pegar enlaces completos, por ejemplo:

```
Mira este video: https://www.youtube.com/watch?v=xxxxx
O nuestro TikTok: https://www.tiktok.com/@cuenta/video/xxxxx
```

El texto se envía tal cual. El correo tendrá esos enlaces; si el backend envía HTML, serán clicables. Si envía texto plano, se verán como URL y el usuario puede copiarlas.

---

## 2. Banner o imagen

**Depende del backend.** El frontend solo envía texto en el campo Mensaje.  
Para incluir imágenes haría falta:

- Que el backend acepte y use **HTML** en el cuerpo del correo.
- Opciones:
  1. **Enlace a imagen:** en el mensaje puedes poner algo como:  
     `[Imagen: https://tu-sitio.com/banner.jpg]`  
     Si el backend convierte eso en `<img src="...">`, la imagen se mostraría.
  2. **Subir imagen en el frontend:** añadir un campo para subir banner/imagen y que el frontend envíe la URL o el HTML correspondiente al backend.
  3. **Cambiar el backend:** que el template del correo permita un campo de imagen/banner y lo inserte en el HTML.

---

## 3. Botón de responder que no funciona

**Es un tema del backend.** La configuración de “Responder” depende de:

1. **Reply-To:** que el correo tenga `Reply-To` con el email correcto.
2. **From:** que el `From` sea un correo válido al que se puedan enviar respuestas (no un no-reply si quieres recibir respuestas).

Revisar con el equipo de backend cómo se monta el correo y qué headers usa.

---

## 4. Recuadros sin CTA (call to action)

**Hay dos niveles:**

**A) Lo que Daniel puede hacer ahora:**  
En el mensaje puede poner texto con CTAs enlaces, por ejemplo:

```
¡Reserva ya! https://osdemsventas.com/reservar
O contáctanos: https://osdemsventas.com/contacto
```

**B) Lo que toca al backend:**  
Si el email usa plantillas con “recuadros” o bloques fijos, esos CTAs deben definirse en la plantilla HTML del correo que genera el backend.

---

## Resumen

| Funcionalidad           | ¿Quién lo hace? | Estado                                      |
|-------------------------|-----------------|---------------------------------------------|
| Links YouTube/TikTok    | Daniel (frontend) | Ya se puede: pegar links en el mensaje      |
| Banner/imagen           | Backend + posible frontend | Requiere soporte HTML o subida de imagen   |
| Botón Responder         | Backend         | Revisar Reply-To y From del correo         |
| CTAs en texto           | Daniel (frontend) | Ya se puede: poner links en el mensaje      |
| CTAs en recuadros       | Backend         | Cambiar plantilla HTML del correo           |
