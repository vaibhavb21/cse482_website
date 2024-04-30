import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Tutorial from './pages/TutorialPage';
import axios from "axios";

const App = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = () => {
        if (file) {
            // Placeholder for upload logic
            console.log('File ready for upload:', file);
            // Handle the file upload here
        } else {
            console.log('No file selected.');
        }
    };

    return (
    <Router>
        <div className="App">
            <header className="App-header">
                <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Protocol Logo" className="App-logo"/>
            </header>
            <main>
                <div className="upload-container">
                    {/* Updated JSX for the file input and custom buttons */}
                    <label className="file-input-container">
                        Choose File
                        <input type="file" onChange={handleFileChange} accept=".csv" style={{display: 'none'}}/>
                    </label>
                    <br/>
                    <br/>
                    <button onClick={() => document.querySelector('.file-input-container > input').click()}>
                        Start Questionnaire
                    </button>
                </div>
            </main>
            <footer>
                <Link to="/tutorial">Tutorial</Link>
            </footer>
            <Routes>
                {/*<Route path="/" element={<YourMainComponent/>}/>*/}
                <Route exact path="/tutorial" element={<Tutorial/>}/>
            </Routes>
        </div>
    </Router>
    );
};

export default App;