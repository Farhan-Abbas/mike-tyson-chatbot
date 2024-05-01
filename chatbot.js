async function sendMessage() {
  var input = document.getElementById('userInput');
  var message = input.value;
  input.value = '';

  var chatbox = document.getElementById('chatbox');
  var userMessage = document.createElement('div');
  userMessage.className = 'message user';
  userMessage.textContent = message;
  chatbox.appendChild(userMessage);

  var messageFromMike = message;
  var mikeMessage = document.createElement('div');
  mikeMessage.className = 'message mike';
  mikeMessage.textContent = messageFromMike;
  chatbox.appendChild(mikeMessage);

  // Scroll to the bottom of the chatbox
  chatbox.scrollTop = chatbox.scrollHeight;
}

async function getMessages(message) {
    const backendEndpoint = "http://127.0.0.1:5000/chat";
    try {
        const response = await fetch(backendEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: message }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data["message"]);
            console.log("Message received successfully!");
            return data["message"];
        } else {
            console.error("Error receiving message!.");
        }
    } catch (error) {
        console.error("Error sending data!", error);
    }
};

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
}
