import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Main from './components/Main.tsx';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router
          basename={process.env.PUBLIC_URL}
        >
          <Routes>
            <Route exact path="/" element={<Main />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
