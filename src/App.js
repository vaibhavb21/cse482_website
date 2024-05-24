import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import './App.css';
import axios from "axios";
import StartPage from "./pages/StartPage";
import Tutorial from './pages/TutorialPage';
import { FaUpload } from 'react-icons/fa';

const App = () => {
    const [file, setFile] = useState(null);
    const [tree, setTree] = useState(null);
    const [message, setMessage] = useState('');
    const [fileInfo, setFileInfo] = useState({ name: '', size: 0 });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileInfo({
            name: selectedFile.name,
            size: selectedFile.size
        });
    };

    useEffect(() => {
        axios.get('http://localhost:5001/hello')
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setMessage('Failed to load message');
            });

        axios.get('http://localhost:5001/get_tree')
        .then(response => {
            setTree(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setTree('Failed to load message');
        });
    }, []);

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Link to="/">
                        <img src={`${process.env.PUBLIC_URL}/newlogo.png`} alt="Protocol Logo" className="App-logo"/>
                    </Link>
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
                                        <input type="file" onChange={handleFileChange} accept=".csv" style={{ display: 'none' }} />
                                    </label>
                                    <div></div>
                                    {file && (
                                        <>
                                            <div className="file-info">
                                                <p><strong>File Name:</strong> {fileInfo.name}</p>
                                                <p><strong>File Size:</strong> {fileInfo.size} bytes</p>
                                            </div>
                                            <button>
                                                <Link to="/StartPage">Start Page</Link>
                                            </button>
                                        </>
                                    )}
                                </div>
                            }
                        />
                        <Route path="/StartPage" element={<StartPage treeProp={tree} />} />
                        <Route path="/tutorial" element={<Tutorial />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
