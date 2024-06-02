import React, { useState } from 'react';

const StartPage = ({ treeProp }) => {
  const [currentNode, setCurrentNode] = useState(treeProp);
  const [inputValue, setInputValue] = useState(''); // Store input value temporarily
  const [userInput, setUserInput] = useState('');
  const [dropdownSelected, setDropdownSelected] = useState(false); // Track if dropdown option is selected
  const [nodeHistory, setNodeHistory] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value); // Update temporary input state
  };
  const handleNext = () => {
    setError('')
    if (inputValue.trim() === '') {
      setError('Please enter input');
      return;
    }
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
        if (isNaN(inputValue)) {
          setError('Please enter numeric input');
          return;
        }
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
    setNodeHistory([...nodeHistory, currentNode]);
    setCurrentNode(nextNode);
    setInputValue(''); // Reset the temporary input for the next input
    setDropdownSelected(false); // Reset dropdown selected state
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

    let number = 0;
    if(condition.startsWith("[") || condition.startsWith("(")){
      console.log(condition);
      let inputValueInt = parseFloat(inputValue);
      if(condition.startsWith("[") && condition.endsWith("]")){
        condition = condition.slice(1, -1).trim();
        let parts = condition.split('-').map(s => s.trim());
        return parts[0] <= inputValueInt && parts[1] >= inputValueInt
      }
      if(condition.startsWith("[")&&condition.endsWith(")")){
        condition = condition.slice(1, -1).trim();
        let parts = condition.split('-').map(s => s.trim());
        return parts[0] <= inputValueInt && parts[1] > inputValueInt
      }
      if(condition.startsWith("(")&&condition.endsWith("]")){
        condition = condition.slice(1, -1).trim();
        let parts = condition.split('-').map(s => s.trim());
        return parts[0] < inputValueInt && parts[1] >= inputValueInt
      }
      if(condition.startsWith("(")&&condition.endsWith(")")){   
        condition = condition.slice(1, -1).trim();
        let parts = condition.split('-').map(s => s.trim());
        return parts[0] < inputValueInt && parts[1] > inputValueInt
      }
      console.log("getPast");
    }
    if (condition.includes("<=")) {
      if (condition.startsWith("<=")) {
        operator = "<=";
        value = condition.replace("<=", "").trim();
      } else {
        operator = "<=";
        value = condition.replace("<=", "").trim();
        number = 1;
      }
    } else if (condition.includes("=<")) {
      if (condition.startsWith("=<")) {
        operator = "<=";
        value = condition.replace("=<", "").trim();
      } else {
        operator = "<=";
        value = condition.replace("=<", "").trim();
        number = 1;
      }
    } else if (condition.includes(">=")) {
      if (condition.startsWith(">=")) {
        operator = ">=";
        value = condition.replace(">=", "").trim();
      } else {
        operator = ">=";
        value = condition.replace(">=", "").trim();
        number = 1;
      }
    } else if (condition.includes("=>")) {
      if (condition.startsWith("=>")) {
        operator = ">=";
        value = condition.replace("=>", "").trim();
      } else {
        operator = ">=";
        value = condition.replace("=>", "").trim();
        number = 1;
      }
    } else if (condition.includes("<")) {
      if (condition.startsWith("<")) {
        operator = "<";
        value = condition.replace("<", "").trim();
      } else {
        operator = "<";
        value = condition.replace("<", "").trim();
        number = 1;
      }
    } else if (condition.includes(">")) {
      if (condition.startsWith(">")) {
        operator = ">";
        value = condition.replace(">", "").trim();
      } else {
        operator = ">";
        value = condition.replace(">", "").trim();
        number = 1;
      }
    } else if (condition.includes("=")) {
      operator = "==";
      value = condition.replace("=", "").trim();
    } else if (condition.includes("!=")) {
      operator = "!=";
      value = condition.replace("!=", "").trim();
    } else {
      throw new Error("Unsupported condition format");
    }
    console.log("surya is the greatest");
    value = parseFloat(value, 10);
    let inputValueInt = parseFloat(inputValue);
    console.log("Here 3");

    // Check the condition
    switch (operator) {
      case "<=":
        if(number == 0){
          return inputValueInt <= value;
        }else{
          return value <= inputValueInt;
        }
      case ">=":
        if(number == 0){
          return inputValueInt >= value;
        }else{
          return value >= inputValueInt;
        }
      case "<":
        if(number == 0) {
          return inputValueInt < value;
        } else {
          return value < inputValueInt;
        }
      case ">":
        if(number == 0) {
          return inputValueInt > value;
        } else {
          return value > inputValueInt;
        }
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
    setNodeHistory([...nodeHistory, currentNode]);
    setInputValue(''); // Reset the temporary input for the next input
    setCurrentNode(nextNode);

  };
  
  const handleBack = () => {
    if (nodeHistory.length > 0) {
      const previousNode = nodeHistory[nodeHistory.length - 1];
      setNodeHistory(nodeHistory.slice(0, -1)); // Pop the last node from history stack
      setCurrentNode(previousNode);
    }

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
    setNodeHistory([...nodeHistory, currentNode]);
    setInputValue(''); // Reset the temporary input for the next input
    setCurrentNode(nextNode);
  };

  const handleDropdownChange = (e) => {
    setNodeHistory([...nodeHistory, currentNode]);
    setInputValue(e.target.value);
    setUserInput(e.target.value);
    setDropdownSelected(true); // Mark that an option has been selected
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#07bac7',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#046d74',
  };


  const backButtonStyle = {
  padding: '10px 20px',
  margin: '10px',
  backgroundColor: 'transparent',
  color: '#07bac7',
  border: '2px solid #07bac7',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s, color 0.3s',
};

const backButtonHoverStyle = {
  backgroundColor: '#07bac7',
  color: '#fff',
};

  const inputStyle = {
    margin: '10px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%', // Ensure the input and dropdown take the full width of their container
  };

  const dropdownStyle = {
    ...inputStyle,
    width: 'calc(100% + 20px)', // Make the dropdown a bit wider
    appearance: 'none', // Hide default dropdown arrow
    WebkitAppearance: 'none', // Hide default dropdown arrow in Safari
    MozAppearance: 'none', // Hide default dropdown arrow in Firefox
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
  };

  const hoverStyle = {
    backgroundColor: '#f0f0f0',
  };

  return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative'}}>
        {currentNode.children.length > 0 ? (
            <>
              <h2>{currentNode.question}</h2>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {currentNode.type === 0 ? (
                  <div style={{display: 'flex', gap: '20px'}}>
                    <button
                        style={buttonStyle}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                        onClick={handleYesClick}
                    >
                      Yes
                    </button>
                    <button
                        style={buttonStyle}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                        onClick={handleNoClick}
                    >
                      No
                    </button>
                  </div>
              ) : currentNode.type === 1 ? (
                  <>
                    <select
                        style={dropdownStyle}
                        onChange={handleDropdownChange}
                        value={inputValue}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = inputStyle.backgroundColor}
                    >
                      <option value="" disabled>Select an option</option>
                      {currentNode.values.map((value, index) => (
                          <option key={index} value={value} style={{color: '#000'}}>
                            {value}
                          </option>
                      ))}
                    </select>
                    {dropdownSelected && (
                        <button
                            style={buttonStyle}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                            onClick={handleNext}
                        >
                          Next
                        </button>
                    )}
                  </>
              ) : (
                  <>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Enter your answer"
                        style={inputStyle}
                    />
                    <button
                        style={buttonStyle}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                        onClick={handleNext}
                    >
                      Next
                    </button>
                  </>
              )}
            </>
        ) : (
            <div>
              <h1>Recommended Diagnosis:</h1>
              <h2>{currentNode.question}</h2>
            </div>
        )}
        <button
            onClick={handleBack}
            style={backButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = backButtonHoverStyle.backgroundColor;
              e.currentTarget.style.color = backButtonHoverStyle.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = backButtonStyle.backgroundColor;
              e.currentTarget.style.color = backButtonStyle.color;
            }}
        >
          Back
        </button>
      </div>
  );
};

export default StartPage;
