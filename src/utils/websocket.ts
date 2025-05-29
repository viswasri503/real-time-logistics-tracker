import { store } from '../store';
import { updateDriver } from '../store/driverSlice';

export function connectWebSocket() {
  const socket = new WebSocket('ws://localhost:8080');

  socket.onopen = () => {
    console.log('✅ Connected to WebSocket server');
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    store.dispatch(updateDriver(data));
  };

  socket.onerror = (err) => {
    console.error('❌ WebSocket error:', err);
  };

  socket.onclose = () => {
    console.warn('⚠️ WebSocket closed. Attempting to reconnect in 3s...');
    setTimeout(() => connectWebSocket(), 3000);
  };
}
