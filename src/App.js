import React, { useState, useEffect } from "react";

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
    <div className="App flex flex-col items-center justify-between bg-slate-200 h-screen w-screen p-4">
      {loading && <div>Loading...</div>}
      {user && (
        <>
          {start && (
            <>
              <Scoreboard />
              <Game currentCharacter={character} />
            </>
          )}
          {!start && <StartScreen start={start} setStart={setStart} />}
          <div
            onClick={logout}
            className="bg-red-500 text-neutral-200 cursor-pointer hover:bg-red-600 rounded-lg px-2"
          >
            Log out
          </div>
        </>
      )}
    </div>
  );
}

export default App;
