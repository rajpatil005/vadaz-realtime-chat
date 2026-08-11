const Message = ({ message, currentUsername }) => {
  const isOwnMessage = message.username === currentUsername;

  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`message-row ${isOwnMessage ? "own" : ""}`}>
      <div className="message">
        <div className="message-username">{message.username}</div>

        <div className="message-text">{message.text}</div>

        <div className="message-time">{time}</div>
      </div>
    </div>
  );
};

export default Message;
