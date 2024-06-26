import React from 'react'
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from './context/usercontexttheme';



function NavProfilModif() {
  const { isDarkMode } = useTheme();
      const navigation = useNavigation();
    //   const [currentInterface, setCurrentInterface] = useState("Profil");
    const onPressBack = () => {
      navigation.goBack();
    };
      const onPressMessage = () => {
        navigation.navigate("message"); 
      };
  return (
    <View  style={[style.Navbar, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
      <View style={style.header}>
        <Pressable onPress={onPressBack}>
          <Ionicons name="ios-arrow-back" size={20} color="#f94990"></Ionicons>
        </Pressable>
        <Text style={style.nom}> Bella3</Text>
      </View>
      <Pressable onPress={onPressMessage} style={style.icon}>
        <Ionicons name="chatbubble-ellipses" size={20} color="#f94990" />
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

export default NavProfilModif