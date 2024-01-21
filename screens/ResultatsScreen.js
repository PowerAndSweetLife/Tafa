import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Image, ScrollView,item } from 'react-native';
import NavSearchmodif from '../components/NavSearchmodif';

const ResultatsScreen = ({ route }) => {


  // Effectuez la recherche et affichez les résultats

  const { searchTerm } = route.params;
  const allItems = [
    { id: 1, name: 'nirymamy', imageSource: require('../assets/images/nirymamy.jpg') },
    { id: 2, name: 'nDeba', imageSource: require('../assets/images/test4.jpg') },
    { id: 3, name: 'photograph', imageSource: require('../assets/images/test5.jpg') },
    { id: 4, name: 'miary', imageSource: require('../assets/images/test2.jpg') },
    { id: 5, name: 'danny', imageSource: require('../assets/images/test3.jpg') },
    { id: 6, name: 'Test6', imageSource: require('../assets/images/test.jpg') }

    // ... Ajoutez d'autres éléments au besoin
  ];
  const filteredResults = allItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const calculateProximity = (text, searchTerm) => {
    const commonChars = text
      .toLowerCase()
      .split('')
      .filter(char => searchTerm.toLowerCase().includes(char)).length;

    return commonChars;
  };

  // Tri des résultats en fonction de la proximité avec le terme de recherche
  const sortedResults = allItems.sort((a, b) => {
    const proximityA = calculateProximity(a.name, searchTerm);
    const proximityB = calculateProximity(b.name, searchTerm);

    return proximityB - proximityA;
  });







  const elementsJSX = [];

  // Boucle for pour générer les éléments JSX
  for (let i = 0; i < allItems.length; i++) {
    const item = allItems[i];
    elementsJSX.push(
      <View key={item.id} style={styles.Imagcontainer}>

        <View>
          <Image source={item.imageSource} style={styles.image} />
        </View>
        <View style={styles.NomEtStatut}>
          <View>
            <Text style={styles.Nom}>{item.name}</Text>
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
    flexWrap: 'wrap',
    backgroundColor:'white',
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
  NOresult:{
    textAlign:'center',
    color:'red',
    fontSize:25,
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