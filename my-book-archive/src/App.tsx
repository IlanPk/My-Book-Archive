import { useState, useEffect } from 'react';
import BookCard from './components/BookCard';
import BookModal from './components/BookModal';
import { Book, fetchBooks, createBook, updateBook, deleteBook } from './api/bookApi';
import { Plus, Search } from 'lucide-react';

const sampleBooks = [
    {
        title: 'The Last Lantern',
        author: 'Maya Cohen',
        description: 'A gripping tale of love and loss across changing seasons.',
        coverImage: 'https://picsum.photos/seed/book1/300/450',
        isFavorite: true,
    },
    {
        title: 'Echoes of Tomorrow',
        author: 'Daniel Levi',
        description: 'An unexpected journey that questions everything you know.',
        coverImage: 'https://picsum.photos/seed/book2/300/450',
        isFavorite: false,
    },
    {
        title: 'A Walk Through Shadows',
        author: 'Yael Abram',
        description: 'A poetic exploration of memory, identity, and time.',
        coverImage: 'https://picsum.photos/seed/book3/300/450',
        isFavorite: true,
    },
    {
        title: 'The Paper Compass',
        author: 'Eden Barak',
        description: 'A fast-paced mystery with twists at every turn.',
        coverImage: 'https://picsum.photos/seed/book4/300/450',
        isFavorite: false,
    },
    {
        title: 'Fragments of Light',
        author: 'Noam Shalev',
        description: 'A heartwarming story about finding home in unlikely places.',
        coverImage: 'https://picsum.photos/seed/book5/300/450',
        isFavorite: false,
    },
];

function App() {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | undefined>();

    // Fetch books on component mount
    useEffect(() => {
        const loadBooks = async () => {
            setLoading(true);
            let data = await fetchBooks();

            // If API is empty, create sample books
            if (!data || data.length === 0) {
                for (const sampleBook of sampleBooks) {
                    await createBook(sampleBook);
                }
                // Reload after creating
                data = await fetchBooks();
            }

            // Ensure every book has a coverImage; assign a picsum seed image when missing
            const enriched = data.map(b => ({
                ...b,
                coverImage: b.coverImage && b.coverImage.trim()
                    ? b.coverImage
                    : `https://picsum.photos/seed/${b.id || 'seed-' + Date.now()}/300/450`
            }));
            setBooks(enriched);
            setFilteredBooks(enriched);
            setLoading(false);
        };

        loadBooks();
    }, []);

    // Filter books based on search term
    useEffect(() => {
        const filtered = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(filtered);
    }, [searchTerm, books]);

    // Handle adding/editing a book
    const handleSaveBook = async (bookData: Omit<Book, 'id'>) => {
        if (editingBook) {
            // Update existing book
            const updated = await updateBook(editingBook.id!, bookData);
            if (updated) {
                setBooks(books.map(b => (b.id === editingBook.id ? { ...updated, id: editingBook.id } : b)));
                setEditingBook(undefined);
            }
        } else {
            // Create new book
            const newBook = await createBook(bookData);
            if (newBook) {
                const withImage = {
                    ...newBook,
                    coverImage: newBook.coverImage && newBook.coverImage.trim()
                        ? newBook.coverImage
                        : `https://picsum.photos/seed/${newBook.id || 'seed-' + Date.now()}/300/450`
                };
                setBooks([...books, withImage]);
            }
        }
        setIsModalOpen(false);
    };

    // Handle deleting a book
    const handleDeleteBook = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            const success = await deleteBook(id);
            if (success) {
                setBooks(books.filter(b => b.id !== id));
            }
        }
    };

    // Handle toggling favorite status
    const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
        const success = await updateBook(id, { isFavorite });
        if (success) {
            setBooks(books.map(b => (b.id === id ? { ...b, isFavorite } : b)));
        }
    };

    // Handle opening modal for editing
    const handleEditBook = (book: Book) => {
        setEditingBook(book);
        setIsModalOpen(true);
    };

    // Handle closing modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingBook(undefined);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">📚 Book Archive</h1>
                            <p className="text-gray-600 text-sm mt-1">Manage your personal book catalog</p>
                        </div>
                        <button
                            onClick={() => {
                                setEditingBook(undefined);
                                setIsModalOpen(true);
                            }}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-md"
                        >
                            <Plus size={20} />
                            Add Book
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by book title or author..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                    </div>
                </div>

                {/* Books Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading books...</p>
                        </div>
                    </div>
                ) : filteredBooks.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {books.length === 0 ? 'No Books Yet' : 'No Results Found'}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {books.length === 0
                                ? 'Start building your library by adding your first book!'
                                : 'Try adjusting your search terms.'}
                        </p>
                        {books.length === 0 && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                            >
                                <Plus size={20} />
                                Add Your First Book
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredBooks.map(book => (
                            <BookCard
                                key={book.id}
                                book={book}
                                onEdit={handleEditBook}
                                onDelete={handleDeleteBook}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Modal */}
            <BookModal
                isOpen={isModalOpen}
                book={editingBook}
                onClose={handleCloseModal}
                onSave={handleSaveBook}
            />
        </div>
    );
}

export default App;
