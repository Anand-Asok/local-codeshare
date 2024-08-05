import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import LineNumber from './LineNumber';

const SERVER_URL = 'http://localhost:4000';
const socket = io(SERVER_URL);

const CodeEditor = () => {
    const { roomId } = useParams();
    const [code, setCode] = useState('');
    const [connectionStatus, setConnectionStatus] = useState('connecting');
    const [darkMode, setDarkMode] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('connect', () => {
            setConnectionStatus('connected');
        });

        socket.on('disconnect', () => {
            setConnectionStatus('disconnected');
        });

        socket.on('connect_error', (error) => {
            setConnectionStatus('failed');
            console.error('Socket connection error:', error);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
        };
    }, []);

    useEffect(() => {
        if (roomId) {
            socket.emit('joinRoom', roomId);

            socket.on('loadCode', (code) => {
                setCode(code);
            });

            socket.on('codeUpdate', (code) => {
                setCode(code);
            });

            return () => {
                socket.off('loadCode');
                socket.off('codeUpdate');
            };
        }
    }, [roomId]);

    const handleCodeChange = (event) => {
        const newCode = event.target.value;
        setCode(newCode);
        socket.emit('codeChange', { room: roomId, code: newCode });
    };

    const handleRoomChange = (event) => {
        const newRoom = event.target.value;
        navigate(`/${newRoom}`);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };


    return (
        <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen flex flex-col items-center p-4 overflow-auto relative`}>
            <div className="mb-4 w-full flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Enter ID"
                    value={roomId || ''}
                    onChange={handleRoomChange}
                    className={`${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'} flex-1 border rounded px-2 py-1`}
                />
                <div className={`px-2 py-1 rounded border`}>
                    {connectionStatus}
                </div>
                <button
                    onClick={toggleDarkMode}
                    className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} px-2 py-1 rounded border`}
                >
                    {darkMode ? 'Light' : 'Dark'}
                </button>
            </div>
            <div className="w-full flex flex-grow overflow-auto border rounded">
                <LineNumber code={code} darkMode={darkMode} />
                <textarea
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="Start coding..."
                    className={`${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'} flex-1 p-2 font-mono text-sm leading-5 resize-none overflow-auto`}
                />
            </div>
        </div>
    );
};

export default CodeEditor;
