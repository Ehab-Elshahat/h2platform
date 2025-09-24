/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp4AxflAfrcx893lDwub6Z7P_s-MSNN3c",
  authDomain: "h2platform-c31be.firebaseapp.com",
  projectId: "h2platform-c31be",
  storageBucket: "h2platform-c31be.firebasestorage.app",
  messagingSenderId: "243609526689",
  appId: "1:243609526689:web:0e2c849ce2ecb4f02fabe0",
  measurementId: "G-6824ZWXCC7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
