import { io } from 'socket.io-client';


const URL = process.env.NODE_ENV === 'production' ? undefined : 'ws://127.0.0.1:9000';
let socket;

const initSocket = (auth) => {
    console.log('SOCKET');
    console.log(auth);
    socket = io(URL);
    return socket;
}
const getSocket = () => {
    if(!socket) {
        throw new Error('Socket io not initialized!');
    }
    return socket;
}

export { initSocket, getSocket}