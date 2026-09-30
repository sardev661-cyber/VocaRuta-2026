# VocaRuta - Prototipo Frontend

VocaRuta es una plataforma de orientación vocacional enfocada en estudiantes de 4° y 5° de secundaria. Su premisa principal es: **"Descubre. Prueba. Decide. Antes de elegir una carrera, vive una parte de ella."**

Este proyecto es un prototipo visual (frontend-only) desarrollado para validar la idea de negocio y el flujo de usuario.

## 🚀 Tecnologías Utilizadas

- **React 18** (Vite)
- **Tailwind CSS v4** (Sistema de diseño corporativo y accesible)
- **React Router v6** (Enrutamiento cliente)
- **Recharts** (Visualización de datos)
- **Lucide React** (Íconos)

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm (o yarn/pnpm)

## 🛠️ Instalación y Ejecución

1. Clona el repositorio o abre la carpeta del proyecto.
2. Instala las dependencias:
   \`\`\`bash
   npm install
   \`\`\`
3. Inicia el servidor de desarrollo:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Abre tu navegador en \`http://localhost:5173\` (o el puerto que te indique Vite).

## 🏗️ Arquitectura del Proyecto

El proyecto está diseñado de forma modular (Feature-based), de manera que si en un futuro se conecta a un backend real, los cambios en la UI sean mínimos.

\`\`\`text
src/
├── app/                  # Configuración global (App.jsx, router.jsx, rutas constantes)
├── components/           # Componentes UI reutilizables (Botones, Tarjetas, Modales, etc.)
├── context/              # Estado global usando Context API y useReducer (JourneyContext)
├── data/                 # Base de datos mockeada (carreras, preguntas, simulaciones)
├── features/             # Módulos principales agrupados por funcionalidad:
│   ├── assessment/       # Etapa 1: Cuestionario
│   ├── auth/             # Registro / Login visual
│   ├── compare/          # Etapa 4: Tabla comparativa
│   ├── dashboard/        # Panel principal del estudiante
│   ├── explore/          # Etapa 2: Resultados y Radar
│   ├── landing/          # Página pública
│   ├── pricing/          # Paywall visual
│   ├── report/           # Etapa 5: Reporte final (print friendly)
│   ├── school-panel/     # Panel B2B para colegios
│   └── simulations/      # Etapa 3: Motor de simulaciones prácticas
├── layouts/              # Envoltorios de página (Public, Student, School)
├── services/             # Capa de abstracción de datos (promesas con delays simulados)
└── utils/                # Funciones puras (cálculo algorítmico de compatibilidad)
\`\`\`

## 🧠 Flujo de la Aplicación

La aplicación funciona en memoria (State en `JourneyContext`). Las 5 etapas están simuladas:

1. **Conócete:** 15 preguntas que evalúan 5 dimensiones.
2. **Explora:** Función pura de compatibilidad (distancia matemática) que retorna el porcentaje de afinidad con las carreras y grafica un radar.
3. **Prueba:** Motor dinámico que lee JSONs de simulaciones por pasos y pide justificaciones. Al finalizar, el feedback recalcula la afinidad global (+% boost).
4. **Compara:** Tabla comparativa técnica side-by-side de hasta 3 carreras.
5. **Decide:** Emisión de un reporte listo para imprimir (`@media print`), evaluando la certeza antes/después del usuario.

## 🎨 Sistema de Diseño

Se configuró el `@theme` de Tailwind v4 en `src/index.css` siguiendo pautas de diseño serio y empresarial (B2C/B2B):
- **Colores:** Azul corporativo, Grises (Slate) para fondos y textos, y colores semánticos (verde, rojo, ámbar). Sin modo oscuro para mantener la estética de documento formal.
- **Tipografía:** Inter (Google Fonts).
- **Accesibilidad:** Uso de variables CSS legibles, estados `:focus` y `:disabled` visibles.
- **Responsividad:** 100% adaptable de móvil a pantallas Ultra-Wide.

---
**Nota:** Al ser un prototipo frontend, si recargas la página (F5) en las etapas internas, el estado en memoria se reiniciará.
