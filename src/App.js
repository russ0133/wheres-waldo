import React, { useState, useEffect } from "react";

import Scoreboard from "./components/Scoreboard";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";

import { logout, auth, updateBestScore, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import GetUserData from "./components/GetUserData";

import { limit, query, collection, where, getDocs } from "firebase/firestore";
import { characters } from "./utils/characters";

function App() {
  // StartScreen props
  const [start, setStart] = useState(false);

  // Timer Props
  const [isActive, setIsActive] = useState(true);
  const [seconds, setSeconds] = useState(0);

  // Authentication and Routers
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const [uid, setUid] = useState(0);

  function finishGame() {
    characters.forEach((character) => (character.isFound = false));
    tryUpdatingScore(seconds);
    setStart(false);
    setIsActive(false);
    setSeconds(0);
  }
  function tryUpdatingScore(score) {
    updateBestScore(user.uid, score);
    console.log(user);
  }

  async function findUserDocument() {
    const citiesRef = collection(db, "users");
    const q1 = query(citiesRef, where("uid", "==", user.uid), limit(1));
    const ref = await getDocs(q1).then((snapshot) => {
      setUid(snapshot.docs[0].id);
    });
  }

  useEffect(() => {
    if (!user) navigate("/");
    if (user) findUserDocument();
  }, [user, loading]);

  return (
    <div className="App flex flex-col items-center justify-between bg-slate-200 h-screen w-screen p-4">
      {loading && <div>Loading...</div>}
      {user && (
        <>
          {start && (
            <>
              <Scoreboard
                seconds={seconds}
                setSeconds={setSeconds}
                isActive={isActive}
                tryUpdatingScore={tryUpdatingScore}
              />
              <Game
                seconds={seconds}
                setIsActive={setIsActive}
                finishGame={finishGame}
              />
            </>
          )}
          {!start && (
            <>
              {uid != 0 && <GetUserData uid={uid} />}
              <StartScreen start={start} setStart={setStart} />
            </>
          )}
          <div
            onClick={logout}
            className="bg-red-500 text-neutral-200 cursor-pointer hover:bg-red-600 rounded-lg mt-4 px-2"
          >
            Log out
          </div>
        </>
      )}
    </div>
  );
}

export default App;
