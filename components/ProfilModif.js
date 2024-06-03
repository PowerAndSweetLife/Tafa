import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator, Animated } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Bloquage from "../components/Bloquage";
import ModiferInterface from "./ModiferInterface";
import { useNavigation } from "@react-navigation/native";
import Initialiseinterface from "../components/Initialiseinterface";
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
import { useTheme } from './context/usercontexttheme';
import * as Font from 'expo-font';
import { BackHandler } from 'react-native';





function NavProfilModif() {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack(); // Revenir à l'écran précédent
    return true; // Indiquer que l'événement a été géré
};





useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
        backHandler.remove(); // Supprimer l'écouteur lors du démontage du composant
    };
}, []); // Le tableau de dépendances est vide, donc cette fonction ne sera exécutée qu'une fois lors du montage initial


  
    const loadFonts = async () => {
      await Font.loadAsync({
        'objectif-font': require('../assets/Fonts/GrandHotel-Regular.ttf'),
       
        
      });
    };
    useEffect(() => {
      loadFonts();
    }, []);


  const [loading, setLoading] = useState(true);
  const [donnees, setDonnees] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentInterface, setCurrentInterface] = useState("Profil");
  const { Monprofil } = useUser();
  const pseudo = Monprofil && Monprofil.pseudo ? Monprofil.pseudo : 'pseudo par défaut';
  const Id = Monprofil && Monprofil.id ? Monprofil.id : 'defaultUserId';
  const sexe = Monprofil && Monprofil.sexe ? Monprofil.sexe : 'sexe';
  const photo = Monprofil && Monprofil.photo ? Monprofil.photo : 'defaurphoto';
  const description = Monprofil && Monprofil.description ? Monprofil.description : '❤️❤️';
  const couverture = Monprofil && Monprofil.couverture ? Monprofil.couverture : 'couverture';
  const [imgLink, setImgLink] = useState(''); // Define imgLink state variable
  const [imgCouverture, setImgcouverture] = useState('');
  const loadingAnimation = useRef(new Animated.Value(0)).current;
  const loadingProfileAnimation = useRef(new Animated.Value(0)).current;
  const [loadingCouverture, setLoadingCouverture] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadingSuccess, setLoadingSuccess] = useState(false);
  const [loadingProfileSuccess, setLoadingProfileSuccess] = useState(false);
  const [loadingCouvertureSuccess, setLoadingCouvertureSuccess] = useState(false);
  const { isDarkMode } = useTheme();
  const handleRefresh = () => {
    setIsRefreshing(true);
    setIsRefreshing(false);
  };

  
  /*
    const [img_link, setImgLink] = useState('');
  const [img_couverture, setImgcouverture] = useState('');
  useEffect(() => {
    fetch(BASE_URL + 'users')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const filteredData = data.filter(user => user.pseudo === pseudo);
        setDonnees(filteredData);
        console.log(filteredData);
        if (filteredData.length > 0) {
          setImgLink(filteredData[0].photo);
          setImgcouverture(filteredData[0].couverture);
         
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false);
      });
  }, [pseudo]);*/



  const onPressPhotos = () => {
    setCurrentInterface("Photo");
  };

  const onPressApropos = () => {onPressBloquage
    setCurrentInterface("Apropos");
  };

  const onPressBloquage = () => {
    setCurrentInterface("Bloquage");
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
      formData.append('pseudo', pseudo);

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
      formData.append('pseudo', pseudo);
      
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

  
  const defaultAvatar = (sexe) => {
    return sexe === 'homme' ? defaultHommeAvatar : defaultfemmeAvatar;
  };


const renderCurrentInterface = () => {
  switch (currentInterface) {
      case "Photo":
          return <PhotoModif />;
      case "Apropos":
          return <ModiferInterface />
          ;
          case "Bloquage":
            return <Bloquage />
            ;
      default:
          return <Initialiseinterface />;
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
    if (!loadingProfile && imageLoaded && loadingProfileSuccess) {
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
      <ScrollView style={[style.content, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 10 }}>
          <View style={style.couverture}>


            <View style={style.couverturecontenu}>
              {loadingCouverture ? (
                <Animated.View style={[style.image2, { opacity: loadingAnimation }]}>
                  <Text style={style.loadingIndicator}>...</Text>
                </Animated.View>
              ) : (
                loadingCouvertureSuccess ? (
                  <Text style={{ fontSize: 15, color: '#79328d', }}>Chargement terminé</Text>
                ) : (
                  <Image

                    source={couverture ? { uri: BASE_URL + 'assets/images/profile/'+ couverture  } : defaultAvatar(sexe)}
                    style={style.image1}
                    resizeMode="cover"
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

            <View style={[style.skeletcontenu, { borderColor: isDarkMode ? '#79328d' : '#ffffff' }]}>



              {loadingProfile ? (
                <Animated.View style={[style.image3, { opacity: loadingProfileAnimation }]}>
                  <Text style={style.loadingIndicator}>...</Text>
                </Animated.View>
              ) : (
                loadingProfileSuccess ? (
                  <Text style={style.textsuccesprofile}>Chargement terminé</Text>
                ) : (
                  <Image source={photo ? { uri: BASE_URL + 'assets/images/profile/' + photo} : defaultAvatar(sexe)} style={[style.profil, { borderColor: isDarkMode ? '#79328d' : '#ffffff' }]} />

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
            <Text style={[style.prenom, {fontFamily: 'custom-font', color: isDarkMode ? '#ffffff' : '#000000' }]}>{pseudo}</Text>
            <Text style={[style.description, {fontFamily: 'objectif-font',color: isDarkMode ? '#ffffff' : '#000000' }]}>
             {description}
            </Text>
          </View>
          <View style={style.apropos}>
            <Pressable
              onPress={onPressApropos}
              style={({ pressed }) => [
                style.apropos0,
                currentInterface === "Apropos",
                {
                  backgroundColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : 'white'),
                  borderColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') :( pressed ? '#f94990' : '#07668f'),
                },
              ]}
            >
              <Text  style={[style.TExtAproposPHoto, {fontFamily: 'custom-fontmessage', color: isDarkMode ? 'white' : '#07668f' }]}>Apropos</Text>
            </Pressable>
            <Pressable onPress={onPressPhotos} style={({ pressed }) => [
              style.apropos1,
              {
                backgroundColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : 'white'),
                borderColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') :( pressed ? '#f94990' : '#07668f'),
              },
            ]}>
              <Text style={[style.TExtAproposPHoto, { fontFamily: 'custom-fontmessage',color: isDarkMode ? 'white' : '#07668f' }]}>Photos</Text>
            </Pressable>
            <Pressable  onPress={onPressBloquage} style={({ pressed }) => [
              style.apropos1,
              {
                backgroundColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : 'white'),
                borderColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') :( pressed ? '#f94990' : '#07668f'),
              },
            ]}>
              <Text style={[style.TExtAproposPHoto, { fontFamily: 'custom-fontmessage',color: isDarkMode ? 'white' : '#07668f' }]}>Bloquer</Text>
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
    //  marginTop: 10,
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
    bottom: -35,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  couverturecontenu: {
    width: '98%',
    height: 250,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'lightgrey',

  },
  image1: {
    flex: 1,
    height: 250,
    width: '100%',
    borderRadius: 15,

  },
  TExtAproposPHoto: {
    fontSize: 12,
    color: '#07668f',
  //  fontWeight: 'bold',
  },
  profilcontenu: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginLeft: 20,
   // marginTop: -50,
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

  },
  profil: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 1,

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
    fontSize: 17,
    paddingLeft: 12,
    
  },
  description: {
    fontSize: 20,
    marginLeft: 13,
    //  Color: "black",
  //  fontWeight: 'bold',
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
