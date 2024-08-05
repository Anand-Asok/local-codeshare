import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

function Home() {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setRoomId(event.target.value);
  };

  const handleSubmit = () => {
    navigate(`/${roomId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-6xl font-bold">Welcome To</div>
      <div className="text-xl mb-8">local-codeshare</div>
      <div className="flex flex-col items-center">
        <div className="flex mb-2">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={handleInputChange}
            className="p-2 rounded-l-md text-gray-900"
          />
          <button
            onClick={handleSubmit}
            className="p-2 bg-blue-500 rounded-r-md text-white"
          >
            Go
          </button>
        </div>
        <div className="text-sm mb-8">Pick whatever suits you best</div>
      </div>
    </div>
  );
}

export default Home;
