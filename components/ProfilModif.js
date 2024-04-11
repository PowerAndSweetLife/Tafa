import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator, Animated } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AproposInterfacemodif from "../components/AproposInterfacemodif";
import PhotoModif from "./PhotoModif";
import { ScrollView } from "react-native";
import { useUser } from './context/usercontext';
import { BASE_URL } from "../helper/url";
import SkeletonItem from '../components/skeleton/skeletonprofil';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';
import { RefreshControl } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import defaultHommeAvatar from '../assets/Avatar/avatarhomme2.jpg';
import defaultfemmeAvatar from '../assets/Avatar/avatarfemme2.jpg';



function NavProfilModif() {
  const [loading, setLoading] = useState(true);
  const [donnees, setDonnees] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentInterface, setCurrentInterface] = useState("Profil");
  const { Monprofil } = useUser();
  const pseudo = Monprofil && Monprofil.Pseudo ? Monprofil.Pseudo : 'pseudo par défaut';
  const Id = Monprofil && Monprofil.Id ? Monprofil.Id : 'defaultUserId';
  const sexe = Monprofil && Monprofil.sexe ? Monprofil.sexe : 'sexe';
  const [img_link, setImgLink] = useState('');
  const [img_couverture, setImgcouverture] = useState('');
  const loadingAnimation = useRef(new Animated.Value(0)).current;
  const loadingProfileAnimation = useRef(new Animated.Value(0)).current;
  const [loadingCouverture, setLoadingCouverture] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadingSuccess, setLoadingSuccess] = useState(false);
  const [loadingProfileSuccess, setLoadingProfileSuccess] = useState(false);
