# Book Archive Project Setup Instructions

## Project Overview

A Single Page Application (SPA) for managing a personal book collection with full CRUD operations, built with React, TypeScript, Vite, and Tailwind CSS.

## Completion Status

- ✅ Project scaffolded with Vite + React + TypeScript
- ✅ Dependencies installed (React, Tailwind CSS, Axios, Lucide React)
- ✅ Project structure created with components and API service
- ✅ Styling configured with Tailwind CSS and PostCSS
- ✅ Build verified - no errors
- ✅ Documentation created

## Configuration Required

### MockAPI Setup

1. Create a free account at [mockapi.io](https://mockapi.io)
2. Create a new project and resource named "books"
3. Define the schema with: id, title, author, description, coverImage, isFavorite
4. Copy your API endpoint URL
5. Update `src/api/bookApi.ts` line 6 with your endpoint:
   ```typescript
   const API_URL = 'YOUR_MOCKAPI_ENDPOINT_HERE';
   ```

## Development Workflow

### Start Development Server
```bash
npm run dev
```
The app will be available at http://localhost:5173

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Key Features Implemented

- Display books in a responsive grid layout
- Search functionality (filters by title/author)
- Add new books via modal form
- Edit existing books
- Delete books with confirmation
- Toggle favorite status with heart icon
- Real-time API synchronization

## File Structure

```
src/
├── api/
│   └── bookApi.ts          # API calls to MockAPI
├── components/
│   ├── BookCard.tsx        # Individual book card
│   └── BookModal.tsx       # Add/Edit form modal
├── App.tsx                 # Main application
├── main.tsx                # Entry point
└── index.css               # Tailwind CSS

Configuration Files:
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS plugins
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## Next Steps

1. **Configure MockAPI**: Follow the MockAPI Setup section above
2. **Start Development**: Run `npm run dev`
3. **Test Features**: Add, edit, delete, and search for books
4. **Deploy**: Build with `npm run build` and deploy the dist folder

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 + Flowbite
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Backend Mock**: MockAPI.io
