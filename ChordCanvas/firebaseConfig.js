import { initializeApp, getApps } from "firebase/app"; // Correct import

// Your Firebase configuration (obtain this from the Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyAwrpTMMyAe4X-4y7wlgWq0Haklol41kYI",
  authDomain: "chord-canvas-934.firebaseapp.com",
  projectId: "chord-canvas-934",
  storageBucket: "chord-canvas-934.firebasestorage.app",
  messagingSenderId: "410150157853",
  appId: "1:410150157853:web:669a65061bc3695ba650f4",
};


// Check if app is already initialized to prevent multiple initializations
if (getApps().length === 0) {
  const app = initializeApp(firebaseConfig);

}
