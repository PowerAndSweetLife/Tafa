
import React from "react";
import { View, Text, Pressable, StyleSheet, Image, Animated } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect, useRef } from 'react';
//import { useUser } from './context/usercontext';
import { BASE_URL } from "../helper/url";
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../components/context/usercontext';
import { useTheme } from './context/usercontexttheme';
import defaultHommeAvatar from '../assets/Avatar/avatarhomme2.jpg';
import defaultfemmeAvatar from '../assets/Avatar/avatarfemme2.jpg';

function PhotoModif() {

  const { isDarkMode } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const { Monprofil } = useUser();
  const pseudo = Monprofil && Monprofil.pseudo ? Monprofil.pseudo : 'pseudo par défaut';
  const Id = Monprofil && Monprofil.id ? Monprofil.id : 'defaultUserId';

  const [img_link, setImgLink] = useState('');
  const [img_couverture, setImgcouverture] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage1, setErrorMessage1] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [donnees, setDonnees] = useState([]);

  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnimation, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

 useEffect(() => {
  const fetchUserData = async () => {
  try {
    const response = await fetch(BASE_URL + 'usersdiscu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: Id }),
    });
  
    if (!response.ok) {
      throw new Error('Erreur HTTP, statut : ' + response.status);
    }
  
    const data = await response.json();
    console.log('Data from API:', data);
  
    if (data && Array.isArray(data.results)) {
      const filteredData = data.results.filter(user => user.id === Id);
      setDonnees(filteredData);
      console.log('ito',filteredData)
      if (filteredData.length > 0) {
        // Mettre à jour l'URL de l'image si des données filtrées sont disponibles
        setImgLink(filteredData[0].photo);
        setImgcouverture(filteredData[0].couverture);

      }else {
        console.error('Aucun utilisateur correspondant trouvé.');
      }
    } else {
      console.error('La réponse de l\'API n\'est pas un tableau attendu:', data);
    }
  
    
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    setError(error); // Définition de l'erreur dans le state
  }
}
fetchUserData();
  }, [Id]);

  


  const uploadImageToServerautre = async (imageUri) => {
    try {
      const formData = new FormData();
      const imageName = `${uuidv4()}.jpg`; // Générer un nom de fichier unique avec l'extension .jpg
      formData.append('image', {
        uri: imageUri,
        name: imageName,
        type: 'image/jpg', // Modifier le type en conséquence si nécessaire
      });

      formData.append('Id', Id);

      const response = await fetch(BASE_URL + 'update_image1', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          // Vous pouvez ajouter d'autres en-têtes nécessaires ici
        },
        body: formData,
      });

      //console.log (json.stringify(response));
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'image:', error);
    }
  };


  const defaultAvatar = (sexe) => {
    return sexe === 'homme' ? defaultHommeAvatar : defaultfemmeAvatar;
  };


  const pickImageautre = async () => {
    const response = await fetch(BASE_URL + 'users');
    const userData = await response.json();
    const filteredUserData = userData.find(user => user.pseudo === pseudo); // Vérifier seulement pour l'utilisateur avec le pseudo "Mathieu"

    // Vérifier si tous les champs d'images sont remplis pour l'utilisateur avec le pseudo "Mathieu"
    if (filteredUserData) {
      let imageCount = 0;
      for (let i = 1; i <= 7; i++) {
        const imgField = `img_${i}`;
        if (filteredUserData.hasOwnProperty(imgField) && filteredUserData[imgField]) {
          imageCount++;
        } else {
          break; // Sortir de la boucle dès qu'un champ d'image manquant est trouvé
        }
      }

      if (imageCount === 7) {
        setErrorMessage1("Vous avez atteint le nombre maximum de photos");
        setErrorMessage2("Veuillez supprimer d'autres photos pour libérer de l'espace !");
        setIsErrorModalVisible(true);
        return;
      }
    }



    const allImageFieldsFilled = donnees.length > 0 && Object.keys(donnees[0]).filter(key => key.startsWith("img_")).every(key => donnees[0][key]);

    const imagesJSXCount = imagesJSX.filter(image => image !== null).length;

    if (allImageFieldsFilled || imagesJSXCount === 7) {
      setErrorMessage1("Vous avez atteint le nombre maximum de photos");
      setErrorMessage2("Veuillez supprimer d'autres photos pour libérer de l'espace !");
      setIsErrorModalVisible(true);
      return;
    }



    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImgLink(result.assets[0].uri);
        uploadImageToServerautre(result.assets[0].uri);
      }
    } catch (error) {
      if (error.message.includes('exceeded')) {
        console.error('La taille du fichier est trop importante.');
        // Afficher un message à l'utilisateur indiquant que la taille du fichier est trop importante
      } else {
        console.error('Erreur lors de la sélection de l\'image depuis la galerie:', error);
      }
    }
  };

  // Fonction pour sélectionner une image depuis la galerie du téléphone
  /*const pickImageautre = async () => {
     const allImageFieldsFilled =
       donnees.length > 0 &&
       donnees[0]["img_1"] &&
       donnees[0]["img_2"] &&
       donnees[0]["img_3"] &&
       donnees[0]["img_4"] &&
       donnees[0]["img_5"] &&
       donnees[0]["img_6"] &&
       donnees[0]["img_7"];
 
     const allImagesDisplayed = imagesJSX && imagesJSX.length === 7;
 
     if (allImageFieldsFilled || allImagesDisplayed) {
       setErrorMessage1("Vous avez atteint le nombre maximum de photos");
       setErrorMessage2("veuillez supprimer d'autre photo pour liberé l'espace !");
 
       setIsErrorModalVisible(true);
       return;
     }
 
     try {
       const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
       });
 
       if (!result.canceled) {
         setImgLink(result.assets[0].uri);
         // Mettre à jour le nom de l'image dans la base de données
         uploadImageToServerautre(result.assets[0].uri);
 
       }
     } catch (error) {
       if (error.message.includes('exceeded')) {
         console.error('La taille du fichier est trop importante.');
         // Afficher un message à l'utilisateur indiquant que la taille du fichier est trop importante
       } else {
         console.error('Erreur lors de la sélection de l\'image depuis la galerie:', error);
       }
     }
   };*/

  const onDeleteImage = async (index) => {
    try {
      const response = await fetch(BASE_URL + 'delete_image', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id: Id,
          imgIndex: index + 1,
        }),
      });

      if (response.ok) {
        setDonnees((prevDonnees) => {
          const updatedDonnees = [...prevDonnees];
          updatedDonnees[0][`img_${index + 1}`] = '';
          return updatedDonnees;
        });
      } else {
        console.error('Erreur lors de la suppression de l\'image:', response.status);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'image:', error);
    }
  };
  const closeModal = () => {
    setIsErrorModalVisible(false);
  };

  const imagesJSX = donnees.length > 0 ? (
    Array.from({ length: 7 }, (_, i) => {
      if (donnees[0][`img_${i + 1}`]) {
        return (
          <View style={style.image} key={i}>
            <Image
              source={{ uri: BASE_URL + donnees[0][`img_${i + 1}`] }}
              style={style.imageajouter}
            />
            <View style={style.Iconcontenu}>
              <View style={style.CircleTrash}>
                <Pressable onPress={() => onDeleteImage(i)}>
                  <Ionicons name="trash" size={15} color='#f94990' />
                </Pressable>
              </View>
            </View>
          </View>
        );
      } else {
        return null;
      }
    })
  ) : null;

  const backgroundColor = shimmerAnimation.interpolate({
    inputRange: [0, 0.3, 0.5, 1],
    outputRange: ['#79328d', '#f94990', '#79328d', '#f94990'],
  });

  return (
    <View style={style.Container}>
      <View style={[style.Header, { backgroundColor: isDarkMode ? '#000000' : 'white' }]}>
        <Ionicons style={{ marginLeft: -20, }} name="ios-images" size={25} color={isDarkMode ? '#f94990' : '#07668f'} />
        <Pressable onPress={pickImageautre} style={({ pressed }) => [
          style.btnajout,
          {
            backgroundColor: isDarkMode ? (pressed ? '#f94990' : '#f94990') : (pressed ? '#f94990' : 'white'),
            borderColor: isDarkMode ? (pressed ? '#f94990' : '#79328d') : (pressed ? '#f94990' : '#07668f'),
          },
        ]}>
          <Text style={[style.Ajouter, { fontFamily: 'custom-fontmessage', color: isDarkMode ? '#ffffff' : '#07668f' }]}>Ajouter une photo</Text>
        </Pressable>
      </View>
      <Text style={[style.Title, { fontFamily: 'titre-font' }]}>Ajouter ou Supprimer</Text>
      <View style={[style.Modif1, {
        backgroundColor: isDarkMode ? '#000000' : '#ffffff',

      }]}>
        <View style={style.imageContainer}>
          <View style={style.image} >
            <Image source={{ uri: BASE_URL +'/assets/images/profile/'+ img_link }} style={style.imageajouter} />
            <View style={style.Iconcontenu}>
            </View>
          </View>
          <View style={style.image}>
            <Image source={{ uri: BASE_URL +'/assets/images/profile/'+ img_couverture }} style={style.imageajouter} />
            <View style={style.Iconcontenu}>
            </View>
          </View>
          {imagesJSX}
        </View>
      </View>
      <Modal isVisible={isErrorModalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onRequestClose={closeModal}
        backdropOpacity={0}
      >

        <Animated.View
          style={[
            style.modalContent,
            { backgroundColor },
          ]}
        >

          <View style={style.contenuerreurText}>
            <Pressable onPress={closeModal} style={style.closemodale}>
              <Ionicons name="close-circle" size={30} color='white' />
            </Pressable>
            <Text style={style.modalText1}>{errorMessage1}</Text>
            <Text style={style.modalText2}>{errorMessage2}</Text>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );

}
const style = StyleSheet.create({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  Header: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 35,
    paddingLeft: 22,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-around',

  },
  btnajout: {
    flexDirection: 'row',
    width: '90%',
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#f94990',
  },
  Modif1: {
    width: '98%',
    height: 550,
    backgroundColor: 'white',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    
  },
  imageContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',

  },
  image: {
    width: '30%',
    height: 150,
    borderRadius: 15,
    marginTop: 20,
    marginLeft: '2.5%',
  },
  Iconcontenu: {
    //left: 95,
    top: -30,
    width: '100%',
    height: 30,
    borderRadius: 50,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  imageajouter: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  Title: {
    color: '#79328d',
    fontSize: 17,
    // fontWeight: 'bold',
    paddingBottom: 10,
    marginTop: 10,
  },
  Ajouter: {
    fontSize: 12,
    // fontWeight: 'bold',
  },
  modalContent: {
    display: 'flex',
    width: 370,
    borderRadius: 20,
    backgroundColor: 'white',
    height: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    textAlign: 'center',
  },
  modalButtonText: {
    marginTop: 20,
    zIndex: 3,
    color: 'white',
  },
  modalText1: {
    zIndex: 3,
    color: 'white',
    marginLeft: 20,
    fontSize: 20,

  },
  modalText2: {
    zIndex: 3,
    color: 'white',
    marginLeft: 20,
    fontSize: 15,
  },
  closemodale: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: -35,
    top: -17

  },
  contenuerreurText: {
    width: 300,
    textAlign: 'center',
    top: -20,
  },
  CircleTrash: {
    height: 20,
    width: 20,
    backgroundColor: 'white',
    borderRadius: 100,
    right: 5,
    bottom: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PhotoModif;
