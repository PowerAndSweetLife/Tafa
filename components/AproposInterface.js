import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from './context/usercontexttheme';
import { useState, useEffect } from 'react';
import { useUser } from './context/usercontext';
import { BASE_URL } from "../helper/url";
import { useRoute } from '@react-navigation/native';
const logo = require('../assets/images/logo.png');
import loadFonts from './loadFonts';


function AproposInterface() {
  useEffect(() => {
    loadFonts();
  }, []);
  const route = useRoute();
  const userData = route.params.userData;

  const Id = userData && userData.Id ? userData.Id : 'defaultUserId';
  const { isDarkMode } = useTheme();
  const [donnees, setDonnees] = useState([]);

  useEffect(() => {
    fetch(BASE_URL + 'Apropos')
      .then(response => response.json())
      .then(data => {
        // Filtrer les données pour ne pas inclure l'utilisateur connecté
        console.log('donnerfiltre ', Id);
        const filteredData = data.filter(item => item.Id == Id);
        setDonnees(filteredData);
        console.log('donnerfiltre ', filteredData);

      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);

      });
  }, []);

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const yearOfBirth = parseInt(dateOfBirth.split('/')[2]); // Récupérer l'année de naissance et la convertir en nombre entier
    const age = today.getFullYear() - yearOfBirth;
    return age;
  };

  if (donnees.length < 3) {
    return (
      
      <View style={[style.Container, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
      
        <View style={style.Contenu}>
          {donnees.map((item, index) => (
            <View key={index}>
              <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.Sexe}</Text>
              <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.Situation}</Text>
              <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{calculateAge(item.Date_de_naissance)} ans</Text>
              <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>Habite a {item.Ville}</Text>

            </View>
          ))}
          <View style={[style.Containertextinfo, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
  <Text style={{ fontFamily: 'custom-fontmessage', fontSize: 15, fontWeight: 'light', marginRight: 10, color: isDarkMode ? '#ffffff' : '#000000' }} >Veuillez remplir vos informations !</Text>
</View>

          
          
        </View>
      </View>


    );
  }



  return (
    <View style={[style.Container, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
      <View style={style.Contenu}>
        {donnees.map((item, index) => (
          <View key={index}>
            <Text style={[style.Notification, {fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.Sexe}</Text>
            <Text style={[style.Notification, {fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.Situation}</Text>
            <Text style={[style.Notification, {fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{calculateAge(item.Date_de_naissance)} ans</Text>

            <Text style={[style.Notification, {fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>Habite a {item.Ville}</Text>
            <Text style={[style.Notification, {fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.Objectif}</Text>

            <View>
              <Text style={style.TextLight}>Emploi</Text>
              <Text style={[style.esthic, {fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}> {item.Emploi}	 </Text>
            </View>

            <View>
              <Text style={style.TextLight}>Etude</Text>
              <Text style={[style.esthic, {fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>Droit a l'unniversite d'antananarivo</Text>
            </View>

            <View>
              <Text style={style.TextLight}>Centres et intérêt</Text>
            </View>

            <View style={style.ContenuInteret}>
              {item.Centre_d_interet.split('/').map((Centre_d_interet, index) => (
                <Text key={index} style={[style.interet, {fontFamily: 'custom-font', color: isDarkMode ? '#000000' : '#ffffff' }]}>
                  {Centre_d_interet}
                </Text>
              ))}
            </View>

            <View>
              <Text style={style.TextLight}>Langues</Text>
            </View>

            <View>


              {item.Langue.split('/').map((langue, index) => (
                <Text key={index} style={[style.Langue, {fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>
                  {langue}
                </Text>
              ))}
            </View>

            <View>
              <Text style={style.TextLight}>Signe astrologique</Text>
              <Text style={[style.Langue, {fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.Signe_Astrologie}</Text>
            </View>

            <View>
              <Text style={style.TextLight}>Mode de vie</Text>
              <Text style={[style.Langue, {fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>Alcool : {item.Alcool}</Text>
              <Text style={[style.Langue, {fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>Cigarette : {item.Cigarette}</Text>
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
    height: 400,
  },
  Contenu: {
    width: '91%',
  },
  TextLight: {
    color: 'grey',
    marginTop: 10,
    fontFamily: 'custom-fontmessage',
  
  },
  ContenuInteret: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-around',
    left: -5,
  },
  interet: {
    backgroundColor: 'grey',
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
  },
  Langue: {
    fontSize: 12,

  },
  Containertextinfo: {
    width: '100%',
    height: 220,
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

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
   marginTop:10,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
},
});

export default AproposInterface;
