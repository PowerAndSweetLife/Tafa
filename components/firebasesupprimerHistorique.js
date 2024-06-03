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

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

const supprimerHistorique = (keys) => { // Utilisez une liste de clés comme paramètre
    // Récupérer une référence à la base de données Firebase
    const db = getDatabase();
    
    // Parcourir chaque clé dans la liste
    keys.forEach((key) => {
        // Référence à l'élément spécifique dans la base de données Firebase pour chaque clé
        const searchTermRef = ref(db, `Historiquerecherche/${key}`);
        console.log('Clé à supprimer :', key);
        // Supprimer uniquement la clé de la base de données Firebase
        remove(searchTermRef)
            .then(() => {
                console.log("Clé supprimée avec succès :", key);
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de la clé :", key, error);
            });
    });
};

export { supprimerHistorique };

const supprimerNotif = (keys) => { // Utilisez une liste de clés comme paramètre
    // Récupérer une référence à la base de données Firebase
    const db = getDatabase();
    
    // Parcourir chaque clé dans la liste
    keys.forEach((key) => {
        // Référence à l'élément spécifique dans la base de données Firebase pour chaque clé
        const searchTermRef = ref(db, `profiles_visits/${key}`);
        console.log('Clé à supprimer :', key);
        // Supprimer uniquement la clé de la base de données Firebase
        remove(searchTermRef)
            .then(() => {
                console.log("Clé supprimée avec succès :", key);
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de la clé :", key, error);
            });
    });
};

export { supprimerNotif };
