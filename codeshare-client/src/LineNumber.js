

import React from 'react';
import './LineNumber.css'; 

const LineNumber = ({ code }) => {
    const lines = code.split('\n');
    const lineNumbers = Array.from(Array(lines.length).keys()).map(i => i + 1);

    return (
        <div className="line-number">
            {lineNumbers.map((num, index) => (
                <div key={index} className="line-number-item">
                    {num}
                </div>
            ))}
        </div>
    );
};

export default LineNumber;
