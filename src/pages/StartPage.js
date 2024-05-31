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
      if (currentNode.type == 3) {
        // numerical comparator logic
        // ex: inputValue<30, 30 <= inputValue <= 80, inputValue>80
        // inputValue = 60
        // values: '<30', '30-80', '>80'
        // stretch: add in >= and <=, 
        // edge: if they give # that's outside of range, possible error handling
        let index = 0;
        for(index = 0; index < values.length; index++){
          const value = values[index];
          if(parseAndEvaluate(value, inputValue)){
             break;
          }
        }
        if (index !== -1 && index < currentNode.children.length) {
          nextNode = currentNode.children[index];
        }
      } else {
        // regular index logic
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

  const parseAndEvaluate = (condition, inputValue) => {
    // values: '<=30', '30-=-80', '>80, 30<='
    // reserve: <=, <, =, >, >=
    // <=, >=, 
    // string operator
    // string digit
    // handle every single case
    // <= 30, 30 >=, 30 =-= 80,
    // handle this case: <30, >=30    
    let operator;
    let value;

    console.log("here1");
    // Normalize the condition string
    if (condition.includes("<=")) {
      [value, operator] = condition.split("<=").map(s => s.trim()).reverse();
      operator = "<=";
    } else if (condition.includes("=<")) {
      [operator, value] = condition.split("=<").map(s => s.trim());
      operator = "<=";
    } else if (condition.includes(">=")) {
      [value, operator] = condition.split(">=").map(s => s.trim()).reverse();
      operator = ">=";
    } else if (condition.includes("=>")) {
      [operator, value] = condition.split("=>").map(s => s.trim());
      operator = ">=";
    } else if (condition.includes("<")) {
      [value, operator] = condition.split("<").map(s => s.trim()).reverse();
      operator = "<";
    } else if (condition.includes(">")) {
      [value, operator] = condition.split(">").map(s => s.trim()).reverse();
      operator = ">";
    } else if (condition.includes("=")) {
      [value, operator] = condition.split("=").map(s => s.trim()).reverse();
      operator = "==";
    } else if (condition.includes("!=")) {
      [value, operator] = condition.split("!=").map(s => s.trim()).reverse();
      operator = "!=";
    } else {
      throw new Error("Unsupported condition format");
    }
    console.log("surya is the greatest");
    value = parseInt(value, 10);
    let inputValueInt = parseInt(inputValue);
    console.log("Here 3");

    // Check the condition
    switch (operator) {
      case "<=":
        return inputValueInt <= value;
      case ">=":
        return inputValueInt >= value;
      case "<":
        return inputValueInt < value;
      case ">":
        return inputValueInt > value;
      case "==":
        return inputValueInt == value;
      case "!=":
        return inputValueInt != value;
      default:
        throw new Error("Unsupported operator");
    }
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
    setInputValue(''); // Reset the temporary input for the next input
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
    setInputValue(''); // Reset the temporary input for the next input
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
