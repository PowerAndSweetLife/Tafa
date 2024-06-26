import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set,serverTimestamp  } from 'firebase/database';

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

const insererDonnees = (Idenvoyermes, Idrecusmes ,inputValue ,profilrecumes,Nomrecusmes,Nomenvoyermes,profilenvoyermes) => {
    try {
      // Vérifier que les données ne contiennent pas de fonctions
      if (typeof Id === 'function' || typeof Idvisited === 'function' || typeof inputValue === 'function') {
        throw new Error("Les données ne peuvent pas contenir de fonctions");
      }
  
      const newDataRef = push(ref(database, 'Messages')); // Remplacez 'votre_noeud' par le nom du nœud où vous voulez insérer les données
      set(newDataRef, {
        Idenvoyermes: Idenvoyermes,
        Nomenvoyermes:Nomenvoyermes,
        profilenvoyermes:profilenvoyermes,
        Nomrecusmes: Nomrecusmes,
        Idrecusmes: Idrecusmes,
        profilrecumes: profilrecumes,
        inputValue: inputValue,
        timestamp: new Date().toISOString()
      });
      console.log("Données insérées avec succès");
    } catch (error) {
      console.error("Erreur lors de l'insertion des données :", error);
    }
  };
  

export { insererDonnees };
const insererimages = (Idenvoyermes, Idrecusmes ,imageName ,profilrecumes,Nomrecusmes,Nomenvoyermes,profilenvoyermes) => {
  try {
    // Vérifier que les données ne contiennent pas de fonctions
    if (typeof Id === 'function' || typeof Idvisited === 'function' || typeof inputValue === 'function') {
      throw new Error("Les données ne peuvent pas contenir de fonctions");
    }

    const newDataRef = push(ref(database, 'Messages')); // Remplacez 'votre_noeud' par le nom du nœud où vous voulez insérer les données
    set(newDataRef, {
      Idenvoyermes: Idenvoyermes,
      Nomenvoyermes:Nomenvoyermes,
      profilenvoyermes:profilenvoyermes,
      Nomrecusmes: Nomrecusmes,
      Idrecusmes: Idrecusmes,
      profilrecumes: profilrecumes,
      Images: imageName,
      timestamp: new Date().toISOString()
    });
    console.log("Données insérées avec succès");
  } catch (error) {
    console.error("Erreur lors de l'insertion des données :", error);
  }
};


export { insererimages };
const insereremojies = (Idenvoyermes, Idrecusmes ,emoji ,profilrecumes,Nomrecusmes,Nomenvoyermes,profilenvoyermes) => {
  try {
    // Vérifier que les données ne contiennent pas de fonctions
    if (typeof Id === 'function' || typeof Idvisited === 'function' || typeof inputValue === 'function') {
      throw new Error("Les données ne peuvent pas contenir de fonctions");
    }

    const newDataRef = push(ref(database, 'Messages')); // Remplacez 'votre_noeud' par le nom du nœud où vous voulez insérer les données
    set(newDataRef, {
      Idenvoyermes: Idenvoyermes,
      Nomenvoyermes:Nomenvoyermes,
      profilenvoyermes:profilenvoyermes,
      Nomrecusmes: Nomrecusmes,
      Idrecusmes: Idrecusmes,
      profilrecumes: profilrecumes,
      emoji: emoji,
      timestamp: new Date().toISOString()
    });
    console.log("Données insérées avec succès");
  } catch (error) {
    console.error("Erreur lors de l'insertion des données :", error);
  }
};


export { insereremojies };