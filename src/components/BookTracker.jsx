import React, { useState, useEffect } from 'react';

const BookTracker = ({ setEntries, entryCounts, setEntryCounts, books = [], setBooks, editEntry, setEditEntry }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [pagesRead, setPagesRead] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [showTitleDropdown, setShowTitleDropdown] = useState(false);

  useEffect(() => {
    if (editEntry) {
      const book = books.find((book) => book.bookId === editEntry.bookId);
      if (book) {
        setTitle(book.title);
        setTotalPages(book.totalPages);
      }
      setStatus(editEntry.status);
      setNotes(editEntry.notes);
      setPagesRead(editEntry.pagesRead);
    }
  }, [editEntry, books]);

  const generateBookId = () => '_' + Math.random().toString(36).substr(2, 9);

  const findOrCreateBook = () => {
    const existingBook = books.find((book) => book.title === title);
    if (existingBook) return existingBook.bookId;

    const newBookId = generateBookId();
    const newBook = { bookId: newBookId, title, totalPages };
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));

    return newBookId;
  };

  const handleSave = () => {
    if (title.trim() === '' || totalPages.trim() === '') return;

    const dateKey = new Date().toDateString();
    const bookId = findOrCreateBook();

    const newEntry = {
      bookId,
      status,
      notes,
      pagesRead,
      date: dateKey,
    };

    const updatedEntries = [...(JSON.parse(localStorage.getItem('entries')) || []), newEntry];
    setEntries(updatedEntries);
    localStorage.setItem('entries', JSON.stringify(updatedEntries));

    setEntryCounts((prevCounts) => {
      const updatedCounts = {
        ...prevCounts,
        [dateKey]: (prevCounts[dateKey] || 0) + 1,
      };
      localStorage.setItem('entryCounts', JSON.stringify(updatedCounts));
      return updatedCounts;
    });

    setTitle('');
    setStatus('');
    setNotes('');
    setPagesRead('');
    setTotalPages('');
    setEditEntry(null);
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(title.toLowerCase())
  );

  return (
    <form className="space-y-4">
      {/* Book Title with Autocomplete */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Book Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setShowTitleDropdown(e.target.value.length > 0);
          }}
          onFocus={() => setShowTitleDropdown(title.length > 0)}
          onBlur={() => setTimeout(() => setShowTitleDropdown(false), 200)}
          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter book title..."
        />
        
        {/* Autocomplete dropdown */}
        {showTitleDropdown && filteredBooks.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-40 overflow-y-auto">
            {filteredBooks.slice(0, 5).map((book, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-600 cursor-pointer text-white"
                onClick={() => {
                  setTitle(book.title);
                  setTotalPages(book.totalPages);
                  setShowTitleDropdown(false);
                }}
              >
                {book.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Status
        </label>
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select status...</option>
          <option value="Currently Reading">Currently Reading</option>
          <option value="Want to Read">Want to Read</option>
          <option value="Dropped">Dropped</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Pages Read and Total Pages */}
      <div className="grid grid-cols-5 gap-2 items-end">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Pages Read
          </label>
          <input
            type="number"
            value={pagesRead}
            onChange={(e) => setPagesRead(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
        </div>

        <div className="col-span-1 flex justify-center items-center pb-3">
          <span className="text-white text-xl font-bold">/</span>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Total Pages
          </label>
          <input
            type="number"
            value={totalPages}
            onChange={(e) => setTotalPages(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
        </div>
      </div>

      {/* Notes Field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Add your notes here..."
        />
      </div>

      {/* Save/Update Button */}
      <div>
        <button 
          type="button"
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {editEntry ? 'Update Entry' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default BookTracker;
