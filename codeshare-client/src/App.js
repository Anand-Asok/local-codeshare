import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CodeEditor from './CodeEditor.js'; 
import Home from './Home.js';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/:roomId" element={<CodeEditor />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
