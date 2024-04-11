import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView} from 'react-native';
import { useState,useEffect } from 'react';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const test = ({ route }) => {


  















  const [displayedValue1, setDisplayedValue1] = useState('');
  const [displayedValue2, setDisplayedValue2] = useState('');
  const [displayedValue3, setDisplayedValue3] = useState('');
  const [displayedValue4, setDisplayedValue4] = useState('');
  const [displayedValue5, setDisplayedValue5] = useState('');
  const [displayedValue6, setDisplayedValue6] = useState('');
  
  const [displayedValue7, setDisplayedValue7] = useState('');
  const [displayedValue8, setDisplayedValue8] = useState('');
  const [displayedValue9, setDisplayedValue9] = useState('');
  const [displayedValue10, setDisplayedValue10] = useState('');
  const [displayedValue11, setDisplayedValue11] = useState('');
  const [displayedValue12, setDisplayedValue12] = useState('');
  const [displayedValue13, setDisplayedValue13] = useState('');
  




  useEffect(() => {
    // Extraire les valeurs des paramètres de navigation
    const {
      displayedValue1,
      displayedValue2,
      displayedValue3,
      displayedValue4,
      displayedValue5,
      displayedValue6,
      displayedValue7,
      displayedValue8,
      displayedValue9,
      displayedValue10,
      displayedValue11,
      displayedValue12,
      displayedValue13,
      
    } = route.params;

    // Mettre à jour les états avec les valeurs extraites
    setDisplayedValue1(displayedValue1);
    setDisplayedValue2(displayedValue2);
    setDisplayedValue3(displayedValue3);
    setDisplayedValue4(displayedValue4);
    setDisplayedValue5(displayedValue5);
    setDisplayedValue6(displayedValue6);
    setDisplayedValue7(displayedValue7);
    setDisplayedValue8(displayedValue8);
    setDisplayedValue9(displayedValue9);
    setDisplayedValue10(displayedValue10);
    setDisplayedValue11(displayedValue11);
    setDisplayedValue12(displayedValue12);
    setDisplayedValue13(displayedValue13);
  }, [route.params]);;

  return (





        <View style={styles.container}>
          <Text>Informations Generales</Text>
          <Text>Nom : {displayedValue1}</Text>
          <Text>Sexe : {displayedValue2}</Text>
          <Text>Situation : {displayedValue3}</Text>
          <Text>Ville : {displayedValue4}</Text>
          <Text>Signe : {displayedValue5}</Text>
          <Text>Objectif : {displayedValue6}</Text>

          <Text>Emploi et Etudes</Text>
          <Text>Emploi : {displayedValue7}</Text>
          <Text>Etude : {displayedValue8}</Text>
          <Text>Centre d'interet : {displayedValue9}</Text>
          <Text>Langue : {displayedValue10}</Text>

          <Text>Mots de passe</Text>
          <Text>Ancien : {displayedValue11}</Text>
          <Text>Nouveau : {displayedValue12}</Text>
          <Text>Confirmer : {displayedValue13}</Text>
        </View>
     
  );
};
      
  

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    padding: 5,
    
  },
 
  
});

export default test;
