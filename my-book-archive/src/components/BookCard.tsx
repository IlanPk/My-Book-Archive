import { Heart, Edit2, Trash2 } from 'lucide-react';
import { Book } from '../api/bookApi';

const PLACEHOLDER = 'https://picsum.photos/seed/no-image/300/450';
const FALLBACK_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450"><rect width="100%" height="100%" fill="%23e5e7eb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="Arial" font-size="22">No Image</text></svg>';

interface BookCardProps {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: (id: string) => void;
    onToggleFavorite: (id: string, isFavorite: boolean) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete, onToggleFavorite }) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        // Try a reliable image service first, fall back to an inline SVG if DNS fails
        (e.target as HTMLImageElement).src = PLACEHOLDER;
        // If that also errors, set an inline SVG data-URI
        (e.target as HTMLImageElement).onerror = null;
        setTimeout(() => {
            if (!((e.target as HTMLImageElement).complete && (e.target as HTMLImageElement).naturalWidth !== 0)) {
                (e.target as HTMLImageElement).src = FALLBACK_SVG;
            }
        }, 50);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-700 h-64">
                <img
                    src={book.coverImage || PLACEHOLDER}
                    alt={book.title}
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                />
                {/* Favorite Button */}
                <button
                    onClick={() => onToggleFavorite(book.id!, !book.isFavorite)}
                    className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                    <Heart
                        size={20}
                        className={book.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-400'}
                    />
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">{book.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">by {book.author}</p>
                <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-2 mb-4">{book.description}</p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(book)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        <Edit2 size={16} />
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(book.id!)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 dark:bg-red-600 text-white rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
