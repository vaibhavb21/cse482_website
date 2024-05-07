// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import './App.css';
// import Tutorial from './pages/TutorialPage';
// import axios from "axios";

// const MyComponent = () => {
//     const [tree, setTree] = useState(null);

//     useEffect(() => {
//         const fetchTree = async () => {
//             try {
//                 const response = await axios.get('/get_tree');
//                 setTree(response.data);
//             } catch (error) {
//                 console.error('Error fetching tree:', error);
//             }
//         };

//         fetchTree();
//     }, []);

//     return (
//         <div>
//             {/* Render your tree data or handle it however necessary */}
//             <h1>Tree Data: {JSON.stringify(tree)}</h1>
//         </div>
//     );
// };

// const App = () => {
//     const [file, setFile] = useState(null);

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleFileUpload = () => {
//         if (file) {
//             // Placeholder for upload logic
//             console.log('File ready for upload:', file);
//             // Handle the file upload here
//         } else {
//             console.log('No file selected.');
//         }
//     };
    
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         axios.get('http://localhost:5000/hello')
//             .then(response => {
//                 setMessage(response.data.message);
//             })
//             .catch(error => {
//                 // Handle the error here. For example, log the error or set an error message state.
//                 console.error('Error fetching data:', error);
//                 setMessage('Failed to load message');
//             });
//     }, []);

//     return (
//     <Router>
//         <div className="App">
//             <header className="App-header">
//                 <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Protocol Logo" className="App-logo"/>
//             </header>
//             <main>
//                 <div className="upload-container">
//                     {/* Updated JSX for the file input and custom buttons */}
//                     <label className="file-input-container">
//                         Choose File
//                         <input type="file" onChange={handleFileChange} accept=".csv" style={{display: 'none'}}/>
//                     </label>
//                     <br/>
//                     <br/>
//                     <button onClick={() => document.querySelector('.file-input-container > input').click()}>
//                         Start Questionnaire
//                     </button>
//                     <MyComponent tree={tree} />
//                 </div>
//             </main>
//             <footer>
//                 <Link to="/tutorial">Tutorial</Link>
//             </footer>
//             <Routes>
//                 {/*<Route path="/" element={<YourMainComponent/>}/>*/}
//                 <Route exact path="/tutorial" element={<Tutorial/>}/>
//             </Routes>
//         </div>
//         <div>
//             <h1>{message}</h1>
//         </div>
//     </Router>
//     );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Tutorial from './pages/TutorialPage';
import axios from "axios";

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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

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
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setTree('Failed to load message');
        });

        // const fetchTree = async () => {
        //     try {
        //         const response = await axios.get('/get_tree');
        //         setTree(response.data);
        //     } catch (error) {
        //         console.error('Error fetching tree:', error);
        //     }
        // };

        // fetchTree();
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
                        <button onClick={() => document.querySelector('.file-input-container > input').click()}>
                            Start Questionnaire
                        </button>
                        <MyComponent tree={tree} />
                    </div>
                </main>
                <footer>
                    <Link to="/tutorial">Tutorial</Link>
                </footer>
                <Routes>
                    <Route path="/tutorial" element={<Tutorial />} />
                </Routes>
            </div>
            <div>
                <h1>{message}</h1>
            </div>
            <div>
                <h1>{JSON.stringify(tree)}</h1>
            </div>
        </Router>
    );
};

export default App;
