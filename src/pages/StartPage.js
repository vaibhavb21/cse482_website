// import React from 'react';
// import TextBox from '../components/TextBox';
// import BinaryOption from '../components/BinaryOption'

// const StartPage = ({treeProp}) => {
    
//     return (
//       <div>
//         {treeProp !== null ? (
//           <>
//             <h1>{treeProp.question}</h1>
//             <TextBox />
//           </>
//         ) : (
//           <h2>No data available</h2>
//         )}
//       </div>
//     );
// };

// export default StartPage;

import React, { useState } from 'react';

const jsonData = {/* Paste your JSON data here */};

const StartPage = ({treeProp}) => {
  const [currentNode, setCurrentNode] = useState(treeProp);
  const [inputValue, setInputValue] = useState(''); // Store input value temporarily
  const [userInput, setUserInput] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value); // Update temporary input state
  };

  const handleNext = () => {
    setUserInput(inputValue); // Set the user input for processing
    if (!currentNode || !currentNode.children) {
      return; // End of navigation if no children
    }

    let nextNode = null;
    if (currentNode.values.includes('x') || currentNode.values.length === 1) {
      nextNode = currentNode.children[0];
    } else {
      const values = currentNode.values;
      const index = values.indexOf(inputValue);
      console.log('values[0] is ', values[0]);
      console.log('index is', index);
      if (index !== -1 && index < currentNode.children.length) {
        nextNode = currentNode.children[index];
      }
    }

    setCurrentNode(nextNode);
    setInputValue(''); // Reset the temporary input for the next input
  };

  return (
    <div>
      {currentNode ? (
        <>
          <h2>{currentNode.question}</h2>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter your answer"
          />
          <button onClick={handleNext}>Next</button>
          {/* {currentNode.values.map((value, index) => (
            <button key={index} onClick={() => setInputValue(value)}>
              {value}
            </button>
          ))} */}
        </>
      ) : (
        <p>No more questions. End of the tree.</p>
      )}
    </div>
  );
};

export default StartPage;
