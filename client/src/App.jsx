import { useState } from "react";
import Chat from "./components/Chat";
import UsernameModal from "./components/UsernameModal";
import "./style.css";

function App() {
  const [username, setUsername] = useState(
    () => localStorage.getItem("chat_username") || "",
  );

  const handleJoin = (name) => {
    localStorage.setItem("chat_username", name);
    setUsername(name);
  };

  if (!username) {
    return <UsernameModal onJoin={handleJoin} />;
  }

  return <Chat username={username} />;
}

export default App;
