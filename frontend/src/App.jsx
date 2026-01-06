import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import AdminUpload from "./pages/AdminUpload";
import Login from "./pages/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );


  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <Navbar /> 

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/admin" element={<AdminUpload />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
