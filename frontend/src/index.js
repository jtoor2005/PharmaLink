import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';

const Root = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.className = darkMode ? 'light-mode' : 'dark-mode';
    };

    return (
        <div>
            <App />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button onClick={toggleDarkMode} style={{ marginTop: '20px' }}>
                    Toggle Dark Mode
                </button>
            </div>
        </div>
    );
};

ReactDOM.render(<Root />, document.getElementById('root'));
