window.onload = function() {
  if(document.getElementById("Home")){
    alert("Hello! Welcome to Dar ul Tafseer");
  }
  // Optionally set year if element exists
  var yearElem = document.getElementById("year");
  if(yearElem) {
    const currentYear = new Date().getFullYear();
    yearElem.textContent = "Year: " + currentYear;
  }
}

function CheckAvailability(id){
  if(id=="Book1"){alert("This item is in stock")}
  else if(id=="Book2"){alert("This item is not in stock")}
  else if(id=="Book3"){alert("This item is not in stock")}
  else if(id=="Book4"){alert("This item is in stock")}
  else if(id=="Book5"){alert("This item is not in stock")}
}

// Validation for contact form
function validateForm() {
  var name = document.getElementById("name")?.value.trim() || "";
  var email = document.getElementById("email")?.value.trim() || "";
  var password = document.getElementById("password")?.value.trim() || "";
  var errorDiv = document.getElementById("error");
  var successDiv = document.getElementById("success");

  // Reset messages
  if(errorDiv) errorDiv.textContent = "";
  if(successDiv) successDiv.textContent = "";

  if (name === "" || email === "" || password === "") {
    if(errorDiv) errorDiv.textContent = "All fields are required!";
    return false;
  }

  // Basic email pattern
  var emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  if (!emailPattern.test(email)) {
    if(errorDiv) errorDiv.textContent = "Please enter a valid email.";
    return false;
  }

  if (password.length < 6) {
    if(errorDiv) errorDiv.textContent = "Password must be at least 6 characters.";
    return false;
  }

  if(successDiv) successDiv.textContent = "Form submitted successfully!";
  return false; // Prevent actual submission for demo
}

document.addEventListener("DOMContentLoaded", function() {
    // Chatbot logic for main page (Contact.html)
    var openBtn = document.getElementById("chatbot-open-btn");
    var chatbotIframe = document.getElementById("chatbot-iframe");
    if(openBtn && chatbotIframe) {
        openBtn.onclick = function() {
            if (chatbotIframe.style.display === 'block') {
                chatbotIframe.style.display = 'none';
            } else {
                chatbotIframe.style.display = 'block';
                setTimeout(function() {
                    try {
                        var startBtn = chatbotIframe.contentWindow.document.getElementById('start-chat-btn');
                        if(startBtn) startBtn.focus();
                    } catch(e) {}
                }, 300);
            }
        };
        window.addEventListener('message', function(event) {
            if(event.data === 'close-chatbot') {
                chatbotIframe.style.display = 'none';
            }
        });
        return; // Don't run chatbot window logic below
    }

    // Chatbot logic for iframe (ChatBot.html)
    var chatbotWindow = document.getElementById("chatbot-window");
    var closeBtn = document.getElementById("chatbot-close");
    var startBtn = document.getElementById("start-chat-btn");
    var inputArea = document.getElementById("chatbot-input-area");
    var initiateDiv = document.getElementById("chatbot-initiate");
    var input = document.getElementById("chatbot-input");
    var messages = document.getElementById("chatbot-messages");

    // --- Helper function to add chat messages ---
    function addChatMessage(sender, text, className) {
        if(!messages) return;
        var div = document.createElement("div");
        div.className = className;
        div.textContent = sender + ": " + text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }
    window.addChatMessage = addChatMessage;
    // --- End helper ---

    if(closeBtn) {
        closeBtn.onclick = function() {
            if(window.parent !== window) {
                window.parent.postMessage('close-chatbot', '*');
            } else {
                window.close();
            }
        };
    }
    if(startBtn && inputArea && initiateDiv) {
        startBtn.onclick = function() {
            initiateDiv.style.display = 'none';
            inputArea.style.display = 'block';
            addChatMessage('Bot', 'Hello! How can I help you today?', 'chatbot-bot-msg');
            if(input) input.focus();
        };
    }
    // --- Step 2: Handle user input and display messages ---
    window.sendChatbotMessage = function() {
        if(!input) return;
        var userMsg = input.value.trim();
        if (!userMsg) return;
        addChatMessage("You", userMsg, "chatbot-user-msg");
        input.value = "";
        // Bot reply logic
        var botReply = "";
        if (userMsg.toLowerCase().includes("hello") || userMsg.toLowerCase().includes("hi")) {
            botReply = "Hello! How can I assist you today?";
        } else if (userMsg.toLowerCase().includes("product")) {
            botReply = "We offer a variety of products. Please visit our Products page for more info.";
        } else if (userMsg.toLowerCase().includes("contact")) {
            botReply = "You can contact us at aliabdullah39111@gmail.com or use the contact form.";
        } else if (userMsg.toLowerCase().includes("bye")) {
            botReply = "Goodbye! Have a great day!";
        } else {
            botReply = "Sorry, I am a simple bot and can only answer basic questions.";
        }
        addChatMessage("Bot", botReply, "chatbot-bot-msg");
    }
});
