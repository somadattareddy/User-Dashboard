import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { AddPostProvider } from "./contexts/AddPostContext";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <Router>
      <UserProvider>
        <AddPostProvider>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<UserList/>} />
            <Route path="/user/:id" element={<UserDetails/>} />
          </Routes>
        </AddPostProvider>
      </UserProvider>
    </Router>
  );
}

export default App;