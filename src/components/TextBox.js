import React, { useState } from 'react'; // Import useState here

const TextBox = () => {
    const [textBoxContent, setTextBoxContent] = useState('');
    const [savedContent, setSavedContent] = useState('');

    const handleNextClick = () => {
        setSavedContent(textBoxContent);
    };

    return (
        <div>
            <textarea value={textBoxContent} onChange={(e) => setTextBoxContent(e.target.value)}></textarea>
            <button onClick={handleNextClick}>Next</button>
        </div>
    );
};

export default TextBox;
