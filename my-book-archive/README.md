# 📚 Book Archive - Personal Book Catalog SPA

A modern Single Page Application (SPA) for managing your personal book collection with full CRUD (Create, Read, Update, Delete) operations.

## Features

- ✅ **View Books** - Display your book collection in an attractive grid layout
- ✅ **Add Books** - Create new books with title, author, description, and cover image
- ✅ **Edit Books** - Modify book details easily
- ✅ **Delete Books** - Remove books from your collection
- ✅ **Favorite Books** - Mark books as favorites with a heart icon
- ✅ **Search** - Real-time search to filter books by title or author
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Flowbite
- **HTTP Client**: Axios
- **Backend Integration**: MockAPI.io

## Setup Instructions

### 1. Create a MockAPI Account and Resource

1. Visit [mockAPI.io](https://mockapi.io)
2. Sign up for a free account
3. Create a new project
4. Create a Resource named `books` with the following schema:

```json
{
  "id": "integer (auto-generated)",
  "title": "string",
  "author": "string",
  "description": "string",
  "coverImage": "string (URL)",
  "isFavorite": "boolean"
}
```

### 2. Configure API Endpoint

1. Copy your MockAPI endpoint URL
2. Open `src/api/bookApi.ts`
3. Replace the `API_URL` constant with your endpoint:

```typescript
const API_URL = 'https://mockapi.io/api/v1/books'; // Replace with your URL
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── api/
│   └── bookApi.ts          # API service for book operations
├── components/
│   ├── BookCard.tsx        # Individual book card component
│   └── BookModal.tsx       # Modal for add/edit books
├── App.tsx                 # Main application component
├── main.tsx                # Application entry point
└── index.css               # Global styles with Tailwind

public/
└── vite.svg               # Vite logo

index.html                 # HTML entry point
package.json              # Dependencies and scripts
tailwind.config.js        # Tailwind CSS configuration
vite.config.ts            # Vite configuration
tsconfig.json             # TypeScript configuration
```

## Usage Guide

### Adding a Book

1. Click the **"Add Book"** button in the top-right corner
2. Fill in the book details:
   - **Title**: Book name (required)
   - **Author**: Author name (required)
   - **Description**: Brief book summary (optional)
   - **Cover Image URL**: Link to book cover image (required)
3. Optionally check "Add to favorites"
4. Click **"Save"** to add the book

### Searching Books

1. Use the search bar at the top to filter books
2. Search works by book title or author name
3. Results update in real-time as you type

### Marking as Favorite

1. Click the **heart icon** on any book card
2. The icon will fill with red when favorited
3. Changes are saved automatically to the API

### Editing a Book

1. Click the **"Edit"** button on a book card
2. Modify the book details in the modal
3. Click **"Update"** to save changes

### Deleting a Book

1. Click the **"Delete"** button on a book card
2. Confirm the deletion when prompted
3. The book will be removed from your library

## Default Book Images

If you need placeholder images for testing, you can use:

- **Picsum Photos**: `https://picsum.photos/200/300?random=1`
- **Placeholder.com**: `https://via.placeholder.com/200x300?text=Book+Title`
- **Unsplash**: Get direct image URLs from [unsplash.com](https://unsplash.com)
- **Pexels**: Get images from [pexels.com](https://www.pexels.com)

## API Endpoints Used

The application uses the following HTTP methods with MockAPI:

- **GET** `/books` - Fetch all books
- **POST** `/books` - Create a new book
- **PUT** `/books/:id` - Update a book
- **DELETE** `/books/:id` - Delete a book

## Environment Variables

Create a `.env.local` file if you need to customize the API endpoint:

```
VITE_API_URL=https://your-mockapi-url-here
```

Then update `bookApi.ts` to use:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'https://default-api-url';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API Connection Issues

- Verify your MockAPI endpoint URL is correct
- Check that your MockAPI resource is created and named "books"
- Ensure the resource schema matches the Book interface

### Image Issues

- If a book image fails to load, a placeholder image will be displayed
- Use direct image URLs (ensure they're publicly accessible)
- Test image URLs in your browser before adding books

### Styling Issues

- Clear your browser cache if Tailwind styles don't apply
- Verify `tailwind.config.js` includes all content paths

## Future Enhancements

- 🎨 Dark mode toggle
- 📊 Book statistics and analytics
- 🏆 Book ratings and reviews
- 📝 Notes on books you're reading
- 🔖 Book categories and tags
- 💾 Export library as PDF/CSV
- 🔐 User authentication

## License

MIT License - Feel free to use this project for learning and personal use.

## Support

For issues or questions, please refer to:
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [MockAPI Documentation](https://mockapi.io/docs)
