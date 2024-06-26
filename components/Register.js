import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { BASE_URL } from "../helper/url";
import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'
import * as Font from 'expo-font'
import loadFonts from './loadFonts';
import Modal from 'react-native-modal';




function Register() {
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessageModal, setErrorMessageModal] = useState("");
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'modal-font': require('../assets/Fonts/Montserrat-Bold.ttf'),
        'custom-fontmessage': require('../assets/Fonts/Montserrat-Regular.ttf'),
        'custom-fontmessageBold': require('../assets/Fonts/Montserrat-Bold.ttf')
      });
      setIsFontLoaded(true); // Mettre à jour l'état pour indiquer que la police est chargée
    };
    loadFonts();
  }, []);
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCofirmationVisible, setIsConfirmationVisible] = useState(false);
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessagepseudo, setErrorMessagepseudo] = useState("");
  const [errorMessageemail, setErrorMessageemail] = useState("");
   const [errorMessageAnnee,  setErrorMessageAnnee] = useState("");
  const [inputDate, setInputDate] = React.useState(undefined)
  const onPressCOnnexion = () => {
    navigation.navigate('COnnexion');
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleConfirmationVisibility = () => {
    setIsConfirmationVisible(!isCofirmationVisible);
  };
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');
  const [inputValue5, setInputValue5] = useState('');
  const [inputValue6, setInputValue6] = useState('');
  const [inputValueJour, setInputValueJour] = useState('');
  const [inputValueMois, setInputValueMois] = useState('');
  const [inputValueAnnee, setInputValueAnnee] = useState('');
  const [inputValue8, setInputValue8] = useState('');
  const [inputValue9, setInputValue9] = useState('');
  const [inputValue10, setInputValue10] = useState('');
  const handleEnregistrement = async () => {
    if (
      !inputValue1 ||
      !inputValue2 ||
      !inputValue3 ||
      !inputValue4 ||
      !inputValue5 ||
      !inputValue6 ||
      !inputValueJour ||
      !inputValueMois ||
      !inputValueAnnee ||
      !inputValue8 ||
      !inputValue9 ||
      !inputValue10
    ) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return; // Sortir de la fonction si un champ est vide
    }
    

  // Vérifier si inputValueAnnee est une année valide (nombre à 4 chiffres)
  const isValidYear = /^\d{4}$/.test(inputValueAnnee);
  if (!isValidYear) {
    setErrorMessageAnnee("Veuillez entrer une année valide.");
    return;
  }

  // Vérifier si l'année est dans la plage spécifiée (1950 à 2008)
  const year = parseInt(inputValueAnnee, 10);
  if (year < 1950 || year > 2008) {
    setErrorMessageAnnee("Veuillez entrer une année exacte.");
    return;
  }


    const age = new Date().getFullYear() - inputValueAnnee;
    if (age < 18) {
      setErrorMessageModal("Vous devez avoir plus de 18 ans pour vous  ");
      setIsErrorModalVisible(true);
      return;
    }




    const dateNaissance = `${inputValueAnnee}-${inputValueMois}-${inputValueJour}`;
    try {
      // Récupérer toutes les données utilisateurs
      const response = await fetch(BASE_URL + 'users');
      const userData = await response.json();

      // Vérifier si un utilisateur avec le même pseudo existe déjà
      const userExistsWithPseudo = userData.some(user => user.pseudo === inputValue3);
      // Vérifier si un utilisateur avec le même email existe déjà
      const userExistsWithEmail = userData.some(user => user.email === inputValue4);

      if (userExistsWithPseudo) {
        setErrorMessagepseudo("Ce pseudo est déjà utilisé par un autre utilisateur.");
      } else if (userExistsWithEmail) {
        setErrorMessageemail("Cet email est déjà utilisé par un autre utilisateur.");
      } else {
        // Envoyer les données pour l'insertion
        const res = await fetch(BASE_URL + 'Insertion', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Nom: inputValue1,
            Prenom: inputValue2,
            Pseudo: inputValue3,
            Email: inputValue4,
            Ville: inputValue10,
            Sexe: inputValue5,
            Situation: inputValue6,
            Date_de_naissance: dateNaissance,
            Mots_de_passe: inputValue8,
            //Confirmation: inputValue9,
          }),
        });

        if (inputValue8 !== inputValue9) {
          setErrorMessage('Les mots de passe ne correspondent pas.');
        } else {
          // Réinitialiser l'erreur lorsque les mots de passe correspondent
          setErrorMessage('');
          // Naviguer vers l'accueil
          navigation.navigate('COnnexion');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };




  const [selected, setSelected] = React.useState("");
  const Sexe = [
    { key: '1', value: 'Homme' },
    { key: '2', value: 'Femme' },

  ];




  const Situation = [
    { key: '1', value: 'Célibataire' },
    { key: '2', value: 'Marié(e)' },
    { key: '3', value: 'Divorcé(e)' },
    { key: '4', value: 'Veuf(ve)' },
  ];




  const Jour = [];

  for (let i = 1; i <= 31; i++) {
    Jour.push({ key: i.toString(), value: i.toString() });
  }



  const Mois = [
    { key: '1', value: '01' },
    { key: '2', value: '02' },
    { key: '3', value: '03' },
    { key: '4', value: '04' },
    { key: '5', value: '05' },
    { key: '6', value: '06' },
    { key: '7', value: '07' },
    { key: '8', value: '08' },
    { key: '9', value: '09' },
    { key: '10', value: '10' },
    { key: '11', value: '11' },
    { key: '12', value: '12' }
  ];







  const formatSelectedDate = (jour, mois, année) => {
    // Assurez-vous que jour, mois et année sont définis
    if (jour && mois && année) {
      // Concaténer les valeurs dans le format désiré
      return `${jour}/${mois}/${année}`;
    } else {
      // Si l'une des valeurs est manquante, retourner une chaîne vide
      return '';
    }
  }
  const handleDateSelection = (jour, mois, année) => {
    const selectedDate = formatSelectedDate(jour, mois, année);
    setSelected(selectedDate);

    setInputValueJour(jour);
    setInputValueMois(mois);
    setInputValueAnnee(année);
  }

  const logo = require('../assets/images/logo.png');
  return (
    <ScrollView>
      <View style={style.BoxContainer}>
        <View style={style.soouscontainer}>

          <View style={style.boxHeader}>
            <Image style={style.logo} source={logo}></Image>
          </View>

          <View style={{ margin: 10, top: 5 }}>
            <Text style={[style.textRegister, { fontFamily: isFontLoaded ? 'modal-font' : null }]}>Inscription</Text>
          </View>

          <View style={{ top: 10 }}>
            <View style={style.boxBody}>
              <Text style={[style.text, { fontFamily: isFontLoaded ? 'custom-fontmessage' : null }]}>Nom :</Text>
              <TextInput
                placeholder="Nom "
                style={style.TextInput}
                onChangeText={(text) => setInputValue1(text)}
                value={inputValue1}
              />
            </View>


            <View style={style.boxBody}>
              <Text style={[style.text, { fontFamily: isFontLoaded ? 'custom-fontmessage' : null }]}>Prénom(s) :</Text>
              <TextInput
                placeholder="Prenom "
                style={style.TextInput}
                onChangeText={(text) => setInputValue2(text)}
                value={inputValue2}
              />
            </View>


            <View style={style.boxBody}>
              <Text style={[style.text, { fontFamily: isFontLoaded ? 'custom-fontmessage' : null }]}>Pseudo :</Text>
              <TextInput
                placeholder="Pseudo... "
                style={[
                  style.TextInput,
                  errorMessagepseudo && style.errorInput // Appliquer le style d'erreur si errorMessageemail est défini
                ]}
                onChangeText={(text) => setInputValue3(text)}
                value={inputValue3}
              />
              {errorMessagepseudo ? <Text style={style.error}>{errorMessagepseudo}</Text> : null}
            </View>

            <View style={style.boxBody}>
              <Text style={[style.text, { fontFamily: isFontLoaded ? 'custom-fontmessage' : null }]}>Email :</Text>
              <TextInput
                placeholder="email... "
                style={[
                  style.TextInput,
                  errorMessageemail && style.errorInput // Appliquer le style d'erreur si errorMessageemail est défini
                ]}
                onChangeText={(text) => setInputValue4(text)}
                value={inputValue4}
              />

              {errorMessageemail ? <Text style={style.error}>{errorMessageemail}</Text> : null}
            </View>

            <View style={style.boxBody}>
              <Text style={[style.text, { fontFamily: isFontLoaded ? 'custom-fontmessage' : null }]}>Ville :</Text>
              <TextInput
                placeholder="Ville "
                style={style.TextInput}
                onChangeText={(text) => setInputValue10(text)}
                value={inputValue10}
              />
            </View>

            <View style={style.boxBody}>
              <Text style={[style.text, { fontFamily: isFontLoaded ? 'custom-fontmessage' : null }]}>Sexe :</Text>
              <View style={style.InputSexe}>
                <View style={style.datePickerItemSexe}>
                  <SelectList
                    setSelected={(val) => {
                      setSelected(val);
                      setInputValue5(val);
                    }}
                    onChangeText={(text) => setInputValue5(text)}
                    data={Sexe}
                    save="value"
                    value={inputValue5}
                    placeholder="Sexe... "
                    search={false}
                    boxStyles={style.TextInput}
                    placeholderStyle={style.placeholderStyle}
                  />
                </View>
              </View>
            </View>

            <View style={style.boxBody}>
              <Text style={[style.text, { fontFamily: isFontLoaded ? 'custom-fontmessage' : null }]}>Situation :</Text>
              <View style={style.InputSituation}>
                <View style={style.datePickerItemSituation}>
                  <SelectList
                    setSelected={(val) => {
                      setSelected(val);
                      setInputValue6(val);
                    }}
                    onChangeText={(text) => setInputValue5(text)}
                    data={Situation}
                    save="value"
                    value={inputValue6}
                    placeholder="Situation... "
                    search={false}
                    boxStyles={style.TextInput}
                    contentContainerStyle={{ backgroundColor: 'lightgray' }}


                  />
                </View>
              </View>
            </View>

            <View style={style.boxBody}>
              <Text style={[style.text, { fontFamily: isFontLoaded ? 'custom-fontmessage' : null }]}>Date de naissance :</Text>
              <View style={style.ContenuDate}>


                <View>
                  <View style={style.datePickerItem1}>
                    <SelectList
                      setSelected={(val) => handleDateSelection(val, inputValueMois, inputValueAnnee)}
                      value={inputValueJour}
                      data={Jour}
                      save="value"
                      placeholder="Jour... "
                      search={false}
                      boxStyles={style.InputDate}
                    />
                  </View>
                </View>



                <View>
                  <View style={style.datePickerItem2}>
                    <SelectList
                      setSelected={(val) => handleDateSelection(inputValueJour, val, inputValueAnnee)}
                      value={inputValueMois}
                      data={Mois}
                      save="value"
                      placeholder="Mois... "
                      search={false}
                      boxStyles={style.InputDate}
                    />
                  </View>
                </View>


                <View style={style.boxBodyAnnée}>

                  <TextInput
                    placeholder="Année... "
                    style={style.TextInputAnnee}
                    onChangeText={(text) => {
                      // Limiter la saisie à 4 caractères
                      if (text.length <= 4) {
                        setInputValueAnnee(text);
                      }
                    }}
                    value={inputValueAnnee}
                    keyboardType="numeric"
                    maxLength={4} // Limiter à 4 caractères

                  />
                </View>
                
              </View>
              {errorMessageAnnee ? <Text style={style.error}>{errorMessageAnnee}</Text> : null}
            </View>

        
            <View style={style.boxBody}>
              <Text style={[style.text, { fontFamily: isFontLoaded ? 'custom-fontmessage' : null }]}>Mot de passe :</Text>
              <View style={style.showpassword}>
                <TextInput
                  placeholder="mot de passe... "
                  style={style.TextInputMdp}
                  onChangeText={(text) => setInputValue8(text)}
                  value={inputValue8}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={isPasswordVisible ? 'eye' : 'eye-off'}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={style.boxBody}>

              <Text style={[style.text, { fontFamily: isFontLoaded ? 'custom-fontmessage' : null }]}>Confirmation:</Text>
              <View style={style.showpassword}>
                <TextInput
                  placeholder="Confirmation... "
                  style={style.TextInputMdp}
                  onChangeText={(text) => setInputValue9(text)}
                  value={inputValue9}
                  secureTextEntry={!isCofirmationVisible}
                />
                <TouchableOpacity onPress={toggleConfirmationVisibility}>
                  <Ionicons
                    name={isCofirmationVisible ? 'eye' : 'eye-off'}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <View >

                </View>

              </View>
              {errorMessage ? <Text style={style.error}>{errorMessage}</Text> : null}

            </View>
          </View>
          <View>
            <View style={style.boxFooter}>
              <TouchableOpacity style={style.boutonEnregistre} onPress={handleEnregistrement}>
                <Text style={style.textEnreg}>S'inscrire</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.dernierBox}>
            <View>
              <Text style={style.textInscrire}>Vous déjà inscrit(e)?</Text>
            </View>
            <TouchableOpacity onPress={onPressCOnnexion}>

              <Text style={style.dejaInscrire}>Se connecter ici !</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal isVisible={isErrorModalVisible}>
          <View style={style.modalContainer}>
            <Text style={[style.modalText, { fontFamily: isFontLoaded ? 'custom-fontmessage' : null }]}>{errorMessageModal}</Text>
            <View style={style.modalporteurText}>
              <Text style={[style.modalText, { fontFamily: isFontLoaded ? 'custom-fontmessage' : null }]}>inscrire </Text>
              <Text style={[style.Tafa, { fontFamily: isFontLoaded ? 'custom-fontmessageBold' : null }]}> Tafa</Text>
            </View>
            <TouchableOpacity onPress={() => setIsErrorModalVisible(false)}>
              <Text style={style.modalButton}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView >
  );
}

