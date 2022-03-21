import React, { useState, useEffect } from "react";

import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import Scoreboard from "./components/Scoreboard";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";

import { logout, auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function App() {
  const [start, setStart] = useState(false);
  const [character, setCharacter] = useState(null);

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen

      return;
    }
    if (!user) navigate("/");
  }, [user, loading]);

  return (
    <div className="App flex flex-col items-center bg-slate-200 h-screen w-screen">
      <div className="text-3xl font-bold underline">Hey</div>
      {/* show login screen */}
      {loading && <div>Loading...</div>}
      {/* if logged in, show the following */}
      {user && (
        <>
          <Navbar />
          {/* If the game is started, show scoreboard and game controller */}
          {start && (
            <>
              <Scoreboard />
              <Game currentCharacter={character} />
            </>
          )}
          {/* If the game is not started, show start screen */}
          {!start && <StartScreen start={start} setStart={setStart} />}
          <div onClick={logout}>Log out</div>
        </>
      )}
    </div>
  );
}

export default App;
