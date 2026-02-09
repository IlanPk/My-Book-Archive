import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Book } from '../api/bookApi';

interface BookModalProps {
    isOpen: boolean;
    book?: Book;
    onClose: () => void;
    onSave: (book: Omit<Book, 'id'>) => void;
}

const BookModal: React.FC<BookModalProps> = ({ isOpen, book, onClose, onSave }) => {
    const [formData, setFormData] = useState<Omit<Book, 'id'>>({
        title: '',
        author: '',
        description: '',
        coverImage: '',
        isFavorite: false,
    });

    // Simple random generators for title/author/description
    const sampleTitles = [
        'The Last Lantern',
        'Echoes of Tomorrow',
        'A Walk Through Shadows',
        'The Paper Compass',
        'Fragments of Light'
    ];
    const sampleAuthors = [
        'Maya Cohen',
        'Daniel Levi',
        'Yael Abram',
        'Eden Barak',
        'Noam Shalev'
    ];
    const sampleDescriptions = [
        'A gripping tale of love and loss across changing seasons.',
        'An unexpected journey that questions everything you know.',
        'A poetic exploration of memory, identity, and time.',
        'A fast-paced mystery with twists at every turn.',
        'A heartwarming story about finding home in unlikely places.'
    ];

    const randomizeFields = () => {
        const title = sampleTitles[Math.floor(Math.random() * sampleTitles.length)];
        const author = sampleAuthors[Math.floor(Math.random() * sampleAuthors.length)];
        const description = sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];
        setFormData(prev => ({ ...prev, title, author, description }));
    };

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title,
                author: book.author,
                description: book.description,
                coverImage: book.coverImage,
                isFavorite: book.isFavorite || false,
            });
        } else {
            setFormData({
                title: '',
                author: '',
                description: '',
                coverImage: '',
                isFavorite: false,
            });
        }
    }, [book, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: (e.target as HTMLInputElement).checked,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.title.trim() && formData.author.trim() && formData.coverImage.trim()) {
            onSave(formData);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {book ? 'Edit Book' : 'Add New Book'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Book Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter book title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                            Author *
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            placeholder="Enter author name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter book description"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    {/* Cover Image URL */}
                    <div>
                        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
                            Cover Image URL *
                        </label>
                        <input
                            type="url"
                            id="coverImage"
                            name="coverImage"
                            value={formData.coverImage}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, coverImage: `https://picsum.photos/seed/${Date.now()}/300/450` }))}
                                className="px-3 py-1 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
                            >
                                Use Seed (picsum)
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, coverImage: `https://picsum.photos/seed/sample-${Date.now()}/300/450` }))}
                                className="px-3 py-1 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
                            >
                                Use Sample (picsum seed)
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">You can also paste an image URL from Google Images or Pexels.</p>
                        {formData.coverImage && (
                            <img
                                src={formData.coverImage}
                                alt="Preview"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                className="mt-2 h-32 w-20 object-cover rounded"
                            />
                        )}
                    </div>

                    {/* Favorite Checkbox */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isFavorite"
                            name="isFavorite"
                            checked={formData.isFavorite}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <label htmlFor="isFavorite" className="ml-2 text-sm font-medium text-gray-700">
                            Add to favorites
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={randomizeFields}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Randomize
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
                        >
                            {book ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookModal;
