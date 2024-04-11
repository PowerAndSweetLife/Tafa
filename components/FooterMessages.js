import React from "react";
import { View, StyleSheet, ToastAndroid, Pressable, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from './context/usercontext';
import { useRoute } from '@react-navigation/native';
import { BASE_URL } from "../helper/url";
import { useState } from 'react';
import { insererDonnees } from './firebaseinsertionmessages';





function FooterMessages() {
  const route = useRoute();
  const userData1 = route.params.userData;
  const Id = userData1 && userData1.Id ? userData1.Id : 'defaultUserId';//id du userUsers de l'utilisateur connecter 
  const { Monprofil } = useUser();
  const profilVisited = Monprofil && Monprofil.img_link ? Monprofil.img_link : 'img_link';
  const Idvisited = Monprofil && Monprofil.Id ? Monprofil.Id : 'defaultUserId';
  const Nom = Monprofil && Monprofil.Nom ? Monprofil.Nom : 'Nom';
  const [inputValue, setInputValue] = useState('');
  console.log(profilVisited);
  const onPressEnvoyer = () => {
    insererDonnees(Id, Idvisited ,inputValue ,profilVisited,Nom);
    setInputValue('');
  };


  return (

    <View style={style.contenair}>
      <View style={style.Contenu}>

        <View style={style.COntenuImage}>
          <Pressable>
            <Ionicons name="image" size={20} color="#f94990"></Ionicons>
          </Pressable>
        </View>

        <View style={style.COntenuInput}>
          <TextInput style={style.Input}
            placeholder="Votre Message ..."
            onChangeText={(text) => setInputValue(text)}
            value={inputValue}
             />
        </View>

        <View style={style.COntenuSend}>
          <Pressable onPress={onPressEnvoyer}>
            <Ionicons name="send" size={20} color="#f94990"></Ionicons>
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
    height: 40,
    borderRadius: 10,
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
    height: 40,
    borderRadius: 10,
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
