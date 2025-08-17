import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_API_URL, {
  transports: ['websocket'],
});

// export const cardSocket = io(`http://localhost:8765`, {
//   transports: ['websocket'],
// });
