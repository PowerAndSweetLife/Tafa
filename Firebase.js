import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';
import messaging from '@react-native-firebase/messaging';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYKiIFezCeFDLl5ORLApWeOIhtSQrmWuU",
  authDomain: "notification-tafa.firebaseapp.com",
  databaseURL: "https://notification-tafa-default-rtdb.firebaseio.com",
  projectId: "notification-tafa",
  storageBucket: "notification-tafa.appspot.com",
  messagingSenderId: "1081071061333",
  appId: "1:1081071061333:web:d2be808d89d4c00ea687dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Fonction pour insérer des données dans Firebase Realtime Database
const insererDonnees = (userData, Id) => {
  // Obtenez une référence à votre base de données
  const db = getDatabase();

  // Obtenez une référence à l'emplacement où vous souhaitez insérer les données
  const visitesRef = ref(db, 'profiles_visits');

  // Insérez des données en utilisant push() pour générer automatiquement une clé unique
  push(visitesRef, {
    visitedUserId: userData.Id,
    visitorUserId: Id,
    timestamp: new Date().toISOString()
  })
  .then(() => {
    console.log('Données insérées avec succès !');
  })
  .catch((error) => {
    console.error('Erreur lors de l\'insertion des données :', error);
  });
};

// Gestionnaire de messages en arrière-plan
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

export { app, insererDonnees };
