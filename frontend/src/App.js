import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import ChatPage from "./Pages/ChatPage";
import Homepage from "./Pages/Homepage";
function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Homepage} />
      <Route path="/chat" component={ChatPage} />
    </div>
  );
}

export default App;
