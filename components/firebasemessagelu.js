import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set } from 'firebase/database';

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

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const insererDonnees = (inputValue, Idenvoyermes,Idrecusmes) => {
    try {
      // Vérifier que les données ne contiennent pas de fonctions
      if (typeof Id === 'function' || typeof Idvisited === 'function' || typeof inputValue === 'function') {
        throw new Error("Les données ne peuvent pas contenir de fonctions");
      }
  
      const newDataRef = push(ref(database, 'Messagesdejalu')); // Remplacez 'votre_noeud' par le nom du nœud où vous voulez insérer les données
      set(newDataRef, {
        Idrecusmes: Idrecusmes,
        inputValue: inputValue,
      Idenvoyermes: Idenvoyermes,
      });
      console.log("Données insérées avec succès");
    } catch (error) {
      console.error("Erreur lors de l'insertion des données :", error);
    }
  };
  

export { insererDonnees };

             





 
