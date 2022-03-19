import React, { useState } from "react";

import SignIn from "./components/SignIn";

import Navbar from "./components/Navbar";
import Scoreboard from "./components/Scoreboard";
import Game from "./components/Game";

import StartScreen from "./components/StartScreen";

// ! Install Tailwind CSS
function App() {
  const [start, setStart] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => {
    setLoggedIn(true);
    window.alert("Logged in");
  };

  return (
    <div className="App">
      <div className="text-3xl font-bold underline">Hey</div>
      {/* show login screen */}
      {!loggedIn && <SignIn logIn={logIn} />}
      {/* if logged in, show the following */}
      {loggedIn && (
        <>
          <Navbar />
          {/* If the game is started, show scoreboard and game controller */}
          {start && (
            <>
              <Scoreboard />
              <Game />
            </>
          )}
          {/* If the game is not started, show start screen */}
          {!start && <StartScreen start={start} setStart={setStart} />}
        </>
      )}
    </div>
  );
}

export default App;
