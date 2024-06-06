import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import './App.css';
import axios from "axios";
import StartPage from "./pages/StartPage";
import { FaUpload, FaPlay } from 'react-icons/fa';

const App = () => {
    const [file, setFile] = useState(null);
    const [tree, setTree] = useState(null);
    const [fileInfo, setFileInfo] = useState({ name: '', size: 0 });
    const [darkMode, setDarkMode] = useState(false);

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileInfo({
            name: selectedFile.name,
            size: selectedFile.size
        });
        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post('http://localhost:5001/upload_file', formData)
        .then(response => {
            setTree(response.data);
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Router>
            <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
                <header className="App-header">
                    <Link to="/" className="logo-container">
                        <img
                            src={darkMode ? `${process.env.PUBLIC_URL}/darkModeLogo.png` : `${process.env.PUBLIC_URL}/lightModeLogo.png`}
                            alt="Protocol Logo"
                            className="App-logo"
                        />
                    </Link>
                    <div className="dark-mode-toggle">
                        <label className="switch">
                            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </header>
                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div className="upload-container">
                                    <h1>Welcome to Protocol</h1>
                                    <label className="file-input-container">
                                        <FaUpload className="upload-icon" /> {/* Add this line to include the icon */}
                                        Upload a CSV File
                                        <input type="file" onChange={handleFileUpload} accept=".csv" style={{ display: 'none' }} />
                                    </label>
                                    <div></div>
                                    {file && (
                                        <>
                                            <div className="file-info">
                                                <p><strong>File Name:</strong> {fileInfo.name}</p>
                                                <p><strong>File Size:</strong> {fileInfo.size} bytes</p>
                                            </div>
                                            <button style={{
                                                fontFamily: 'Figtree, sans-serif',
                                            }}>
                                                <FaPlay style={{marginRight: '8px', verticalAlign: 'middle'}} />
                                                <Link to="/StartPage" className="no-underline-link" style={{ verticalAlign: 'middle' }}>Begin Questionnaire</Link>
                                            </button>
                                        </>
                                    )}
                                </div>
                            }
                        />
                        <Route path="/StartPage" element={<StartPage treeProp={tree}/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
