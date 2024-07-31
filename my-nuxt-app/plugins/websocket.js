// plugins/websocket.js
export default ({ app }, inject) => {
  const socket = new WebSocket('ws://localhost:8000/ws/');

  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Message from server:', data);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  inject('socket', socket);
};