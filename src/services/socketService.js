import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'ws://127.0.0.1:9000';
let socket;

const initSocket = (auth) => {
    console.log('SOCKET');
    console.log(auth);
    socket = io(URL,{
        query: {
            token: Cookies.get('token')
        }
    });
    socket.on("connection", (socket) => {
        console.log('Socket Connected'); 
    });
    // socket.on('654c0cc1f706ea64d2747ee1', (socket)=>{
    //     console.log(socket);
    // });
    return socket;
}
const getSocket = () => {
    if(!socket) {
        throw new Error('Socket io not initialized!');
    }
    return socket;
}

export { initSocket, getSocket}