

const socket = io();

  // Get references to DOM elements
  const messages = document.getElementById('messages');
  const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');
  const apiButton = document.getElementById('apiButton');

  // Listen for 'chat message' events and add to messages list
  socket.on('chat message', function(msg) {
    const li = document.createElement('li');
    li.textContent = msg;
    messages.appendChild(li);
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Send message on button click
  sendButton.addEventListener('click', function() {
    if (messageInput.value) {
      socket.emit('chat message', messageInput.value);
      messageInput.value = '';
    }
  });

  // Send message on enter key press
  messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendButton.click();
    }
  });

  // Fetch message from REST API and display it
  apiButton.addEventListener('click', async function() {
    try {
      const response = await fetch('/api/chat');
      const data = await response.json();
      socket.emit('chat message', data.message);
    } catch (error) {
      console.error('Error fetching API message:', error);
    }
  });