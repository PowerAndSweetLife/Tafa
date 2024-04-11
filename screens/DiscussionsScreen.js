import React from "react";
import {SafeAreaView,StyleSheet,View, Image, Text, ScrollView, Pressable, Button, TextInput,} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Entypo,AntDesign,FontAwesome,MaterialIcons,} from "@expo/vector-icons";
import NavBarDiscu from '../components/Discussions/NavBarDiscu';
import ContenuDiscu from '../components/Discussions/ContenuDiscu';
//import FooterMessages from '../components/FooterMessages';







function DiscussionsScreen() {
  return (
    <SafeAreaView style={style.content}>
             <NavBarDiscu/>
             <ContenuDiscu/>
    </SafeAreaView>
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

export default DiscussionsScreen;
