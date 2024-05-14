import React from 'react';
import TextBox from '../components/TextBox';

const StartPage = ({treeProp}) => {
    
    return (
      <div>
        {treeProp !== null ? (
          <>
            <h1>{treeProp.question}</h1>
            <TextBox />
          </>
        ) : (
          <h2>No data available</h2>
        )}
      </div>
    );
};

export default StartPage;