const style = StyleSheet.create({
  BoxContainer: {
    height: 1000,
    backgroundColor: "white",
    borderColor: "black",
    top: 100,
    borderRadius: 10,
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    marginBottom:150
  },
  soouscontainer: {
    alignContent: "center",
    justifyContent: "center",
    margin: 20,
  },
  boxBody: {
    margin: 5,
    top: 10,
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    top: 5,
    width: 120,
    height: 37,
  },
  boxHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    paddingTop: 10,
  },

  textRegister: {
    top: 20,
    fontStyle: "normal",
    fontSize: 20,
    // textDecorationLine: "underline",
    color: "#1c1c1e",

  },
  showpassword: {
    height: 40,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#4b0082",
    width: " 100%",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextInputMdp: {
    height: 40,
    width: " 90%",
    paddingLeft: 15,
    fontSize: 12,
  },
  TextInput: {
    height: 40,
    borderWidth: 0.5,
    borderColor: "#4b0082",
    width: " 100%",
    borderRadius: 4,
    paddingLeft: 15,
    fontSize: 12,
  },

  boxBodyAnnée: {
    width: '30%',
    height: 40,
    display: 'flex',
    justifyContent: 'flex-end',

  },
  TextInputAnnee: {

    height: 40,
    borderWidth: 0.5,
    borderColor: "#4b0082",
    width: " 100%",
    borderRadius: 4,
    paddingLeft: 15,
    fontSize: 12,
  },
  ContenuDate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',



  },
  InputDate: {
    height: 40,
    borderWidth: 0.5,
    borderColor: "#4b0082",
    width: 90,
    borderRadius: 4,
    fontSize: 12,
  },
  text: {
    fontSize: 15,
    margin: 5,
  },
  boxFooter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    top: 30,
  },
  boutonEnregistre: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    width: "100%",
    height: 40,
    backgroundColor: "#79328d",
    borderColor: "#79328d",
    color: "white",
    borderRadius: 20,
  },
  textEnreg: {
    fontSize: 17,
    color: "white",
  },
  dernierBox: {
    top: 35,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textInscrire: {
    fontSize: 15,
    margin: 3,
  },
  dejaInscrire: {
    fontSize: 15,
    color: "blue",
  },
  error: {
    color: 'red',
  },

  InputSexe: {
    width: '100%',
    position: 'relative',
    paddingBottom: 40,
  },
  InputSituation: {
    position: 'relative',
    paddingBottom: 40,
  },
  datePickerItemSexe: {
    flex: 1,
    position: 'absolute',
    zIndex: 3,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
  },
  datePickerItemSituation: {
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
  },
  datePickerItem1: {
    flex: 1,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  datePickerItem2: {
    flex: 1,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 10,

  },
  placeholderStyle: {
    color: 'gray', // Couleur du placeholder

  },
  errorInput: {
    borderColor: 'red', // Changer la couleur de la bordure en cas d'erreur
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    //    marginBottom: 20,
  },
  Tafa: {
    fontSize: 16,
    color: '#f94990',
  },
  modalButton: {
    fontSize: 16,
    color: "blue",
  },
  modalporteurText: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,

  },
});
export default Register;
