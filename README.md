# Proyecto Planify

![Presentación sin título](https://github.com/user-attachments/assets/fac7a671-01fd-43de-b66f-3f2204f538fa)

Una aplicación web moderna para la gestión de tareas y espacios de trabajo, construida con Next.js 14, TypeScript, y Supabase.

## 🚀 Características

- Autenticación de usuarios
- Creación y gestión de espacios de trabajo
- Gestión de tareas dentro de cada espacio
- Interfaz responsiva y moderna
- Persistencia de datos con Supabase
- Gestión de estado con Redux Toolkit

## 🛠️ Tecnologías

- **Frontend:**
  - Next.js 14
  - TypeScript
  - Redux Toolkit
  - Tailwind CSS
  - Shadcn/ui

- **Backend:**
  - Supabase (Base de datos y autenticación)

- **Herramientas de desarrollo:**
  - ESLint
  - Prettier
  - Zod (validación de formularios)
  - React Hook Form

## 📋 Requisitos previos

- Node.js 18.x o superior
- npm o yarn
- Cuenta en Supabase

## 🔧 Instalación

```bash
npm install
```

## 🚪 Variables de entorno
Agregar archivo .env.local en la raíz del proyecto:

```bash
AUTH_SECRET=TU-CLAVE
NEXT_PUBLIC_SUPABASE_URL=TU-CLAVE
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU-CLAVE
SUPABASE_SERVICE_ROLE_KEY=TU-CLAVE
AUTH_GOOGLE_ID=TU-CLAVE
AUTH_GOOGLE_SECRET=TU-CLAVE
SUPABASE_JWT_SECRET=TU-CLAVE
```

## ▶︎ Inicio

```bash
npm run dev
```

