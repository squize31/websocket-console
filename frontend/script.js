const statusEl = document.getElementById("status");
const log = document.getElementById("log");
const input = document.getElementById("message-input");

const socket = new WebSocket('ws://localhost:8080');

const appendLog = (label, message) => {
  const entry = `${new Date().toLocaleTimeString()}${label}${message}\n`
  log.textContent = entry + log.textContent;
}

socket.addEventListener('open', () => {
  statusEl.textContent = 'CONNECTED: ws://localhost:8080';
  statusEl.className = 'status-on';
  appendLog('[SYSTEM]', 'Tunnel Established.');
});

socket.addEventListener('close', () => {
  statusEl.textContent = 'DISCONNECTED';
  statusEl.className = 'status-off';
  appendLog('[SYSTEM]', 'Tunnel Collapsed.');
});

socket.addEventListener('message', (e) => {
  appendLog('[RECEIVED]', e.data);
});

document.getElementById('message-form').addEventListener('submit', (e) => {
  e.preventDefault();

  if(socket.readyState !== WebSocket.OPEN) {
    appendLog('[ERROR]', 'No active tunnel found.')
  }

  const msg = input.value.trim();
  socket.send(msg);
  appendLog('[SENT]', msg);
  input.value = '';
})