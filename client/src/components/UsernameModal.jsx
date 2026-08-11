import { useState } from "react";

const generateGuestName = () => {
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return `Guest-${randomNumber}`;
};

const UsernameModal = ({ onJoin }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (trimmedUsername) {
      onJoin(trimmedUsername);
    } else {
      onJoin(generateGuestName());
    }
  };

  const handleGuestJoin = () => {
    onJoin(generateGuestName());
  };

  return (
    <div className="username-screen">
      <div className="username-card">
        <h1>Vedaz Chat</h1>

        <p>Enter a username or continue as a guest.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username (optional)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={20}
          />

          <button className="btn" type="submit">
            Join Chat
          </button>
        </form>

        <button className="guest-button btn" onClick={handleGuestJoin}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default UsernameModal;
