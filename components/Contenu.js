import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from "../helper/url";
import SkeletonItem from '../components/skeleton/skeletonContenu';
import defaultHommeAvatar from '../assets/Avatar/avatarhomme2.jpg';
import defaultfemmeAvatar from '../assets/Avatar/avatarfemme2.jpg';
import { useUser } from './context/usercontext';
import { insererDonnees } from './firebaseFunctions'; // Assurez-vous de spécifier le bon chemin




const Contenu = () => {
  const navigation = useNavigation();
  const [donnees, setDonnees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Monprofil } = useUser();
  const Id = Monprofil && Monprofil.Id ? Monprofil.Id : 'defaultUserId';//id du userUsers de l'utilisateur connecter 
  const Pseudo = Monprofil && Monprofil.Pseudo ? Monprofil.Pseudo : 'defaultUserId';
  const profileimage = Monprofil && Monprofil.img_link ? Monprofil.img_link : 'img_link';
  // Définissez le nombre cible d'utilisateurs à afficher pour chaque sexe
  const nombreCibleParSexe = 8;

  useEffect(() => {
    fetch(BASE_URL + 'users')
      .then(response => response.json())
      .then(data => {
        // Filtrer les données pour ne pas inclure l'utilisateur connecté
        const filteredData = data.filter(item => item.Id !== Id);
        // Séparer les utilisateurs en fonction du sexe
        const hommes = filteredData.filter(item => item.Sexe === 'Homme').slice(0, nombreCibleParSexe);
        const femmes = filteredData.filter(item => item.Sexe === 'Femme').slice(0, nombreCibleParSexe);
        setDonnees(filteredData);
        setTimeout(() => setLoading(false), 5000);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false);
      });

  }, []);

  const defaultAvatar = (sexe) => {
    return sexe === 'Homme' ? defaultHommeAvatar : defaultfemmeAvatar;
  };

  const onPressProfil = (userData) => {
    insererDonnees(Monprofil, Pseudo, profileimage);
    navigation.navigate('Profil', { userData: userData });
  };


  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.contenu}>
            {[...Array(donnees.length)].map((_, index) => (
              <SkeletonItem key={index} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const elementsJSX = donnees
    .filter(item => item.img_link) // Filtrer les utilisateurs avec une img_link
    .map(item => (
      <View key={item.Id} style={styles.Imagcontainer}>
        <Pressable onPress={() => onPressProfil(item)}>
          <View>
            <Image
              source={item.img_link ? { uri: BASE_URL + item.img_link } : defaultAvatar(item.Sexe)}
              style={styles.image}
            />
          </View>
          <View style={styles.NomEtStatut}>
            <View>
              <Text style={styles.Nom}>{item.Pseudo}</Text>
            </View>
            <View style={styles.statutContainer}>
              {item.enLigne ? (
                <Text style={styles.statutEnLigne}></Text>
              ) : (
                <View style={styles.statutHorsLigne}></View>
              )}
            </View>
          </View>
        </Pressable>
      </View>
    ));


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contenu}>
          {elementsJSX}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    paddingTop: -3,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  contenu: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 15,
    justifyContent: 'flex-start',
  },
  Imagcontainer: {
    width: '30.4%',
    minWidth: '30%',
    height: 145,
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: '2.5%',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 7,
    backgroundColor: 'lightgrey',
  },
  NomEtStatut: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Nom: {
    fontSize: 12,
    color: 'black',
  },
  statutContainer: {
    paddingLeft: 5,
  },
  statutHorsLigne: {
    backgroundColor: 'red',
    width: 8,
    height: 8,
    borderRadius: 50,
  },
  statutEnLigne: {
    backgroundColor: 'green',
    width: 8,
    height: 8,
    borderRadius: 50,
  },  
});

export default Contenu;
