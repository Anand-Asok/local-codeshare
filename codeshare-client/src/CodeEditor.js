
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './App.css';
import LineNumber from './LineNumber'; 

const SERVER_URL = 'http://192.168.1.6:4000'; 
const socket = io(SERVER_URL);

const CodeEditor = () => {
    const { roomId } = useParams();
    const [code, setCode] = useState('');
    const [connectionStatus, setConnectionStatus] = useState('connecting');
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

    return (
        <div className="App">
            <div className="status-container">
                <input
                    type="text"
                    placeholder="Enter ID"
                    value={roomId || ''}
                    onChange={handleRoomChange}
                    className="room-input"
                />
                <div className="status">{connectionStatus}</div>
            </div>
            <div className="code-editor">
                <LineNumber code={code} /> 
                <textarea
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="Start coding..."
                    className="code-textarea"
                />
            </div>
        </div>
    );
};

export default CodeEditor;
