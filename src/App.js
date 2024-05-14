import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import './App.css';
import axios from "axios";
import StartPage from "./pages/StartPage";
import Tutorial from './pages/TutorialPage';

const App = () => {
    const [file, setFile] = useState(null);
    const [tree, setTree] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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
            // console.log("response message:")
            // console.log(response);
            setTree(response.data);
            // console.log(tree);
            // console.log(JSON.stringify(tree));
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setTree('Failed to load message');
        });
    }, []);

    // if(tree != null) {
    //     console.log(JSON.stringify(tree.children[0].question));
    // }

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Protocol Logo" className="App-logo"/>
                </header>
                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div className="upload-container">
                                    <label className="file-input-container">
                                        Choose File
                                        <input type="file" onChange={handleFileChange} accept=".csv" style={{ display: 'none' }} />
                                    </label>
                                    <div></div>
                                    <button>
                                        <Link to="/StartPage">Start Page</Link>
                                    </button>
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
