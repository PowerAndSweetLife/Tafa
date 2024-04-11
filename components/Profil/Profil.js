import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AproposInterface from '../../components/AproposInterface'
import PhotoInterface from '../../components/PhotoInterface';
import SkeletonItem from '../../components/skeleton/skeletonprofil';
import { useRoute } from '@react-navigation/native';
import { BASE_URL } from "../../helper/url";
import defaultHommeAvatar from '../../assets/Avatar/avatarhomme2.jpg';
import defaultfemmeAvatar from '../../assets/Avatar/avatarfemme2.jpg';

const Profil = () => {
  const route = useRoute();
  const userData = route.params.userData;
  const navigation = useNavigation();
  const [currentInterface, setCurrentInterface] = useState("Profil");
  const defaultAvatar = userData.Sexe === 'Homme' ? defaultHommeAvatar : defaultfemmeAvatar;
  const onPressPhotos = () => {
    setCurrentInterface("Photo", userData.Id);
  };

  const onPressApropos = () => {
    setCurrentInterface("Apropos");
  };
  const onPressMessages = () => {
    //navigation.navigate('Messages');
    navigation.navigate('Messages', { userData: userData });
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
  const [loading, setLoading] = useState(true); 

 

  useEffect(() => {
    // Simuler un chargement de données pendant 3 secondes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);


  if (loading) {
    return <SkeletonItem />;
  }



  return (
    <View style={style.content}>
      <View style={style.couverture}>
        
        <Image  source={userData.img_link ? { uri: BASE_URL +  userData.img_couverture } : defaultAvatar}
        style={style.image1}></Image>
      </View>
      <View style={style.profilcontenu}>
        <Image  source={userData.img_link ? { uri: BASE_URL +  userData.img_link } : defaultAvatar}
        style={style.profil}></Image>
      </View>
      <View>
        <Text style={style.prenom}>{userData.Nom}</Text>
        <Text style={style.description}>
          " L'amour n'est pas un sentiment, c'est une force, une vertu "
        </Text>
      </View>
      <View style={style.apropos}>

        <Pressable onPress={onPressApropos} style={({ pressed }) => [
          style.apropos0, currentInterface === "Apropos",

          { backgroundColor: pressed ? '#f94990' : 'white' },
          { borderColor: pressed ? '#f94990' : '#07668f' },
        ]}>
          <Text style={style.TExt}>A propos</Text>
        </Pressable>


        <Pressable onPress={onPressPhotos} style={({ pressed }) => [
          style.apropos1,
          { backgroundColor: pressed ? '#f94990' : 'white' },
          { borderColor: pressed ? '#f94990' : '#07668f' },
        ]}>
          <Text style={style.TExt}>Photos</Text>
        </Pressable>

        <Pressable onPress={() => onPressMessages(userData)} style={({ pressed }) => [
          style.apropos1,
          { backgroundColor: pressed ? '#f94990' : 'white' },
          { borderColor: pressed ? '#f94990' : '#07668f' },
        ]}>
          <Text style={style.TExt}>Messages</Text>
        </Pressable>

      </View>
      {renderCurrentInterface()}
    </View>

    // </View>
  );
}




const style = StyleSheet.create({
  content: {
    top: 10,
    backgroundColor: 'white',
  },
  couverture: {
    width: '100%',
    display: 'flex',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    borderRadius: 15,
 
  },
  image1: {
    alignItems: "center",
    justifyContent: "center", // Ajout de cette ligne pour centrer horizontalement
    height: 200,
    width: "98%",
    borderRadius: 15,
    // ...StyleSheet.absoluteFillObject,


  },
  profilcontenu: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'white',
    marginLeft: 20,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: 'lightgrey',
    marginTop: -50,
    display: 'flex',
    flexDirection: 'column',
  },
  profil: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
  },
  prenom: {
    fontSize: 15,
    paddingLeft: 12,
  },
  description: {
    fontSize: 13,
    marginLeft: 13,
    // Color: "black",
    fontWeight: 'bold',
  },
  apropos: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,

  },
  apropos0: {
    width: '25%',
    height: 22,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 8,
    backgroundColor: "grey",
    left: -4,
    borderWidth: 1,
  },
  apropos1: {
    width: '25%',
    height: 22,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 8,
    backgroundColor: "grey",
    left: -4,
    borderWidth: 1,
  },
  selectedButton: {
    backgroundColor: "#07668f",
  },
  defaultButton: {
    backgroundColor: "grey",
    opacity: 0.6,
  },
  TExt: {
    fontSize: 12,
    color: '#07668f',
    fontWeight: 'bold'
  },
});

export default Profil;
