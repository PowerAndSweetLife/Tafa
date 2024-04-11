import React from 'react'
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";

function NavProfil() {

      const navigation = useNavigation();
    //   const [currentInterface, setCurrentInterface] = useState("Profil");

      const onPressMessage = () => {
        navigation.navigate("message");
      };

      const onPressBack = () => {
        navigation.goBack();
      };
  return (
    <View style={style.Navbar}>
      <View style={style.header}>
        <Pressable onPress={onPressBack }>
          <Ionicons name="ios-arrow-back" size={20} color="#f94990"></Ionicons>
        </Pressable>
        <Text style={style.nom}> Bella3</Text>
      </View>
      <Pressable onPress={onPressMessage} style={style.icon}>
        <Ionicons name="chatbubble-ellipses" size={25} color="#f94990" />
      </Pressable>
    </View>
  );
}
const style = StyleSheet.create({
  Navbar: {
    paddingHorizontal: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    zIndex: 100,
  },
  content: {
    marginTop: 70, // ajuster selon votre besoin
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  nom: {
    color: "black",
    marginLeft: 10,
    fontSize: 18,
  },
  icon: {
    padding: 10,
  },
});

export default NavProfil