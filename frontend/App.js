import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [greetings, setGreetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  // Fetch greetings from backend
  useEffect(() => {
    fetchGreetings();
  }, []);

  const fetchGreetings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/greetings');
      if (!response.ok) {
        throw new Error('Failed to fetch greetings');
      }
      const data = await response.json();
      setGreetings(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching greetings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGreeting = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch('/api/greetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to add greeting');
      }

      setNewMessage('');
      await fetchGreetings();
    } catch (err) {
      setError(err.message);
      console.error('Error adding greeting:', err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌍 Full Stack Hello World</h1>
        <p>Data flowing from MySQL → Node.js → React</p>
      </header>

      <main className="container">
        {error && (
          <div className="error-box">
            <strong>Error:</strong> {error}
            <br />
            <small>Make sure the backend server is running on port 5000</small>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading greeting...</div>
        ) : (
          <>
            <section className="greetings-section">
              <h2>Messages from Database</h2>
              <div className="greetings-list">
                {greetings.length > 0 ? (
                  greetings.map((greeting) => (
                    <div key={greeting.id} className="greeting-card">
                      <p className="message">{greeting.message}</p>
                      <small className="timestamp">
                        {new Date(greeting.created_at).toLocaleString()}
                      </small>
                    </div>
                  ))
                ) : (
                  <p className="no-data">No greetings in database</p>
                )}
              </div>
            </section>

            <section className="add-greeting-section">
              <h2>Add New Message</h2>
              <form onSubmit={handleAddGreeting} className="form">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Enter a greeting message..."
                  className="input"
                />
                <button type="submit" className="button">
                  Send to Database
                </button>
              </form>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
