import React from 'react';

const StartPage = ({treeProp}) => {
    
    return (
        <div>
        {treeProp !== null ? (
          <>
            <h1>{treeProp.question}</h1>
            <button>yes</button>
            <button>no</button>
          </>
        ) : (
          <h2>No data available</h2>
        )}
      </div>
    );
};

export default StartPage;