// import React, { useState } from 'react';

// const jsonData = {};

// const TreeNavigator = () => {
//   const [currentNode, setCurrentNode] = useState(jsonData);
//   const [userInput, setUserInput] = useState('');

//   const handleUserInput = (input) => {
//     setUserInput(input);

//     if (!currentNode || !currentNode.children) {
//       return; 
//     }

//     let nextNode = null;
//     if (currentNode.values.includes('x') || currentNode.values.length === 1) {
//       nextNode = currentNode.children[0];
//     } else {
//       const values = currentNode.values[0].split(',');
//       const index = values.indexOf(input);
//       if (index !== -1 && index < currentNode.children.length) {
//         nextNode = currentNode.children[index];
//       }
//     }

//     setCurrentNode(nextNode);
//   };

//   return (
//     <div>
//       {currentNode ? (
//         <>
//           <h2>{currentNode.question}</h2>
//           <input
//             type="text"
//             value={userInput}
//             onChange={(e) => handleUserInput(e.target.value)}
//             placeholder="Enter your choice"
//           />
//           {currentNode.values.map((value, index) => (
//             <button key={index} onClick={() => handleUserInput(value)}>
//               {value}
//             </button>
//           ))}
//         </>
//       ) : (
//         <p>No more questions. End of the tree.</p>
//       )}
//     </div>
//   );
// };

// export default TreeNavigator;