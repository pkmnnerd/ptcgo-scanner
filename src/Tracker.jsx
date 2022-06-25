import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { logEvent, getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBYa65CyT-KzIM5e-PLRv9MprWZJUlrL7M',
  authDomain: 'pokescan-8c83c.firebaseapp.com',
  projectId: 'pokescan-8c83c',
  storageBucket: 'pokescan-8c83c.appspot.com',
  messagingSenderId: '606182935967',
  appId: '1:606182935967:web:5e060650013463a1c401aa',
  measurementId: window.location.host.includes('localhost') ? '' : 'G-BFT3708497',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default function Tracker() {
  const location = useLocation();
  useEffect(() => {
    logEvent(analytics, 'screen_view', {
      firebase_screen: location.pathname,
    });
  }, [location]);

  
  return;
}