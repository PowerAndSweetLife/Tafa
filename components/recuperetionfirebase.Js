// firebaseFunctions.js


import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';
import messaging from '@react-native-firebase/messaging';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCql_o_TZT7-bbBYY9PTa_ee8VfdaMQo4g",
  authDomain: "tafa1-2a9e0.firebaseapp.com",
  databaseURL: "https://tafa1-2a9e0-default-rtdb.firebaseio.com",
  projectId: "tafa1-2a9e0",
  storageBucket: "tafa1-2a9e0.appspot.com",
  messagingSenderId: "444808821936",
  appId: "1:444808821936:web:243a5339773f19185dcf75",
  measurementId: "G-GZEMBD98F4"
};

const insererDonnees = ( unsubscribe) => {
// Obtenez une référence à votre base de données
const db = getDatabase();

// Obtenez une référence à la collection que vous souhaitez écouter
const notificationsRef = ref(db, 'notifications');

// Écoutez les modifications en temps réel dans la collection
const unsubscribe = onValue(notificationsRef, (snapshot) => {
  const notifications = [];
  snapshot.forEach((childSnapshot) => {
    notifications.push({ id: childSnapshot.key, ...childSnapshot.val() });
  });
  // Mettez à jour votre état local avec les nouvelles données
  setNotifications(notifications);
});

};

export { insererDonnees };
