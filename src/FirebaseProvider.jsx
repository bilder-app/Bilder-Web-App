import { createContext, useContext, useState, useEffect } from "react";
import firebase from "firebase/app";

const FirebaseContext = createContext({});

export const useFirebase = () => useContext(FirebaseContext);

export default function FirebaseProvider({ children }) {
  const [state, setState] = useState({});

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyABdnic2WsbLUXMu-EVVV9ijDncQzNCJPM",
      authDomain: "bilder-301ea.firebaseapp.com",
      projectId: "bilder-301ea",
      storageBucket: "bilder-301ea.appspot.com",
      messagingSenderId: "1014595861688",
      appId: "1:1014595861688:web:91918b539e881f8fc5c84d"
    };

    let firebaseApp;
    if (firebase.apps.length === 0) {
      firebaseApp = firebase.initializeApp(firebaseConfig);
    } else {
      firebaseApp = firebase.app();
    }

    setState({ firebase: firebaseApp, storageRef: firebase.storage().ref() });
  }, []);

  return (
    <FirebaseContext.Provider value={state}>
      {children}
    </FirebaseContext.Provider>
  );
}
