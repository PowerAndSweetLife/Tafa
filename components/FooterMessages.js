import React from "react";
import { View, StyleSheet, ToastAndroid, Pressable, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from './context/usercontext';
import { useRoute } from '@react-navigation/native';
import { BASE_URL } from "../helper/url";
import { useState } from 'react';
import { insererDonnees } from './firebaseinsertionmessages';
import { insererimages } from './firebaseinsertionmessages';
import { insereremojies } from './firebaseinsertionmessages';
import { useTheme } from './context/usercontexttheme';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';
import EmojiSelector from 'react-native-emoji-selector';


function FooterMessages() {
  const route = useRoute();
  const { isDarkMode } = useTheme();
  const userData1 = route.params.userData;
  const Idrecusmes = userData1 && userData1.id ? userData1.id : 'defaultUserId';//id du userUsers de l'utilisateur connecter 
  const Nomrecusmes = userData1 && userData1.pseudo ? userData1.pseudo : 'Nom';
  const profilrecumes = userData1 && userData1.photo ? userData1.photo : 'img_link';
  const { Monprofil } = useUser();
  const Idenvoyermes = Monprofil && Monprofil.id ? Monprofil.id : 'defaultUserId';
  const Nomenvoyermes = Monprofil && Monprofil.pseudo ? Monprofil.pseudo : 'Nom';
  const profilenvoyermes = Monprofil && Monprofil.photo ? Monprofil.photo : 'img_link';
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [emojiSelected, setEmojiSelected] = useState(false);

const handleEmojiSelected = (emoji) => {
  setInputValue(prevValue => prevValue + emoji); 
  setEmojiSelected(true); 
  insereremojies(Idenvoyermes, Idrecusmes,emoji, profilrecumes, Nomrecusmes, Nomenvoyermes, profilenvoyermes); 
};


  const uploadImageToServer = async (imageUri, imageName) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        name: imageName, 
        type: 'image/jpg',
      });
      console.log('envoyer',imageName);
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
      
        const imageName = `message-${Nomenvoyermes}-${Date.now()}.jpg`;
        console.log('ick',imageName);
        setSelectedImage(imageName);
        uploadImageToServer(result.assets[0].uri, imageName); 
        insererimages(Idenvoyermes, Idrecusmes, imageName, profilrecumes, Nomrecusmes, Nomenvoyermes, profilenvoyermes);
      }

    } catch (error) {
      console.error('Erreur lors de la sélection de l\'image depuis la galerie:', error);
    }
  };

  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);


  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
   
};

  const onPressEnvoyer = async () => {
    if (inputValue.trim() !== '') {
  //    insererDonnees(Idenvoyermes, Idrecusmes, inputValue, profilrecumes, Nomrecusmes, Nomenvoyermes, profilenvoyermes);
  const res = await fetch(BASE_URL + 'messages', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: Idenvoyermes,
      receiver: Idrecusmes,
      lastMessage: inputValue,
      lastSender: Idenvoyermes,
      statusReceiver:0,
    }),
  });  
  setInputValue('');
    } else {
      // Afficher un message indiquant que l'entrée est vide
      ToastAndroid.show("Veuillez entrer un message", ToastAndroid.SHORT);
    }
  };

  return (
    <View >
    {emojiPickerVisible && (
      <EmojiSelector
      style={{width:'100%',height:300}}    
     showSearchBar={false}
          columns={7}
          onEmojiSelected={handleEmojiSelected}
      />
  )}
 


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
          <Pressable onPress={toggleEmojiPicker}>
                        <Ionicons name="happy" size={30} color={isDarkMode ? '#79328d' : '#f94990'}></Ionicons>
                    </Pressable>
        </View>

        <View style={style.COntenuSend}>
          <Pressable onPress={onPressEnvoyer}>
            <Ionicons name="send" size={28} color={isDarkMode ? '#79328d' : '#f94990'}></Ionicons>
          </Pressable>
        </View>

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
    display:'flex',
    flexDirection:'row',
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
    width: '88%',
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
