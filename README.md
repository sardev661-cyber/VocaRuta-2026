# VocaRuta MVP

VocaRuta es un MVP de orientación vocacional para estudiantes de 4.º y 5.º de secundaria. Su propuesta central es convertir la exploración de carreras en una ruta activa:

1. **Conócete:** cuestionario exploratorio de cinco dimensiones.
2. **Explora:** diez carreras con actividades, cursos y entornos de trabajo.
3. **Prueba:** cuatro casos interactivos que permiten tomar una decisión y reflexionar.
4. **Compara:** hasta tres alternativas lado a lado, sin montos ni promesas laborales.
5. **Decide:** reporte personal con acciones concretas para continuar validando.

## Ejecutar el proyecto

Requiere Node.js 18 o superior.

```bash
npm install
npm run dev
```

La aplicación usa React, Vite, React Router y CSS responsivo. No necesita backend para la demostración: el perfil, las respuestas y el avance se guardan en `localStorage` en el navegador actual.

## Alcance del MVP

- No crea cuentas ni envía correos.
- No usa inteligencia artificial ni afirma que el instrumento esté validado.
- La afinidad es una puntuación ilustrativa de exploración, no un diagnóstico psicológico ni una predicción de éxito.
- Las experiencias son casos educativos ficticios y no representan toda una profesión.
- El panel para colegios contiene datos ficticios y está marcado como demostración.
- El reporte puede imprimirse o guardarse como PDF desde el navegador y descargarse como texto.

## Comandos

```bash
npm run dev
npm run build
npm run lint
npm run preview
```
