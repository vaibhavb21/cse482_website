import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Routes, useNavigate} from "react-router-dom";
import './App.css';
import Tutorial from './pages/TutorialPage';
import axios from "axios";
import StartPage from "./pages/StartPage";

const MyComponent = ({ tree }) => {
    return (
        <div>
            <h1>Tree Data: {JSON.stringify(tree)}</h1>
        </div>
    );
};



const App = () => {
    const [file, setFile] = useState(null);
    const [tree, setTree] = useState('');
    const [message, setMessage] = useState('');
    const [page, setPage] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleStartQuestionnaire = (e) => {
        setPage("./pages/StartPage")
    }


    useEffect(() => {
        axios.get('http://localhost:5000/hello')
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setMessage('Failed to load message');
            });
        
        axios.get('http://localhost:5000/get_tree')
        .then(response => {
            console.log("response message:")
            console.log(response);
            setTree(response.data);
 
            //setCurrentNode(response.data); 
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
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Protocol Logo" className="App-logo"/>
                </header>
                <main>
                    <div className="upload-container">
                        <label className="file-input-container">
                            Choose File
                            <input type="file" onChange={handleFileChange} accept=".csv" style={{ display: 'none' }} />
                        </label>
                        {<button onClick={handleStartQuestionnaire}>
                            <Link to="/StartPage">Start Page</Link>
                        </button> }
                        {/* <MyComponent tree={tree} /> */}
                    </div>
                </main>
                    
                
                {/* <AppRoutes /> */}
            </div>
            <Routes>
                        <Route path = '/StartPage' element={<StartPage />} />
                    </Routes>
            {/* <div>
                <h1>{message}</h1>
            </div>
            <div>
                <h1>{JSON.stringify(tree)}</h1>
            </div> */}
        </Router>
    );
};

export default App;
