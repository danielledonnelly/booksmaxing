import React, { useState } from 'react';
import { TrashIcon, PencilIcon, BookOpenIcon, DocumentTextIcon, CalendarIcon, BookmarkIcon } from '@heroicons/react/24/outline';

const Library = ({ entries, setEntries, setEditEntry }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getBookDetails = (bookId) => {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    return books.find((book) => book.bookId === bookId);
  };

  const handleDelete = (entryToDelete) => {
    const updatedEntries = entries.filter((entry) => entry !== entryToDelete);
    setEntries(updatedEntries);
    localStorage.setItem('entries', JSON.stringify(updatedEntries));
  };

  const handleEdit = (entryToEdit) => {
    setEditEntry(entryToEdit);
  };

  const filteredEntries = entries.filter((entry) => {
    const book = getBookDetails(entry.bookId);
    return book && book.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const bookTitles = filteredEntries.map((entry) => {
    const book = getBookDetails(entry.bookId);
    return book ? book.title : 'Unknown Title';
  });

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {/* Search bar */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Entries list */}
      <div className="w-full">
        <div 
          className="max-h-96 overflow-y-auto p-4 rounded-lg"
          style={{ backgroundColor: 'var(--medium-grey)' }}
        >
          {filteredEntries.length > 0 ? (
            <div className="space-y-4">
              {filteredEntries.map((entry, index) => {
                const book = getBookDetails(entry.bookId);
                const progress = book ? (entry.pagesRead / book.totalPages) * 100 : 0;

                return (
                  <div
                    key={index}
                    className="bg-gray-600 rounded-lg p-4 shadow-lg relative"
                  >
                    {/* Action buttons */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(entry)}
                        className="p-2 text-white hover:bg-gray-500 rounded-full transition-colors"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(entry)}
                        className="p-2 text-white hover:bg-red-500 rounded-full transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Book content */}
                    <div className="pr-20">
                      <h3 className="text-xl font-bold text-white mb-3">
                        {book ? book.title : 'Unknown Title'}
                      </h3>

                      {/* Status */}
                      <div className="flex items-center mb-2">
                        <BookmarkIcon className="w-4 h-4 mr-2 text-gray-300" />
                        <span className="text-gray-200 text-sm">
                          Status: {entry.status}
                        </span>
                      </div>

                      {/* Pages read */}
                      <div className="flex items-center mb-2">
                        <BookOpenIcon className="w-4 h-4 mr-2 text-gray-300" />
                        <span className="text-gray-200 text-sm">
                          Pages Read: {entry.pagesRead} / {book ? book.totalPages : 'Unknown'}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="reading-progress-bar mb-3">
                        <div 
                          className="reading-progress-fill" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>

                      {/* Notes */}
                      {entry.notes && (
                        <div className="flex items-center mb-2">
                          <DocumentTextIcon className="w-4 h-4 mr-2 text-gray-300" />
                          <span className="text-gray-200 text-sm">
                            Notes: {entry.notes}
                          </span>
                        </div>
                      )}

                      {/* Date */}
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2 text-gray-300" />
                        <span className="text-gray-200 text-sm">
                          Date: {entry.date}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-300">
                No entries found. Start tracking your reading!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;
