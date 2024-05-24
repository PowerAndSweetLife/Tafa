import React from "react";
import { View, Text, Pressable, StyleSheet, TextInput, Image } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from './context/usercontexttheme';
import { useUser } from './context/usercontext';
import { BASE_URL } from "../helper/url";
const logo = require('../assets/images/logo.png');

function AproposInterfacemodif() {
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessagevide1, setErrorMessagevide1] = useState('');
  const [errorMessagevide2, setErrorMessagevide2] = useState('');
  const [errorMessagevide3, setErrorMessagevide3] = useState('');
  const [errorMessagevide4, setErrorMessagevide4] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showInputLangue, setShowInputLangue] = useState(false);
  const { Monprofil } = useUser();
  const Id = Monprofil && Monprofil.id ? Monprofil.id : 'defaultUserId';
  const handlePressplusLangue = () => {
    setShowInputLangue(true);
  };
  const handlePressplus = () => {
    setShowInput(true);
  };

  const [LangueValue, setCombinedValue] = useState('');
  const [Centre_d_interetValue, setCombinedCentre_d_interetValue] = useState('');
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();



  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');
  const [inputValue5, setInputValue5] = useState('');
  const [inputValue14, setInputValue14] = useState('');
  const [inputValue15, setInputValue15] = useState('');
  const [inputValue6, setInputValue6] = useState('');

  const [inputValue7, setInputValue7] = useState('');
  const [inputValue8, setInputValue8] = useState('');
  const [inputValue9, setInputValue9] = useState('');
  const [inputValue17, setInputValue17] = useState('');
  const [inputValue10, setInputValue10] = useState('');
  const [inputValue16, setInputValue16] = useState('');
  const [inputValue11, setInputValue11] = useState('');
  const [inputValue12, setInputValue12] = useState('');
  const [inputValue13, setInputValue13] = useState('');


  const handlePress = async () => {
    if (
      !inputValue1 ||
      !inputValue2 ||
      !inputValue3

    ) {
      setErrorMessagevide1("Veuillez remplir tous les champs.");
      return; // Sortir de la fonction si un champ est vide
    }

    const res = await fetch(BASE_URL + 'modificationInformationgenerale', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Nom: inputValue1,
        Sexe: inputValue2,
        Situation: inputValue3,
        Id: Id,
      }),
    });
    if (res.ok) {
      console.log('nety')
      setInputValue1('');
      setInputValue2('');
      setInputValue3('');

    }
    else {
      console.log('tsy nety')
    }
  };
  useEffect(() => {

    let newValue;
    if (inputValue17) {
      newValue = `${inputValue9}/${inputValue17}`;
    } else {
      newValue = inputValue9;
    }
    setCombinedCentre_d_interetValue(newValue);
  }, [inputValue9, inputValue17]);

  useEffect(() => {

    let newValue;
    if (inputValue16) {
      newValue = `${inputValue10}/${inputValue16}`;
    } else {
      newValue = inputValue10;
    }
    setCombinedValue(newValue);
  }, [inputValue10, inputValue16]);

  const handlePress1 = async () => {
    if (
      !inputValue7 ||
      !inputValue8 ||
      !inputValue9 ||
      !inputValue10


    ) {
      setErrorMessagevide3("Veuillez remplir tous les champs.");
      return; // Sortir de la fonction si un champ est vide
    }

    const res = await fetch(BASE_URL + 'modification', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Emploi: inputValue7,
        Etudes: inputValue8,
        Centre_d_interet: Centre_d_interetValue,
        Langue: LangueValue,
        Id: Id,
      }),
    });
    if (res.ok) {
      console.log('nety')
      setInputValue7('');
      setInputValue8('');
      setInputValue9('');
      setInputValue10('');
      setInputValue16('');
      setInputValue17('')
    }
    else {
      console.log('tsy nety')
    }

  };




  const handlePress2 = async () => {
    if (
      !inputValue11 ||
      !inputValue12 ||
      !inputValue13

    ) {
      setErrorMessagevide4("Veuillez remplir tous les champs.");
      return; // Sortir de la fonction si un champ est vide
    }
    if (inputValue12 == inputValue13) {
      const res = await fetch(BASE_URL + 'ModificationMotdepasse', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Ancien_mot_de_passe: inputValue11,
          Nouveau_mot_de_passe: inputValue12,
          Confirmez_votre_mot_de_passe: inputValue13,
          Id: Id,
        }),
      });
      if (res.ok) {
        console.log('nety')
        setInputValue11('');
        setInputValue12('');
        setInputValue13('');

      }
      else {
        console.log('tsy nety')
      }
    } else {
      setErrorMessage("Les mots de passe ne correspondent pas.")
    }
  };

  const handlePress3 = async () => {
    if (
      
      !inputValue5 ||
      !inputValue6 ||
      !inputValue14 ||
      !inputValue15
    ) {
      setErrorMessagevide2("Veuillez remplir tous les champs.");
      return; // Sortir de la fonction si un champ est vide
    }

    const res = await fetch(BASE_URL + 'modificationInformationgeneralepartie2', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        
        Signe_Astrologie: inputValue5,
        Objectif: inputValue6,
        Alcool: inputValue14,
        Cigarette: inputValue15,
        Id: Id,
      }),
    });
    if (res.ok) {
      console.log('nety')
      setInputValue4('');
      setInputValue5('');
      setInputValue6('');
      setInputValue14('');
      setInputValue15('');
    }
    else {
      console.log('tsy nety')
    }
  };
  const [donnees, setDonnees] = useState([]);
  useEffect(() => {
    fetch(BASE_URL + 'users')
        .then(response => response.json())
        .then(data => {
            // Filtrer les données pour ne pas inclure l'utilisateur connecté
            const filteredData = data.filter(item => item.id == Id);
            setDonnees(filteredData);
            console.log('res=cus', donnees);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);

        });

}, []);


  return (


    <View style={style.Container}>

<View style={style.profil}>
      {donnees.map(item => (
        <View key={item.Id} style={style.profil}>
          <View style={style.porteurimage} key={item.id}>
            <Image
              source={item.photo ? { uri: BASE_URL + item.photo } : defaultAvatar(item.sexe)}
              style={style.image}
            />
          </View>
          <View style={style.porteurNom}>
            <Text style={{ fontFamily: 'custom-font', fontSize: 25, fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>
              {item.pseudo}, {item.firstname}
            </Text>
          </View>
          <View style={style.porteurText}>
            <Text style={{ fontFamily: 'custom-font', fontSize: 20, fontWeight: 'bold', marginRight: 10, color: isDarkMode ? '#f94990' : '#f94990' }} >Tafa</Text>
            <Text style={{ fontFamily: 'custom-fontmessage', fontSize: 15, fontWeight: 'light', marginRight: 10, color: isDarkMode ? '#ffffff' : '#000000' }} >Permet de Vous Rencontrer</Text>
          </View>
        </View>
      ))}
    </View>
 


      <View style={[style.Modif1, {
        backgroundColor: isDarkMode ? '#000000' : '#ffffff',
        borderColor: isDarkMode ? '#79328d' : 'lightgrey',
      }]}>
        <View style={style.Suit}>
          <Text style={[style.Title, { color: isDarkMode ? '#ffffff' : '#000000' }]}>Informations générales</Text>
        </View>


        <View>

          <View style={style.AncienMdpContenu}>
            <Ionicons name="person" size={20}
              color={isDarkMode ? '#79328d' : 'lightgrey'}
            />
            <Text style={[style.Context, { color: isDarkMode ? '#ffffff' : '#000000' }]}>Nom</Text>
          </View>

          <View>
            <TextInput
              style={{ height: 30, borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, borderColor: isDarkMode ? '#79328d' : 'gray', color: isDarkMode ? 'white' : 'black', }}
              onChangeText={(text) => setInputValue1(text)}
              value={inputValue1}
              placeholder="Votre Nom..."
              placeholderTextColor={isDarkMode ? 'white' : 'gray'}

            />
          </View>
        </View>



        <View>
          <View>
            <View style={style.AncienMdpContenu}>
              <Ionicons name="male-female" size={20} color={isDarkMode ? '#79328d' : 'lightgrey'} />
              <Text style={[style.Context, { color: isDarkMode ? '#ffffff' : '#000000' }]}>Sexe</Text>
            </View>
            <View>
              <TextInput
                style={{ height: 30, borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, borderColor: isDarkMode ? '#79328d' : 'gray', color: isDarkMode ? 'white' : 'black', }}
                onChangeText={(text) => setInputValue2(text)}
                value={inputValue2}
                placeholder="Sexe..."
                placeholderTextColor={isDarkMode ? 'white' : 'gray'}
              />
            </View>
          </View>
        </View>



        <View>
          <View>
            <View style={style.AncienMdpContenu}>
              <Ionicons name="heart" size={20} color={isDarkMode ? '#79328d' : 'lightgrey'} />
              <Text style={[style.Context, { color: isDarkMode ? '#ffffff' : '#000000' }]}>Situation</Text>
            </View>
            <View>
              <TextInput
                style={{ height: 30, borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, borderColor: isDarkMode ? '#79328d' : 'gray', color: isDarkMode ? 'white' : 'black', }}
                onChangeText={(text) => setInputValue3(text)}
                value={inputValue3}
                placeholder="Votre Situation..."
                placeholderTextColor={isDarkMode ? 'white' : 'gray'}
              />
              {errorMessagevide1 !== '' && (
                <Text style={{ color: 'red', marginLeft: 15 }}>{errorMessagevide1}</Text>
              )}
            </View>
          </View>
          <View style={style.ModifierContenu}>
            <Pressable onPress={handlePress} style={({ pressed }) => [
              style.Modifier,
              {
                backgroundColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : 'white'),
                borderColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : '#07668f'),
              },
            ]}>
              <Text style={{ fontSize: 12, color: isDarkMode ? 'white' : '#07668f', fontFamily: 'custom-fontmessage', }}>Modifier</Text>
            </Pressable>

          </View>
        </View>

      </View>



      <View style={[style.Modif4, {
        backgroundColor: isDarkMode ? '#000000' : '#ffffff',
        borderColor: isDarkMode ? '#79328d' : 'lightgrey',
      }]}>
       



        <View>
          <View style={style.AncienMdpContenu}>
            <Ionicons name="ios-planet" size={20} color={isDarkMode ? '#79328d' : 'lightgrey'} />
            <Text style={[style.Context, { color: isDarkMode ? '#ffffff' : '#000000' }]}>Signe Astrologie</Text>
          </View>
          <View>
            <TextInput
              style={{ height: 30, borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, borderColor: isDarkMode ? '#79328d' : 'gray', color: isDarkMode ? 'white' : 'black', }}
              onChangeText={(text) => setInputValue5(text)}
              value={inputValue5}
              placeholder="Signe Astrologie..."
              placeholderTextColor={isDarkMode ? 'white' : 'gray'}
            />
          </View>
        </View>






        <View>
          <View style={style.AncienMdpContenu}>
            <Ionicons name="flag" size={20} color={isDarkMode ? '#79328d' : 'lightgrey'} />
            <Text style={[style.Context, { color: isDarkMode ? '#ffffff' : '#000000' }]}>Objectif</Text>
          </View>
          <View>
            <TextInput
              style={{ height: 70, borderWidth: 1, margin: 10, padding: 5, borderRadius: 10, borderColor: isDarkMode ? '#79328d' : 'gray', color: isDarkMode ? 'white' : 'black', }}
              onChangeText={(text) => setInputValue6(text)}
              value={inputValue6}
              placeholder="Votre Oblectif..."
              placeholderTextColor={isDarkMode ? 'white' : 'gray'}
            />
          </View>
        </View>





        <View style={style.modedevieContenu}>
          
          <View style={style.AncienMdpContenu}>
            <Ionicons name="happy" size={20} color={isDarkMode ? '#79328d' : 'lightgrey'} />
            <Text style={[style.Context, { color: isDarkMode ? '#ffffff' : '#000000', }]} >Mode de vie :</Text>
          </View>




            <View>
          <View style={style.AncienMdpContenu}>
            <Ionicons name="business" size={20} color={isDarkMode ? '#79328d' : 'lightgrey'} />
            <Text style={[style.Context, { color: isDarkMode ? '#ffffff' : '#000000' }]} >Alcool</Text>
          </View>
          <View>
            <TextInput
              style={{ height: 30, borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, borderColor: isDarkMode ? '#79328d' : 'gray', color: isDarkMode ? 'white' : 'black', }}
              onChangeText={(text) => setInputValue14(text)}
              value={inputValue14}
              placeholder="Alcool..."
              placeholderTextColor={isDarkMode ? 'white' : 'gray'}
            />
          </View>
        </View>



         <View>
          <View style={style.AncienMdpContenu}>
            <Ionicons name="business" size={20} color={isDarkMode ? '#79328d' : 'lightgrey'} />
            <Text style={[style.Context, { color: isDarkMode ? '#ffffff' : '#000000' }]} >Cigarette</Text>
          </View>
          <View>
            <TextInput
              style={{ height: 30, borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, borderColor: isDarkMode ? '#79328d' : 'gray', color: isDarkMode ? 'white' : 'black', }}
              onChangeText={(text) => setInputValue15(text)}
              value={inputValue15}
              placeholder="Cigarette..."
              placeholderTextColor={isDarkMode ? 'white' : 'gray'}
            />
             {errorMessagevide2 !== '' && (
                <Text style={{ color: 'red', marginLeft: 15 }}>{errorMessagevide2}</Text>
              )}
          </View>
        </View>











          <View style={style.ModifierContenu}>
            <Pressable onPress={handlePress3} style={({ pressed }) => [
              style.Modifier,
              {
                backgroundColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : 'white'),
                borderColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : '#07668f'),
              },
            ]}>
              <Text style={{ fontFamily: 'custom-fontmessage',fontSize: 12, color: isDarkMode ? 'white' : '#07668f'}}>Modifier</Text>
            </Pressable>

          </View>
        </View>
      </View>












      <View style={[style.Modif2, {
        backgroundColor: isDarkMode ? '#000000' : '#ffffff',
        borderColor: isDarkMode ? '#79328d' : 'lightgrey',
      }]}>
        <View style={style.Suit}>
          <Text style={[style.Title, { color: isDarkMode ? '#ffffff' : '#000000' }]} >Emploi et Études</Text>
        </View>


        <View>

          <View style={style.AncienMdpContenu}>
            <Ionicons name="school" size={20} color={isDarkMode ? '#79328d' : 'lightgrey'} />
            <Text style={[style.Context, { color: isDarkMode ? '#ffffff' : '#000000' }]}> Emploi </Text>
          </View>

          <View>
            <TextInput
              style={{ height: 30, borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, borderColor: isDarkMode ? '#79328d' : 'gray', color: isDarkMode ? 'white' : 'black', }}
              onChangeText={(text) => setInputValue7(text)}
              value={inputValue7}
              placeholder="Votre Emploi..."
              placeholderTextColor={isDarkMode ? 'white' : 'gray'}
            />
          </View>
        </View>



        <View>
          <View>
            <View style={style.AncienMdpContenu}>
              <Ionicons name="school" size={20} color={isDarkMode ? '#79328d' : 'lightgrey'} />
              <Text style={[style.Context, { color: isDarkMode ? '#ffffff' : '#000000' }]}> Études</Text>
            </View>
            <View>
              <TextInput
                style={{ height: 30, borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, borderColor: isDarkMode ? '#79328d' : 'gray', color: isDarkMode ? 'white' : 'black', }}
                onChangeText={(text) => setInputValue8(text)}
                value={inputValue8}
                placeholder="Votre Etude..."
                placeholderTextColor={isDarkMode ? 'white' : 'gray'}
              />
            </View>
          </View>
        </View>



        <View>
          <View>
            <View style={style.AncienMdpContenu}>
              <Ionicons name="calendar" size={20} color={isDarkMode ? '#79328d' : 'lightgrey'} />
              <Text style={[style.Context, { color: isDarkMode ? '#ffffff' : '#000000' }]}> Centre d'intéret </Text>
            </View>
            <View>
              <TextInput
                style={{ height: 30, borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, borderColor: isDarkMode ? '#79328d' : 'gray', color: isDarkMode ? 'white' : 'black', }}
                onChangeText={(text) => setInputValue9(text)}
                value={inputValue9}
                placeholder="Type something..."
                placeholderTextColor={isDarkMode ? 'white' : 'gray'}
              />
             <Pressable onPress={handlePressplus} style={style.ajouteinput}>
        {({ pressed }) => (
          <Ionicons name="add-circle" size={25} color={isDarkMode ? '#f94990' : '#f94990'} />
        )}
      </Pressable>
      {showInput && (
        <TextInput
          style={{ height: 30, borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, borderColor: isDarkMode ? '#79328d' : 'gray', color: isDarkMode ? 'white' : 'black', }}
          placeholder="Autre ...."
          placeholderTextColor={isDarkMode ? 'white' : 'gray'}
          onChangeText={(text) => setInputValue17(text)}
          value={inputValue17}
        />
      )}
            </View>
          </View>
        </View>



        <View>
          <View style={style.AncienMdpContenu}>
            <Ionicons name="text" size={20} color={isDarkMode ? '#79328d' : 'lightgrey'} />
            <Text style={[style.Context, { color: isDarkMode ? '#ffffff' : '#000000' }]}>  Langue </Text>
          </View>
          <View>
            <TextInput
              style={{ height: 30, borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, borderColor: isDarkMode ? '#79328d' : 'gray', color: isDarkMode ? 'white' : 'black', }}
              onChangeText={(text) => setInputValue10(text)}
              value={inputValue10}
              placeholder="Langue..."
              placeholderTextColor={isDarkMode ? 'white' : 'gray'}
            />
            <Pressable onPress={handlePressplusLangue} style={style.ajouteinput}>
              {({ pressed }) => (
                <Ionicons name="add-circle" size={25} color={isDarkMode ? '#f94990' : '#f94990'} />
              )}
            </Pressable>
            {showInputLangue && (
              <TextInput
                style={{ height: 30, borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, borderColor: isDarkMode ? '#79328d' : 'gray', color: isDarkMode ? 'white' : 'black', }}
                placeholder="Autre ...."
                onChangeText={(text) => setInputValue16(text)}
                value={inputValue16}

              />
            )}
             {errorMessagevide3 !== '' && (
                <Text style={{ color: 'red', marginLeft: 15 }}>{errorMessagevide3}</Text>
              )}
          </View>
        </View>




        <View style={style.ModifierContenu}>
          <Pressable onPress={handlePress1} style={({ pressed }) => [
            style.Modifier,
            {
              backgroundColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : 'white'),
              borderColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : '#07668f'),
            },
          ]}>
            <Text style={{ fontSize: 12, color: isDarkMode ? 'white' : '#07668f', fontFamily: 'custom-fontmessage',}}>Modifier</Text>
          </Pressable>

        </View>
      </View>


      <View style={[style.Modif3, {
        backgroundColor: isDarkMode ? '#000000' : '#ffffff',
        borderColor: isDarkMode ? '#79328d' : 'lightgrey',
      }]}>

        <View style={style.Suit}>
          <Text style={[style.Title, { color: isDarkMode ? '#ffffff' : '#000000' }]}>Mot de passe</Text>
        </View>



        <View>

          <View style={style.AncienMdpContenu}>
            <Ionicons name="person" size={20} color={isDarkMode ? '#79328d' : 'lightgrey'} />
            <Text style={[style.Context, { color: isDarkMode ? '#ffffff' : '#000000' }]}> Ancien mot de passe </Text>
          </View>

          <View>
            <TextInput
              style={{ height: 30, borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, borderColor: isDarkMode ? '#79328d' : 'gray', color: isDarkMode ? 'white' : 'black', }}
              onChangeText={(text) => setInputValue11(text)}
              value={inputValue11}
              placeholder="mot de passe..."
              placeholderTextColor={isDarkMode ? 'white' : 'gray'}
            />
          </View>
        </View>
        <View>

          <View>

            <View style={style.AncienMdpContenu}>
              <Ionicons name="key" size={20} color={isDarkMode ? '#79328d' : 'lightgrey'} />
              <Text style={[style.Context, { color: isDarkMode ? '#ffffff' : '#000000' }]}>  Nouveau mot de passe  </Text>
            </View>

            <View>
              <TextInput
                style={{ height: 30, borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, borderColor: isDarkMode ? '#79328d' : 'gray', color: isDarkMode ? 'white' : 'black', }}
                onChangeText={(text) => setInputValue12(text)}
                value={inputValue12}
                placeholder="Nouveau Mot de passe..."
                placeholderTextColor={isDarkMode ? 'white' : 'gray'}
              />
            </View>
          </View>
        </View>

        <View>


          <View>

            <View style={style.AncienMdpContenu}>
              <Ionicons name="lock-closed" size={20} color={isDarkMode ? '#79328d' : 'lightgrey'} />
              <Text style={[style.Context, { color: isDarkMode ? '#ffffff' : '#000000' }]}> Confirmez votre mot de passe  </Text>
            </View>

            <View>
              <TextInput
                style={{ height: 30, borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, borderColor: isDarkMode ? '#79328d' : 'gray', color: isDarkMode ? 'white' : 'black', }}
                onChangeText={(text) => setInputValue13(text)}
                value={inputValue13}
                placeholder="Confirmer ..."
                placeholderTextColor={isDarkMode ? 'white' : 'gray'}
              />
              {errorMessage !== '' && (
                <Text style={{ color: 'red', marginLeft: 15 }}>{errorMessage}</Text>
              )}
              {errorMessagevide4 !== '' && (
                <Text style={{ color: 'red', marginLeft: 15 }}>{errorMessagevide4}</Text>
              )}
            </View>
          </View>
        </View>



        <View style={style.ModifierContenu}>
          <Pressable onPress={handlePress2} style={({ pressed }) => [
            style.Modifier,
            {
              backgroundColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : 'white'),
              borderColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : '#07668f'),
            },
          ]}>
            <Text style={{ fontSize: 12, color: isDarkMode ? 'white' : '#07668f', fontFamily: 'custom-fontmessage', }}>Modifier</Text>
          </Pressable>

        </View>

      </View>






    </View>






  );
}
const style = StyleSheet.create({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    // height:660,
  },
  scrollView: {
    flex: 1,
  },


  Suit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  AncienMdpContenu: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  AncienMdpContenu2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

  },
  Title: {
    fontSize: 17,
  //  fontWeight: 'bold',
    left: 15,
    paddingBottom: 20,
    fontFamily: 'nomrencotre-font',
  },
  ModifierContenu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 10,

  },
  Modifier: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#07668f',
    width: 90,
    height: 25,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#07668f',


  },
  Modif1: {

    marginTop: 20,
    width: '97%',
    height: 300,
    marginLeft: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: 'lightgrey',


  },
  Modif2: {
    marginTop: 20,
    width: '97%',
    height: 450,
    marginLeft: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    marginRight: 5,
  },
  Modif3: {

    marginTop: 20,
    width: '97%',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    marginLeft: 5,
  },
  Modif4: {
    marginTop: 20,
    width: '97%',
    height: 450,
    marginLeft: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: 'lightgrey',

  },
  Context: {
    fontSize: 11,
    fontFamily: 'custom-fontmessage', 
  },
  modedevieContenu: {

   // paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  ajouteinput: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  Containertextinfo: {
    width: '100%',
    height: 100,
        display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  top:-20,
  },
  contenuLogo: {
    width: 120,
    height: 40,

  },
  Logo: {
    width: 120,
    height: 40,

  },
  profil: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
},
porteurimage: {
    width: 100,
    height: 100,
    borderRadius: 50,

    borderColor: 'grey',
    //  marginTop: -100,
},
porteurNom: {
  width: 300,
  height: 30,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
},
porteurText: {
  width: 300,
  height: 30,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
},
image: {
  width: 100,
  height: 100,
  borderRadius: 50,
},
});

export default AproposInterfacemodif;
