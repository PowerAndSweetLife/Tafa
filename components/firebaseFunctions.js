import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push , onValue } from 'firebase/database';
import messaging from '@react-native-firebase/messaging';
import { EventEmitter } from 'events';


// Votre configuration Firebase
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

const insererDonnees = (Monprofil, Pseudo, profileimage) => {
  const db = getDatabase();
  const visitesRef = ref(db, 'profiles_visits');

  // Obtenir le timestamp actuel
  const currentTime = Date.now();

  // Vérifier si une visite identique existe déjà
  onValue(visitesRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const visites = Object.values(data);

      // Vérifier chaque visite dans la base de données
      const visiteExistante = visites.find((visite) => {
        const visiteTime = new Date(visite.timestamp).getTime();

        // Vérifier si la visite a été effectuée dans les 24 dernières heures
        const timeDiff = currentTime - visiteTime;
        const oneDayInMs = 24 * 60 * 60 * 1000; // Nombre de millisecondes dans une journée
        const isWithin24Hours = timeDiff <= oneDayInMs;

        return (
          visite.visitedUserId === Monprofil.Id &&
          visite.visitorUserId === Pseudo &&
          visite.img_link === profileimage &&
          isWithin24Hours
        );
      });

      // Si une visite identique est trouvée, ne pas l'insérer à nouveau
      if (visiteExistante) {
        console.log('La visite existe déjà dans les 24 dernières heures. Pas d\'insertion nécessaire.');
        return;
      }
    }

    // Si aucune visite identique n'est trouvée dans les 24 dernières heures, procéder à l'insertion des nouvelles données
    push(visitesRef, {
      visitedUserId: Monprofil.Id,
      img_link: profileimage,
      visitorUserId: Pseudo,
      Notifications: `${Pseudo} a visité votre profil`, 
      timestamp: new Date().toISOString()
    })
    .then(() => {
      console.log('Données insérées avec succès !');

      // Envoyer une notification à l'utilisateur visité
      const notificationMessage = `${Pseudo} a visité votre profil`;
      console.log(notificationMessage);
      messaging().send({
        token: userData.token, // Le token de l'utilisateur visité pour envoyer la notification
        notification: {
          title: 'Nouvelle visite de profil',
          body: notificationMessage,
        },
      })
      .then(() => {
        console.log('Notification envoyée avec succès !');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi de la notification :', error);
      });
    })
    .catch((error) => {
      console.error('Erreur lors de l\'insertion des données :', error);
    });
  });
};


export { insererDonnees,  };
