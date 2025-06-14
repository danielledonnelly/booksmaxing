import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StreaksCalendar from './components/StreaksCalendar';
import BookTracker from './components/BookTracker';
import PromptGenerator from './components/PromptGenerator';
import Library from './components/Library';
import './index.css'; 

const Home = () => {
  const [entryCounts, setEntryCounts] = useState({}); // State for entry counts
  const [entries, setEntries] = useState([]); // State for book entries
  const [books, setBooks] = useState([]); // State for books
  const [editEntry, setEditEntry] = useState(null); // State to track the entry being edited

  // useEffect to load data from localStorage on mount
  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    const storedEntryCounts = JSON.parse(localStorage.getItem('entryCounts')) || {};
    const storedBooks = JSON.parse(localStorage.getItem('books')) || []; // Load books from localStorage

    setEntries(storedEntries);
    setEntryCounts(storedEntryCounts);
    setBooks(storedBooks); // Set books from localStorage
  }, []);  // Empty dependency array means this runs once when the component mounts

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Calendar Card */}
          <div className="card">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white text-center mb-4">Calendar</h2>
              <StreaksCalendar entryCounts={entryCounts} setEntryCounts={setEntryCounts} />
            </div>
          </div>

          {/* Reading Tracker Card */}
          <div className="card">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white text-center mb-4">Reading Tracker</h2>
              <BookTracker 
                entries={entries} 
                setEntries={setEntries} 
                entryCounts={entryCounts} // Pass entryCounts
                setEntryCounts={setEntryCounts} // Pass setEntryCounts
                books={books} // Pass books
                setBooks={setBooks} // Pass setBooks
                editEntry={editEntry} // Pass editEntry for editing
                setEditEntry={setEditEntry} // Pass setEditEntry to reset edit mode
              />
            </div>
          </div>

          {/* Library Card */}
          <div className="card">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white text-center mb-4">Library</h2>
              <Library 
                entries={entries} 
                setEntries={setEntries} // Pass setEntries to allow deletion
                books={books} // Pass books for title lookup
                setEditEntry={setEditEntry} // Pass setEditEntry to allow editing
              />
            </div>
          </div>

          {/* Prompt Generator Card */}
          <div className="card">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white text-center mb-4">Reading Prompt Generator</h2>
              <PromptGenerator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
