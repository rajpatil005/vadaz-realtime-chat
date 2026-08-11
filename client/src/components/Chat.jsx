import { useEffect, useRef, useState } from "react";
import { getMessages } from "../services/api";
import { socket } from "../socket/socket";
import Message from "./Message";

const Chat = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await getMessages();
        setMessages(data);
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    loadMessages();

    socket.connect();

    socket.emit("join_chat", username);

    socket.on("receive_message", (message) => {
      setMessages((previousMessages) => [...previousMessages, message]);
    });

    socket.on("online_users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("user_typing", (user) => {
      setTypingUser(user);
    });

    socket.on("user_stop_typing", () => {
      setTypingUser("");
    });

    return () => {
      socket.off("receive_message");
      socket.off("online_users");
      socket.off("user_typing");
      socket.off("user_stop_typing");

      socket.disconnect();
    };
  }, [username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText) return;

    socket.emit("send_message", {
      username,
      text: trimmedText,
    });

    setText("");

    socket.emit("stop_typing");
  };

  const handleTyping = (e) => {
    const value = e.target.value;

    setText(value);

    if (!value.trim()) {
      socket.emit("stop_typing");
      return;
    }

    socket.emit("typing", username);

    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing");
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("chat_username");
    socket.disconnect();
    window.location.reload();
  };

  return (
    <div className="chat-page">
      <header className="chat-header">
        <div>
          <h1>Vedaz Chat</h1>

          <span>🟢 {onlineUsers.length} online</span>
        </div>

        <div className="header-actions">
          <div className="current-user">{username}</div>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <p>No messages yet.</p>
            <span>Start the conversation!</span>
          </div>
        ) : (
          messages.map((message) => (
            <Message
              key={message._id}
              message={message}
              currentUsername={username}
            />
          ))
        )}

        {typingUser && typingUser !== username && (
          <div className="typing-indicator">{typingUser} is typing...</div>
        )}

        <div ref={messagesEndRef} />
      </main>

      <form className="message-form" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={handleTyping}
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
