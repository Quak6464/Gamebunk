const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Function to create a new message in the chat box
function addMessage(text, isBot = false) {
    const message = document.createElement("div");
    message.classList.add("message");
    message.classList.add(isBot ? "bot-message" : "user-message");
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}

// Function to handle user input and bot response
async function handleUserInput() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Add user's message to the chat
    addMessage(userMessage, false);
    userInput.value = ""; // Clear input field

    // Show "Typing..." indicator
    addMessage("Typing...", true);

    try {
        const response = await fetchAIResponse(userMessage);
        // Replace the "Typing..." message with AI's response
        chatBox.lastChild.textContent = response;
    } catch (error) {
        chatBox.lastChild.textContent = "Sorry, something went wrong. Please try again.";
    }
}

// Function to fetch AI response using OpenAI API
async function fetchAIResponse(userMessage) {
    const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API key
    const endpoint = "https://api.openai.com/v1/chat/completions";

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo", // Adjust model if needed
            messages: [{ role: "user", content: userMessage }],
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch AI response");
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// Event listeners
sendButton.addEventListener("click", handleUserInput);
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleUserInput();
});
