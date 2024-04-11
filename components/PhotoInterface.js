import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "../helper/url";
import { useRoute } from '@react-navigation/native';
import defaultHommeAvatar from '../assets/Avatar/avatarhomme2.jpg';
import defaultfemmeAvatar from '../assets/Avatar/avatarfemme2.jpg';



function PhotoModif() {
  const route = useRoute();
  const userData = route.params.userData;
  const userId = userData.Id;
  const [donnees, setDonnees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [img_link, setImgLink] = useState('');
  const [img_couverture, setImgcouverture] = useState('');
  const defaultAvatar = userData.Sexe === 'Homme' ? defaultHommeAvatar : defaultfemmeAvatar;
  useEffect(() => {
    fetch(BASE_URL + 'users')
      .then(response => response.json())
      .then(data => {
        const filteredData = data.filter(user => user.Id === userId); // Filtrer les données par l'ID de l'utilisateur
        setDonnees(filteredData);
        setLoading(false);

        if (filteredData.length > 0) {
          // Mettre à jour l'URL de l'image si des données filtrées sont disponibles
          setImgLink(filteredData[0].img_link);
          setImgcouverture(filteredData[0].img_couverture);

        }

      })

      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false);
      });
  }, [userId]);

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
            </View>
          </View>
        );
      } else {
        return null; // Retourne null si l'image n'existe pas pour cet emplacement
      }
    })
  ) : null;

  return (
    <View style={style.Container}>
      <View style={style.Modif1}>
        <View style={style.imageContainer}>
          <View style={style.image}>
            <Image source={userData.img_link ? { uri: BASE_URL + img_link } : defaultAvatar}
              style={style.imageajouter}></Image>
            <View style={style.Iconcontenu}>
            </View>
          </View>
          <View style={style.image}>
            <Image source={userData.img_link ? { uri: BASE_URL + img_couverture } : defaultAvatar}
              style={style.imageajouter}></Image>
            <View style={style.Iconcontenu}>
            </View>
          </View>
          {imagesJSX}
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    //  alignItems: 'center',
    width: '100%',
  },
  Modif1: {
    width: '98%',
    height: 570,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  imageContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  image: {
    width: '30%',
    height: 150,
    borderRadius: 15,
    marginTop: 20,
    marginLeft: '3%',
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  Iconcontenu: {
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
});

export default PhotoModif;
