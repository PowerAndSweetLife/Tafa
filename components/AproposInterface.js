import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from './context/usercontexttheme';
import { useState, useEffect } from 'react';
import { useUser } from './context/usercontext';
import { BASE_URL } from "../helper/url";
import { useRoute } from '@react-navigation/native';
const logo = require('../assets/images/logo.png');
import loadFonts from './loadFonts';
import { BackHandler } from 'react-native';



function AproposInterface() {
  useEffect(() => {
    loadFonts();
  }, []);
  const route = useRoute();
  const userData = route.params.userData;

  const Id = userData.id;
  const { isDarkMode } = useTheme();
  const [donnees, setDonnees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.109/Tafa+Api/get_Apropos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: Id }),
        });

        if (!response.ok) {
          throw new Error('Erreur HTTP, statut : ' + response.status);
        }

        const data = await response.json();
        console.log('Data from API:', data);
        if (Array.isArray(data.results)) {
          setDonnees(data.results);
        } else {
          setDonnees([]);
        }
      }
      catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setError(error); // Définition de l'erreur dans le state
      }
    };

    fetchData();
  }, [Id]);




  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const yearOfBirth = parseInt(dateOfBirth.split('-')[0]); // Récupérer l'année de naissance et la convertir en nombre entier
    const age = today.getFullYear() - yearOfBirth;
    return age;
  };


  const handleBackPress = () => {
    navigation.goBack(); // Revenir à l'écran précédent
    return true; // Indiquer que l'événement a été géré
};

useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
        backHandler.remove(); // Supprimer l'écouteur lors du démontage du composant
    };
}, []); 


  return (
    <View style={[style.Container, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
      <View style={style.Contenu}>
        {donnees.map((item, index) => (
          <View key={index}>
            <View style={style.sexe}>
              <Text style={[{ fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}> {item.sexe === 'femme' ? (
                <Ionicons name="female" size={20} color={isDarkMode ? '#ffffff' : '#000000'} />
              ) : (
                <Ionicons name="male" size={20} color={isDarkMode ? '#ffffff' : '#000000'} />
              )}</Text>
              <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.sexe}</Text>
            </View>
            <View style={style.situation}>
              <Ionicons name="heart" size={20} color={isDarkMode ? '#ffffff' : '#000000'} />
              <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.situation}</Text>
            </View>
            <View style={style.d_naissance}>
              <Ionicons name="calendar" size={17} color={isDarkMode ? '#ffffff' : '#000000'} />
              <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{calculateAge(item.d_naissance)} ans</Text>
            </View>
            <View style={style.v_natale}>
              <Ionicons name="home" size={17} color={isDarkMode ? '#ffffff' : '#000000'} />
              <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>Habite à {item.v_natale}</Text>
            </View>
            <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.Objectif}</Text>

            <View>
              <Text style={style.TextLight}>Emploi</Text>
              <Text style={[style.esthic, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}> {item.nom_profession}	 </Text>
            </View>

            <View>
              <Text style={style.TextLight}>Etude</Text>
              <Text style={[style.esthic, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.nom_etude}</Text>
            </View>

            <View>
              <Text style={style.TextLight}>Centres et intérêt</Text>
            </View>


            <View>
              <Text style={style.TextLight}>Langue </Text>
              <Text style={[style.Langue, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.Langue}</Text>
            </View><View>
              <Text style={style.TextLight}>Centre_d_interet </Text>
              <Text style={[style.Langue, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.Centre_d_interet}</Text>
            </View>

            <View>
              <Text style={style.TextLight}>Signe astrologique</Text>
              <Text style={[style.Langue, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.Signe_Astrologie}</Text>
            </View>

            <View>
              <Text style={style.TextLight}>Mode de vie</Text>
              <Text style={[style.Langue, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>Alcool  {item.Alcool}</Text>
              <Text style={[style.Langue, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>Cigarette  {item.Cigarette}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}



const style = StyleSheet.create({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    height: 450,
  },
  Contenu: {
    width: '90%',
    flexDirection:'column',
    justifyContent:'flex-start',
  },
  sexe: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:-4,
    paddingBottom:5
  },
  situation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:-2,
    paddingBottom:5
  },
  d_naissance: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom:5
  },
  v_natale: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom:5
  },
  Notification:{
    marginLeft:10
  },
  TextLight: {
    color: 'grey',
    marginTop: 10,
    fontFamily: 'custom-fontmessage',

  },
  Langue: {
    fontSize: 12,

  },
  contenuLogo: {
    width: 120,
    height: 40,

  },
  Logo: {
    width: 120,
    height: 40,

  },
  porteurText: {
    marginTop: 10,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default AproposInterface;
