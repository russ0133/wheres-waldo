// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_yqsp8sfdMhcOyPpo3-KBgzbCS_r_c5I",
  authDomain: "wheres-waldo-d1cfb.firebaseapp.com",
  projectId: "wheres-waldo-d1cfb",
  storageBucket: "wheres-waldo-d1cfb.appspot.com",
  messagingSenderId: "71384848424",
  appId: "1:71384848424:web:1fa3ea3e0cdd512778bd1d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const updateBestScore = async (uuid, score) => {
  /*   const userRef = query(
    collection(db, "users"),
    where("uid", "==", uuid)
  ).getDoc(); */

  const q = query(collection(db, "users"), where("uid", "==", uuid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => {
    // doc.data() is never undefined for query doc snapshots
    /* const update = await updateDoc(doc, { bestScore: 5 }); */
    console.log(doc.data().bestScore);
    if (score < doc.data().bestScore) {
      const res = await updateDoc(doc.ref, { bestScore: score });
    }
    console.log(doc.id, " => ", doc.data());
  });
};

const getUserDocFromUid = async (uuid) => {
  const q = query(collection(db, "users"), where("uid", "==", uuid));
  const querySnapshot = await getDocs(q);
  let res = null;
  querySnapshot.forEach(async (doc) => {
    try {
      return doc.ref;
    } catch (err) {
      console.log(err);
    }
  });
};

// Authentication Code
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        bestScore: 0,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      bestScore: 0,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
  alert("Logged off");
};

export {
  auth,
  db,
  app,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  updateBestScore,
  getUserDocFromUid,
};
