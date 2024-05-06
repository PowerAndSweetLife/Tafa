import React from "react";
import { View, StyleSheet, ToastAndroid, Pressable, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from './context/usercontext';
import { useRoute } from '@react-navigation/native';
import { BASE_URL } from "../helper/url";
import { useState } from 'react';
import { insererDonnees } from './firebaseinsertionmessages';
import { insererimages } from './firebaseinsertionmessages';
import { useTheme } from './context/usercontexttheme';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';


function FooterMessages() {
  const route = useRoute();
  const { isDarkMode } = useTheme();
  const userData1 = route.params.userData;
  const Idrecusmes = userData1 && userData1.Id ? userData1.Id : 'defaultUserId';//id du userUsers de l'utilisateur connecter 
  const Nomrecusmes = userData1 && userData1.Nom ? userData1.Nom : 'Nom';
  const profilrecumes = userData1 && userData1.img_link ? userData1.img_link : 'img_link';
  const { Monprofil } = useUser();
  const Idenvoyermes = Monprofil && Monprofil.Id ? Monprofil.Id : 'defaultUserId';
  const Nomenvoyermes = Monprofil && Monprofil.Nom ? Monprofil.Nom : 'Nom';
  const profilenvoyermes = Monprofil && Monprofil.img_link ? Monprofil.img_link : 'img_link';
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');



  const uploadImageToServer = async (imageUri, imageName) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        name: imageName, 
        type: 'image/jpg',
      });
      formData.append('img_link', imageName);


      const response = await fetch(BASE_URL + 'envoyermessage_image', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'image:', error);
    }
  };



  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const imageName = result.assets[0].uri.split('/').pop();
        setSelectedImage(imageName);
        uploadImageToServer(result.assets[0].uri, imageName); 
        insererimages(Idenvoyermes, Idrecusmes, imageName, profilrecumes, Nomrecusmes, Nomenvoyermes, profilenvoyermes);
      }

    } catch (error) {
      console.error('Erreur lors de la sélection de l\'image depuis la galerie:', error);
    }
  };



  const onPressEnvoyer = () => {
    if (inputValue.trim() !== '') {
      insererDonnees(Idenvoyermes, Idrecusmes, inputValue, profilrecumes, Nomrecusmes, Nomenvoyermes, profilenvoyermes);
      setInputValue('');
    } else {
      // Afficher un message indiquant que l'entrée est vide
      ToastAndroid.show("Veuillez entrer un message", ToastAndroid.SHORT);
    }
  };

  return (

    <View style={[style.contenair, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
      <View style={style.Contenu}>

        <View style={style.COntenuImage}>
          <Pressable onPress={pickImage}>
            <Ionicons name="ios-camera" size={30} color={isDarkMode ? '#79328d' : '#f94990'}></Ionicons>
          </Pressable>
        </View>

        <View style={style.COntenuInput}>
          <TextInput style={[style.Input, { color: isDarkMode ? '#ffffff' : '#000000' }]}
            placeholder="Votre Message ..."
            placeholderTextColor={isDarkMode ? 'white' : 'gray'}
            onChangeText={(text) => setInputValue(text)}
            value={inputValue}
          />
        </View>

        <View style={style.COntenuSend}>
          <Pressable onPress={onPressEnvoyer}>
            <Ionicons name="send" size={28} color={isDarkMode ? '#79328d' : '#f94990'}></Ionicons>
          </Pressable>
        </View>

      </View>
    </View>
  );
}

const style = StyleSheet.create({
  contenair: {
    display: 'flex',
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 0,
  },
  Contenu: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',

  },

  COntenuInput: {
    width: '70%',
    height: 35,
    borderRadius: 30,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    fontSize: 10,
  },
  COntenuImage: {
    width: '15%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    right: 5,
  },
  Input: {
    width: '100%',
    height: 35,
    borderRadius: 20,
    flexWrap: 'wrap',
    fontSize: 10
  },
  COntenuSend: {
    width: '15%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FooterMessages;
