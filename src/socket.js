
import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true, 
        reconnectionAttempts: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    // console.log('Connecting to backend URL:', import.meta.env.VITE_BACKEND_URL);
    return io(import.meta.env.VITE_BACKEND_URL, options);
};
