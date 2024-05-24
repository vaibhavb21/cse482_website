import React, { useState } from 'react';

const StartPage = ({ treeProp }) => {
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
      const regex = /[<>=]/;
      const containsSymbol = values.some(condition => regex.test(condition))
      if(containsSymbol){
        const index = values.findIndex(value => parseAndEvaluate(value, inputValue));
        if (index !== -1 && index < currentNode.children.length) {
          nextNode = currentNode.children[index];
        }
      }else{
        const index = values.indexOf(inputValue);
        console.log('values[0] is ', values[0]);
        console.log('index is', index);
        if (index !== -1 && index < currentNode.children.length) {
          nextNode = currentNode.children[index];
        }
      }
    }

    setCurrentNode(nextNode);
    setInputValue(''); // Reset the temporary input for the next input
  };

  const handleYesClick = () => {
    setInputValue('yes');
    setUserInput('yes'); // Set the user input for processing
    if (!currentNode || !currentNode.children) {
      return; // End of navigation if no children
    }

    let nextNode = null;
    if (currentNode.values.includes('x') || currentNode.values.length === 1) {
      nextNode = currentNode.children[0];
    } else {
      const values = currentNode.values;
      const index = values.indexOf('yes');
      if (index !== -1 && index < currentNode.children.length) {
        nextNode = currentNode.children[index];
      }
    }

    setCurrentNode(nextNode);
  };

  const handleNoClick = () => {
    setInputValue('no');
    setUserInput('no'); // Set the user input for processing
    if (!currentNode || !currentNode.children) {
      return; // End of navigation if no children
    }

    let nextNode = null;
    if (currentNode.values.includes('x') || currentNode.values.length === 1) {
      nextNode = currentNode.children[0];
    } else {
      const values = currentNode.values;
      const index = values.indexOf('no');
      if (index !== -1 && index < currentNode.children.length) {
        nextNode = currentNode.children[index];
      }
    }

    setCurrentNode(nextNode);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {currentNode.children.length > 0 ? (
          <>
            <h2>{currentNode.question}</h2>
            {currentNode.type === 0 ? (
                <div style={{display: 'flex', gap: '20px'}}>
                  <button onClick={handleYesClick}>Yes</button>
                  <button onClick={handleNoClick}>No</button>
                </div>
            ) : (
                <>
                  <input
                      type="text"
                      value={inputValue}
                      onChange={handleChange}
                      placeholder="Enter your answer"
                  />
                  <button onClick={handleNext}>Next</button>
                </>
            )}
          </>
      ) : (
          <div>
            <h1>Recommended Diagnosis:</h1>
            <h2>{currentNode.question}</h2>
          </div>
      )}
    </div>
  );
};

export default StartPage;
