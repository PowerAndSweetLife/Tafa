import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, ScrollView } from 'react-native';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';



const TestImag = require('../assets/images/test.jpg');





const Contenu = () => {

  // Exemple de tableau de données
  const donnees = [
    { id: 1, nom: 'nirymamy', imageSource: require('../assets/images/nirymamy.jpg') },
    { id: 2, nom: 'nDeba', imageSource: require('../assets/images/test4.jpg') },
    { id: 3, nom: 'photograph', imageSource: require('../assets/images/test5.jpg') },
    { id: 4, nom: 'miary', imageSource: require('../assets/images/test2.jpg') },
    { id: 5, nom: 'Danny', imageSource: require('../assets/images/test3.jpg') },
    { id: 6, nom: 'Test6', imageSource: require('../assets/images/test.jpg') },
    
   
    


    // Ajoutez d'autres objets selon vos besoins
  ];

  // Tableau pour stocker les éléments JSX générés
  const elementsJSX = [];

  // Boucle for pour générer les éléments JSX
  for (let i = 0; i < donnees.length; i++) {
    const item = donnees[i];
    elementsJSX.push(
      <View key={item.id} style={styles.Imagcontainer}>
        <View>
          <Image source={item.imageSource} style={styles.image} />
        </View>
        <View style={styles.NomEtStatut}>
          <View>
            <Text style={styles.Nom}>{item.nom}</Text>
          </View>
          <View style={styles.statutContainer}>
            {item.enLigne ? (
              <Text style={styles.statutHorsLigne}></Text>
            ) : (
              <View style={styles.statutEnLigne}></View>
            )}
          </View>
        </View>
      </View>
    );

  };



  return (

    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contenu}>

          {elementsJSX}

        </View>

      </ScrollView>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    paddingTop: -3,
    display: 'flex',
    flex:1,
    flexWrap: 'wrap',
  },
  scrollView: {
    marginHorizontal: 20,
    marginLeft: 3,
    marginRight: 10,
  },
  contenu: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 15,
  },
  Imagcontainer: {
    width: 120,
    height: 145,
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 7,
  },
  NomEtStatut: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

  },
  Nom: {
    fontSize: 18,
    
    color: 'black',
  },

  statutContainer: {
    paddingLeft: 5,
  },
  statutEnLigne: {
    backgroundColor: 'green',
    width: 8,
    height: 8,
    borderRadius: 50,

  },
  statutHorsLigne: {
    backgroundColor: 'red',
    width: 8,
    height: 8,
    borderRadius: 50,

  },

});

export default Contenu