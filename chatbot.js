async function sendMessage() {
	var input = document.getElementById("userInput");
	var message = input.value;
	input.value = "";

	var chatbox = document.getElementById("chatbox");

	var userMessageContainer = document.createElement("div");
	userMessageContainer.className = "userMessageContainer";

	var userMessage = document.createElement("div");
	userMessage.className = "message user";
	userMessage.textContent = message;
	userMessageContainer.appendChild(userMessage);

	var image = document.createElement("img");
	image.src = "images/user profile pic.jpg";
	image.alt = "User";
	image.className = "userProfilePic";
	userMessageContainer.appendChild(image);

	chatbox.appendChild(userMessageContainer);

	// mike's response

	var mikeMessageContainer = document.createElement("div");
	mikeMessageContainer.className = "mikeMessageContainer";

	var image = document.createElement("img");
	image.src = "images/mike tyson portrait.jpg";
	image.alt = "Mike Tyson";
	image.className = "mikeProfilePic";
	mikeMessageContainer.appendChild(image);

	var mikeMessage = document.createElement("div");
	mikeMessage.className = "message mike typing";
	mikeMessage.textContent = "...";
	mikeMessageContainer.appendChild(mikeMessage);

	chatbox.appendChild(mikeMessageContainer);

	setTimeout(async function () {
		mikeMessage.textContent = await getMessages(message);
		mikeMessage.classList.remove("typing");
	}, 1500);

	// Scroll to the bottom of the chatbox
	chatbox.scrollTop = chatbox.scrollHeight;
}

async function getMessages(message) {
    const backendEndpoint = "https://mike-tyson-chatbot.vercel.app/api/chat";
    try {
        const response = await fetch(backendEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: message }),
        });
        const text = await response.text();
        const data = JSON.parse(text);
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
}

function handleKeyPress(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		sendMessage();
	}
}


