import React from "react";
import {StyleSheet,View, Image, Text, ScrollView, Pressable, Button, TextInput,} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Entypo,AntDesign,FontAwesome,MaterialIcons,} from "@expo/vector-icons";
import NavMessage from '../components/NavMessage';
import ContenuMessage from '../components/ContenuMessage';
import FooterMessages from '../components/FooterMessages';






const photoProfil =  require("../assets/images/test4.jpg");
function MessageSreen() {
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.navigate("profil");
  };
  return (
    <View style={style.content}>
             <NavMessage/>
             <ContenuMessage/>
             <FooterMessages/>
    
      
    </View>
  );
}
const style = StyleSheet.create({
  
  content: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    backgroundColor:'white',
  },
});

export default MessageSreen;