const [loadingCouvertureSuccess, setLoadingCouvertureSuccess] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setIsRefreshing(false);
  };

  const onPressPhotos = () => {
    setCurrentInterface("Photo");
  };

  const onPressApropos = () => {
    setCurrentInterface("Apropos");
  };

  const uploadImageToServer = async (imageUri) => {
    try {
      const formData = new FormData();
      const imageName = `${uuidv4()}.jpg`;
      formData.append('image', {
        uri: imageUri,
        name: imageName,
        type: 'image/jpg',
      });

      formData.append('Id', Id);
      formData.append('img_link', imageName);

      const response = await fetch(BASE_URL + 'update_image', {
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
        setLoadingProfile(true);
        setImgLink(result.assets[0].uri);
        uploadImageToServer(result.assets[0].uri);
        setLoadingProfileSuccess(true); // Définir loadingSuccess à true lorsque le chargement est terminé
        setTimeout(() => {
          setLoadingProfile(false);
          setImageLoaded(true);
         // setLoadingProfileSuccess(false);
          // Ne définissez pas loadingSuccess à false ici, car vous souhaitez afficher le message "Chargement terminé"
        }, 5000);
      }
    } catch (error) {
      console.error('Erreur lors de la sélection de l\'image depuis la galerie:', error);
    }
  };

  const uploadImagecouvertureToServer = async (imageUri) => {
    try {
      const formData = new FormData();
      const imagecouverture = `${uuidv4()}.jpg`;
      formData.append('image', {
        uri: imageUri,
        name: imagecouverture,
        type: 'image/jpg',
      });

      formData.append('Id', Id);
      formData.append('img_couverture', imagecouverture);

      const response = await fetch(BASE_URL + 'update_imagecouverture', {
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

  const pickImagecouverture = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setLoadingCouverture(true);
        setImgcouverture(result.assets[0].uri);
        uploadImagecouvertureToServer(result.assets[0].uri);
        setLoadingCouvertureSuccess(true); // Définir loadingSuccess à true lorsque le chargement est terminé
       
        setTimeout(() => {
          setLoadingCouverture(false);
          setImageLoaded(true);
        ///  setLoadingCouvertureSuccess(false);
          // Ne définissez pas loadingSuccess à false ici, car vous souhaitez afficher le message "Chargement terminé"
        }, 5000);
      }
    } catch (error) {
      console.error('Erreur lors de la sélection de l\'image depuis la galerie:', error);
    }
  };

  useEffect(() => {
    fetch(BASE_URL + 'users')
      .then(response => response.json())
      .then(data => {
        const filteredData = data.filter(user => user.Pseudo === pseudo);
        setDonnees(filteredData);
        if (filteredData.length > 0) {
          setImgLink(filteredData[0].img_link);
          setImgcouverture(filteredData[0].img_couverture);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false);
      });
  }, []);
  const defaultAvatar = (sexe) => {
    return sexe === 'Homme' ? defaultHommeAvatar : defaultfemmeAvatar;
  };
  const renderCurrentInterface = () => {
    switch (currentInterface) {
      case "Photo":
        return <PhotoModif />;
      case "Apropos":
        return <AproposInterfacemodif />;
      default:
        return <AproposInterfacemodif />;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(loadingAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [loadingAnimation]);

  useEffect(() => {
    if (!loadingCouverture && imageLoaded && loadingCouvertureSuccess) {
      setTimeout(() => {
        setIsRefreshing(true); // Déplacer setIsRefreshing ici
      }, 5000); // Attendre 5 secondes avant de rafraîchir
    }
  }, [loadingCouverture, imageLoaded, loadingCouvertureSuccess]);


  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingProfileAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(loadingProfileAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [loadingProfileAnimation]);
  useEffect(() => {
    if (!loadingProfile && imageLoaded &&loadingProfileSuccess) {
      setTimeout(() => {
        setIsRefreshing(true); // Déplacer setIsRefreshing ici
      }, 5000); // Attendre 3 secondes avant de rafraîchir
    }
  }, [loadingProfile, imageLoaded, loadingProfileSuccess]);



  if (loading) {
    return <SkeletonItem />;
  }

  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      }
    >
      <ScrollView style={style.content} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 10 }}>
          <View style={style.couverture}>


            <View style={style.couverturecontenu}>
              {loadingCouverture ? (
                <Animated.View style={[style.image2, { opacity: loadingAnimation }]}>
                  <Text style={style.loadingIndicator}>...</Text>
                </Animated.View>
              ) : (
                loadingCouvertureSuccess ? (
                  <Text style={{ fontSize: 15, color:'#79328d',}}>Chargement terminé</Text>
                ) : (
                  <Image
                  
                    source={img_couverture ? { uri: BASE_URL + img_couverture } : defaultAvatar(sexe)}
                    style={style.image1}
                  />
                )
              )}

            </View>

            <View style={style.Icon}>
              <Pressable onPress={pickImagecouverture} style={({ pressed }) => [
                style.Pressable,
                { backgroundColor: pressed ? '#f94990' : 'white' },
                { borderColor: pressed ? '#f94990' : '#07668f' },
              ]}>
                <Ionicons name="camera" size={20} color="#07668f" />
              </Pressable>
            </View>
          </View>
          <View style={style.profilcontenu}>

            <View style={style.skeletcontenu}>



              {loadingProfile ? (
                <Animated.View style={[style.image3, { opacity: loadingProfileAnimation }]}>
                  <Text style={style.loadingIndicator}>...</Text>
                </Animated.View>
              ) : (
                loadingProfileSuccess ? (
                  <Text style={style.textsuccesprofile}>Chargement terminé</Text>
                ) : (
                  <Image    source={img_link ? { uri: BASE_URL + img_link } : defaultAvatar(sexe)} style={style.profil} />
               
                )
              )}


            </View>
            <View style={style.Icon2}>
              <Pressable onPress={pickImage} style={({ pressed }) => [
                style.Pressable,
                { backgroundColor: pressed ? '#f94990' : 'white' },
                { borderColor: pressed ? '#f94990' : '#07668f' },
              ]}>
                <Ionicons name="camera" size={20} color="#07668f" />
              </Pressable>
            </View>
          </View>
          <View>
            <Text style={style.prenom}>{pseudo}</Text>
            <Text style={style.description}>
              "L'amour n'est pas un sentiment, c'est une force, une vertu"
            </Text>
          </View>
          <View style={style.apropos}>
            <Pressable onPress={onPressApropos} style={({ pressed }) => [
              style.apropos0, currentInterface === "Apropos",
              { backgroundColor: pressed ? '#f94990' : 'white' },
              { borderColor: pressed ? '#f94990' : '#07668f' },
            ]}>
              <Text style={style.TExtAproposPHoto}>A propos</Text>
            </Pressable>
            <Pressable onPress={onPressPhotos} style={({ pressed }) => [
              style.apropos1,
              { backgroundColor: pressed ? '#f94990' : 'white' },
              { borderColor: pressed ? '#f94990' : '#07668f' },
            ]}>
              <Text style={style.TExtAproposPHoto}>Photos</Text>
            </Pressable>
          </View>
          {renderCurrentInterface()}
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const style = StyleSheet.create({
  content: {
    marginTop: 10,
    width: '100%',
  },
  couverture: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 200,


  },
  Pressable: {
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Icon: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  couverturecontenu: {
    width: '98%',
    height: 200,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'lightgrey',

  },
  image1: {
    flex: 1,
    height: 200,
    width: '100%',
    borderRadius: 15,

  },
  TExtAproposPHoto: {
    fontSize: 12,
    color: '#07668f',
    fontWeight: 'bold',
  },
  profilcontenu: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginLeft: 20,
    marginTop: -50,
    display: 'flex',
    flexDirection: 'column',
  },
  skeletcontenu: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  profil: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
  },
  Icon2: {
    bottom: 40,
    left: 75,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prenom: {
    fontSize: 15,
    paddingLeft: 12,
  },
  description: {
    fontSize: 13,
    marginLeft: 13,
  //  Color: "black",
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
  image2: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: "98%",
    borderRadius: 15,
  },
  loadingIndicator: {
    fontSize: 50,
    top: -10,
    color: '#79328d',
  },
  image3: {
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  textsuccesprofile: {
    fontSize: 10,
    textAlign: 'center',
    color: '#79328d',

  },
});

export default NavProfilModif;
