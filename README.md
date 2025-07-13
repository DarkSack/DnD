# D&D App - Gestor de Personajes de Dungeons & Dragons

Una aplicación web moderna para gestionar personajes de Dungeons & Dragons, construida con React, TypeScript y Vite.

## Características Principales

- 🎮 Gestión completa de personajes

  - Crear nuevos personajes
  - Ver detalles de personajes
  - Editar atributos
  - Eliminar personajes

- 🔍 Sistema de filtrado avanzado

  - Buscar por nombre
  - Filtrar por raza
  - Filtrar por clase
  - Filtrar por estado

- 📊 Visualización de estadísticas

  - Total de personajes
  - Personajes activos
  - Nivel promedio

- 📱 Interfaz responsive
  - Vista en cuadrícula
  - Vista en lista
  - Ordenamiento por nombre y nivel

## Tecnologías Utilizadas

- React 18
- TypeScript
- Vite
- React Router DOM
- Lucide React (iconos)
- Tailwind CSS
- Shadcn UI Components

## Requisitos

- Node.js 18+
- npm o yarn

## Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/DarkSack/DnD.git
```

2. Instalar dependencias

```bash
npm install
# o
yarn install
```

3. Iniciar el servidor de desarrollo

```bash
npm run dev
# o
yarn dev
```

## Estructura del Proyecto

```
dndapp/
├── src/
│   ├── pages/          # Páginas principales
│   │   ├── Characters/ # Componentes de gestión de personajes
│   │   ├── Campaigns/  # Campañas futuras
│   │   └── Home/       # Página principal
│   ├── components/     # Componentes reutilizables
│   ├── data/           # Datos de ejemplo
│   └── router/         # Configuración de rutas
└── public/             # Archivos estáticos
```

## Contribuir

1. Crea una rama para tu feature:

```bash
git checkout -b feature/AmazingFeature
```

2. Commit tus cambios:

```bash
git commit -m 'Add some AmazingFeature'
```

3. Push a la rama:

```bash
git push origin feature/AmazingFeature
```

4. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT - ve el archivo [LICENSE](LICENSE) para detalles.
