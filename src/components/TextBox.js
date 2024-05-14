import React, { useRef, useState } from 'react'; // Import useState here

const TextBox = () => {
    const [something, setSomething] = useState('');
    return (
        <div>
            <textarea value={something} onChange={(e) => setSomething(e.target.value)}></textarea>
        </div>
    );
};

export default TextBox;
