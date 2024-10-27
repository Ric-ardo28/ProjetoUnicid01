async function sendMessage() {
    const input = document.getElementById('input').value;
    const response = await getAIResponse(input);
    displayMessage('Você', input);
    displayMessage('ChatEdu🤖', response);
    document.getElementById('input').value = '';
  }
  
  async function getAIResponse(question) {
    const res = await fetch('http://localhost:3000/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    return data.response;
  }
  
  function displayMessage(sender, message) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messagesDiv.appendChild(messageDiv);
  }
  
  function limparResposta() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = ''; // Limpa o conteúdo da div de mensagens
  }
  function displayMessage(sender, message) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'Edu' ? 'message edu' : 'message user';
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messagesDiv.appendChild(messageDiv);
  }
  
  