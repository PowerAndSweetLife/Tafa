import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AproposInterface from "../components/AproposInterface";
import PhotoInterface from "../components/PhotoInterface";
import { ScrollView } from "react-native";


//const couverture = require("../assets/image/about_bg.jpg");
//const profil = require("../assets/image/single_2_thumb.jpg");

function Profil() {
  const navigation = useNavigation();
  const [currentInterface, setCurrentInterface] = useState("Profil");

  const onPressPhotos = () => {
    setCurrentInterface("Photo");
  };

  const onPressApropos = () => {
    setCurrentInterface("Apropos");
  };

  const renderCurrentInterface = () => {
    switch (currentInterface) {
      case "Photo":
        return <PhotoInterface />;
      case "Apropos":
        return <AproposInterface />;
      default:
        return <AproposInterface />;
    }
  };

  return (
    <ScrollView>
      <View style={style.content}>
        <View style={style.couverture}>
          <Image source={couverture} style={style.image1}></Image>
        </View>
        <View>
          <Image source={profil} style={style.profil}></Image>
        </View>
        <View>
          <Text style={style.prenom}>Bella3</Text>
          <Text style={style.description}>
            " L'amour n'est pas un sentiment, c'est une force, une vertu "
          </Text>
        </View>
        <View style={style.apropos}>
          <Pressable
            onPress={onPressApropos}
            style={[
              style.apropos1,
              currentInterface === "Apropos"
                ? style.selectedButton
                : style.defaultButton,
            ]}
          >
            <Text
              style={{
                color: currentInterface === "Apropos" ? "white" : "black",
              }}
            >
              A propos
            </Text>
          </Pressable>
          <Pressable
            onPress={onPressPhotos}
            style={[
              style.apropos1,
              currentInterface === "Photo" && style.selectedButton,
            ]}
          >
            <Text
              style={{
                color: currentInterface === "Photo" ? "white" : "black",
              }}
            >
              Photos
            </Text>
          </Pressable>
        </View>
        {renderCurrentInterface()}
      </View>
    </ScrollView>
    // </View>
  );
}

const style = StyleSheet.create({
  content: {
    marginTop: 70, // ajuster selon votre besoin
  },
  couverture: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  image1: {
    alignItems: "center",
    justifyContent: "center", // Ajout de cette ligne pour centrer 
    height: 200,
    width: "98%",
    borderRadius: 20,
    zIndex: 1,
  },
  profil: {
    borderRadius: 100,
    marginLeft: 20,
    zIndex: 2,
    marginTop: -100,
  },
  prenom: {
    fontSize: 25,
    paddingLeft: 20,
  },
  description: {
    fontSize: 12,
    marginLeft: 10,
    Color: "black",
  },
  apropos: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
  },
  apropos1: {
    width: 90,
    height: 25,
    display: "flex",
    borderRadius: 20,
    margin: 8,
    paddingLeft: 14,
  },
  selectedButton: {
    backgroundColor: "#07668f",
  },
  defaultButton: {
    backgroundColor: "grey",
    opacity: 0.6,
  },
});

export default Profil;
