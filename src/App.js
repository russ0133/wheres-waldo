import React, { useState, useEffect, useCallback, Suspense } from "react";

import Scoreboard from "./components/Scoreboard";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";

import { logout, auth, updateBestScore, db } from "./firebase";
import { useAuthState, useDocumentData } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import GetUserData from "./components/GetUserData";

import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  Firestore,
  doc,
} from "firebase/firestore";

function App() {
  // StartScreen props
  const [start, setStart] = useState(false);

  // Timer Props
  const [isActive, setIsActive] = useState(true);
  const [seconds, setSeconds] = useState(0);

  // Other Props
  const [level, setLevel] = useState(null);
  const [character, setCharacter] = useState(null);

  // Authentication and Routers
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const [uid, setUid] = useState(0);

  function finishGame() {
    tryUpdatingScore(seconds);
    setStart(false);
    setIsActive(false);
    setSeconds(0);
  }
  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  function tryUpdatingScore(score) {
    updateBestScore(user.uid, score);
    console.log(user);
  }

  async function findTest() {
    const citiesRef = collection(db, "users");
    const q1 = query(citiesRef, where("uid", "==", user.uid));
    const ref = await getDocs(q1);
    const id = setUid(ref.docs[0].id);
    return ref.docs[0].id;
  }

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen

      return;
    }
    if (!user) navigate("/");
  }, [user, loading]);

  useEffect(() => {
    findTest();
  }, [user, loading]);

  return (
    <Suspense fallback={null}>
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
                  currentCharacter={character}
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
              className="bg-red-500 text-neutral-200 cursor-pointer hover:bg-red-600 rounded-lg px-2"
            >
              Log out
            </div>
          </>
        )}
      </div>
    </Suspense>
  );
}

export default App;
