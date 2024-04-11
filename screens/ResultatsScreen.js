import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Image, ScrollView,item } from 'react-native';
import NavSearchmodif from '../components/NavSearchmodif';
import { BASE_URL } from "../helper/url";
import { useState, useEffect } from 'react';





const ResultatsScreen = ({ route }) => {


  // Effectuez la recherche et affichez les résultats

  const { searchTerm } = route.params;
  const [donnees, setDonnees] = useState([]);
  const [loading, setLoading] = useState(true); // Déclaration de la variable loading

  useEffect(() => {
    fetch(BASE_URL + 'users')
      .then(response => response.json())
      .then(data => {
        setDonnees(data);
        // Mettre à jour loading après un court délai pour afficher le skeleton
        setTimeout(() => setLoading(false), 5000);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false); // Mettre à jour loading en cas d'erreur
      });
  }, []);

 const filteredResults = donnees.filter(item =>
    item.Nom.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const calculateProximity = (text = '', searchTerm = '') => {
    const commonChars = text
      .toLowerCase()
      .split('')
      .filter(char => searchTerm.toLowerCase().includes(char)).length;
  
    return commonChars;
  };
  

  // Tri des résultats en fonction de la proximité avec le terme de recherche
  const sortedResults = donnees.sort((a, b) => {
    const proximityA = calculateProximity(a.Nom, searchTerm);
    const proximityB = calculateProximity(b.Nom, searchTerm);

    return proximityB - proximityA;
  });






  const elementsJSX = [];

  // Boucle for pour générer les éléments JSX
  for (let i = 0; i < donnees.length; i++) {
    const item = donnees[i];
    elementsJSX.push(
      <View key={item.id} style={styles.Imagcontainer}>

        <View>
        <Image  source={{
              uri: BASE_URL+item.img_link
            }} style={styles.image} />
        </View>
        <View style={styles.NomEtStatut}>
          <View>
            <Text style={styles.Nom}>{item.Nom}</Text>
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
    <SafeAreaView>
      <NavSearchmodif/> 
      <ScrollView style={styles.scrollView}>
      {filteredResults.length === 0 ? (
        <View>
          <Text  style={styles.NOresult}>Aucun résultat trouvé pour "{searchTerm}"</Text>
        </View>
      ) : (
        <View style={styles.contenu}>
          {elementsJSX}
        </View>
      )}

      </ScrollView>
  </SafeAreaView>
   )







};
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
    //  justifyContent:'space-evenly',
    paddingTop: 15,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
   
  },
  Imagcontainer: {
    width: '30.4%', // Adjust this value based on the number of items you want in a row
    minWidth: '30%',
    height: 145,
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
    justifyContent: 'flex-start',
    marginLeft: '2.5%',
  },

  image: {
    width: '100%',
    height: 120,
    borderRadius: 7,
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
  NOresult:{
    textAlign:'center',
    color:'red',
    fontSize:15,
    marginTop:100,
    
  }
})
export default ResultatsScreen;
/*    
    <SafeAreaView style={styles.container}>
       <NavSearchmodif/>
      <ScrollView style={styles.scrollView}>
      {filteredResults.length === 0 ? (
        <View>
          <Text  style={styles.NOresult}>Aucun résultat trouvé pour "{searchTerm}"</Text>
        </View>
      ) : (
        <View style={styles.contenu}>
          {elementsJSX}
        </View>
      )}

      </ScrollView>
    </SafeAreaView>*/