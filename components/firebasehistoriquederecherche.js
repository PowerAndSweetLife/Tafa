import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push , onValue ,remove} from 'firebase/database';


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

const insererHistorique = (searchTerm,Id,key) => {
// Récupérer une référence à la base de données Firebase
const db = getDatabase();

// Générer une référence à la liste "historiqueRecherche"
const historiqueRef = ref(db, 'Historiquerecherche');

// Ajouter une nouvelle entrée à la liste "historiqueRecherche"
push(historiqueRef, {
    key:key,
    Id: Id,
  searchTerm: searchTerm,
  timestamp: Date.now() // Ajouter une timestamp pour enregistrer le moment de la recherche
});
};

export { insererHistorique,  };


