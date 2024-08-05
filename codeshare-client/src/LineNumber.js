import React from 'react';

const LineNumber = ({ code, darkMode }) => {
    const lines = code.split('\n');
    const lineNumbers = Array.from(Array(lines.length).keys()).map(i => i + 1);

    return (
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} p-2 font-mono text-xl text-right overflow-auto`}>
            {lineNumbers.map((num, index) => (
                <div key={index} className="leading-5">
                    {num}
                </div>
            ))}
        </div>
    );
};

export default LineNumber;
