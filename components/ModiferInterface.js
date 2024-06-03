import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useTheme } from './context/usercontexttheme';
import { useState, useEffect } from 'react';
import { useUser } from './context/usercontext';
import { BASE_URL } from "../helper/url";
import loadFonts from './loadFonts';
import { useNavigation } from '@react-navigation/native';

function ModiferInterface() {
  const navigation = useNavigation();
  useEffect(() => {
    loadFonts();
  }, []);
  const { Monprofil } = useUser();
  const Id = Monprofil && Monprofil.id ? Monprofil.id : 'defaultUserId';
  const { isDarkMode } = useTheme();
  const [donnees, setDonnees] = useState([]);





  const onPressModifier = () => {
    navigation.navigate('Modification');
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL + 'Apropos', {
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
    const [year, month, day] = dateOfBirth.split('-').map(part => parseInt(part));
    const birthDate = new Date(year, month - 1, day);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
  
    
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
  
    return age;
  };
  
  console.log('donner', donnees);
  console.log("Longueur de donnees :", donnees.length); 
  if (donnees.filter(item => Object.values(item).some(value => !value)).length > 0) {
    return (
      
      <View style={[style.Container, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
      
        <View style={style.Contenu}>
          {donnees.map((item, index) => (
            <View key={index}>
              <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.sexe}</Text>
              <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.situation}</Text>
              <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{calculateAge(item.d_naissance)} ans</Text>
              <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>Habite a {item.v_natale}</Text>

            </View>
          ))}
          <View style={[style.Containertextinfo, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
  <Text style={{ fontFamily: 'custom-fontmessage', fontSize: 15, fontWeight: 'light', marginRight: 10, color: isDarkMode ? '#ffffff' : '#000000' }} >Veuillez remplir vos informations !</Text>
</View>

          
          <View style={style.ContenuBtn} >
            <View style={style.Btn} >
              <Pressable
              onPress={onPressModifier}
              //   onPress={onPressApropos}
                style={({ pressed }) => [
                  style.apropos0,
               //     currentInterface === "Apropos",
                  {
                    backgroundColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : '#07668f'),
                    borderColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : '#07668f'),
                  },
                ]}
              >
                <Text style={[style.TExtAproposPHoto, { fontFamily: 'custom-fontmessage', color: isDarkMode ? 'white' : 'white' }]}>Modifier</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>


    );
  }else{
  return (
    <View style={[style.Container, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
      <View style={style.Contenu}>
        {donnees.map((item, index) => (
          <View key={index}>
            <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.sexe}</Text>
            <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.situation}</Text>
            <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{calculateAge(item.d_naissance)} ans</Text>

            <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>Habite a {item.v_natale}</Text>
            <Text style={[style.Notification, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.objectif}</Text>

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

            <View style={style.ContenuInteret}>
              {item.Centre_d_interet.split('/').map((Centre_d_interet, index) => (
                <Text key={index} style={[style.interet, { fontFamily: 'custom-font', color: isDarkMode ? '#000000' : '#ffffff' }]}>
                  {Centre_d_interet}
                </Text>
              ))}
            </View>

            <View>
              <Text style={style.TextLight}>Langues</Text>
            </View>

            <View>


              {item.Langue.split('/').map((langue, index) => (
                <Text key={index} style={[style.Langue, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>
                  {langue}
                </Text>
              ))}
            </View>

            <View>
              <Text style={style.TextLight}>Signe astrologique</Text>
              <Text style={[style.Langue, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.Signe_Astrologie}</Text>
            </View>

            <View>
              <Text style={style.TextLight}>Mode de vie</Text>
              <Text style={[style.Langue, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>Alcool : {item.Alcool}</Text>
              <Text style={[style.Langue, { fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>Cigarette : {item.Cigarette}</Text>
            </View>
            
          </View>
    
    ))}
          <View style={style.ContenuBtn1} >
            <View style={style.Btn} >
              <Pressable
              onPress={onPressModifier}
              //   onPress={onPressApropos}
                style={({ pressed }) => [
                  style.apropos0,
               //     currentInterface === "Apropos",
               {
                backgroundColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : 'white'),
                borderColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') :( pressed ? '#f94990' : '#07668f'),
              },
                ]}
              >
                <Text style={[style.TExtAproposPHoto,{ fontFamily: 'custom-fontmessage',color: isDarkMode ? 'white' : '#07668f' }]}>Modifier</Text>
              </Pressable>
            </View>
          </View>
      </View>
    </View>
  );
}
}
const style = StyleSheet.create({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    height: 400,
    marginTop: 20,
  },
  Contenu: {
    width: '91%',

  },
  TextLight: {
    color: 'lightgrey',
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
    backgroundColor: 'lightgrey',
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
    height: 50,
        display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 10,
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
  ContenuBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 10,
  },
  ContenuBtn1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    //marginTop: 10,
  },
  apropos0: {
    width: 120,
    height: 22,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 8,
    backgroundColor: "grey",
    //left: -4,
    borderWidth: 1,
  },
  TExtAproposPHoto: {
    fontSize: 12,
  },
});

export default ModiferInterface;
