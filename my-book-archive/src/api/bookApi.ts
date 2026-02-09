import axios from 'axios';

// Update this with your MockAPI endpoint (include the resource, e.g. '/books')
const API_URL = 'https://69867ea98bacd1d773eb19cd.mockapi.io/api/books'; // Replace with your actual API URL

export interface Book {
    id?: string;
    title: string;
    author: string;
    description: string;
    coverImage: string;
    isFavorite?: boolean;
}

// Get all books
export const fetchBooks = async (): Promise<Book[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
};

// Create a new book
export const createBook = async (book: Omit<Book, 'id'>): Promise<Book | null> => {
    try {
        const response = await axios.post(API_URL, book);
        return response.data;
    } catch (error) {
        console.error('Error creating book:', error);
        return null;
    }
};

// Update a book
export const updateBook = async (id: string, book: Partial<Book>): Promise<Book | null> => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, book);
        return response.data;
    } catch (error) {
        console.error('Error updating book:', error);
        return null;
    }
};

// Delete a book
export const deleteBook = async (id: string): Promise<boolean> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting book:', error);
        return false;
    }
};
