import { StyleSheet, Text, View, Image, Pressable, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { BASE_URL } from "../helper/url";
import { useState, useEffect } from 'react';
import SkeletonItem from '../components/skeleton/skeletonSuggestion';
import defaultHommeAvatar from '../assets/Avatar/avatarhomme2.jpg';
import defaultfemmeAvatar from '../assets/Avatar/avatarfemme2.jpg';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './context/usercontext';
import { useTheme } from './context/usercontexttheme';
import { BackHandler } from 'react-native';


const Suggestion = () => {
    const { Monprofil } = useUser();
    const Id = Monprofil && Monprofil.Id ? Monprofil.Id : 'defaultUserId';
    const navigation = useNavigation();
    const { isDarkMode } = useTheme();
    const [donnees, setDonnees] = useState([]);
    const [loading, setLoading] = useState(true);
    const onPressProfil = (userData) => {
        console.log("Données utilisateur:", userData);
        navigation.navigate('Profil', { userData: userData });
      };

      const handleBackPress = () => {
        navigation.goBack(); // Revenir à l'écran précédent
        return true; // Indiquer que l'événement a été géré
    };
    
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
        return () => {
            backHandler.remove(); // Supprimer l'écouteur lors du démontage du composant
        };
    }, []);




      useEffect(() => {
        fetch(BASE_URL + 'users')
          .then(response => response.json())
          .then(data => {
            // Filtrer les données pour ne pas inclure l'utilisateur connecté
            const filteredData = data.filter(item => item.Id !== Id && item.img_link);
            setDonnees(filteredData);
            setTimeout(() => setLoading(false), 5000);
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
            setLoading(false);
          });
          
      }, []);
      const defaultAvatar = (sexe) => {
        return sexe === 'Homme' ? defaultHommeAvatar : defaultfemmeAvatar;
      };

    const renderSkeletonItems = () => {
        const skeletonItems = [];
        for (let i = 0; i < 5; i++) {
            skeletonItems.push(<SkeletonItem key={i} />);
        }
        return skeletonItems;
    };

    const renderSuggestionItems = () => {
        return donnees.map((item, index) => (
            
            <View style={styles.cardsugg} key={index}>
            <Pressable onPress={() => onPressProfil(item)}>
                <View style={styles.ImagContainer}>
                    <Image
                          source={item.img_link ? { uri: BASE_URL + item.img_link } : defaultAvatar(item.Sexe)}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.Nom}>{item.Nom}</Text>
                </Pressable>
            </View>
        ));
    };

    return (
        <View  style={[styles.Container, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
            <Text style={styles.Text}>Suggestions</Text>
            <ScrollView horizontal={true} style={styles.scrollView} showsHorizontalScrollIndicator={false}>
                <View style={styles.contenusug}>
                    {loading ? renderSkeletonItems() : renderSuggestionItems()}
                </View>
            </ScrollView>
            <View style={styles.contenuVoir}>
                <Pressable style={styles.Boutton}><Text style={styles.VoirTout}>Voir Tout</Text></Pressable>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    Container: {
        height: 380,
    },
    contenusug: {
        display: 'flex',
        width:'100%',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-betwen',
                                                
    },
    cardsugg: {
        width: 150,
        height: 230,
        borderRadius: 10,
        marginLeft: 10,
        borderStyle: 'solid',
        
    
        


    },
    Text: {
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'modal-font',
        marginLeft:10,
    },
    scrollView: {
        flex: 1,
    },
    card: {
        width: '50%',
        height: 250,
        borderRadius: 10,

        marginLeft: 10,
        borderStyle: 'solid',
        borderColor: 'lightgrey',
        borderWidth: 2,

    },
    Boutton: {
        width: 200,
        height: 20,
        textAlign: 'center',
        borderRadius: 17,
        paddingTop:3,
        backgroundColor:'#79328d',
        
    },
    VoirTout:{
        textAlign: 'center',
        fontFamily: 'custom-font',
        fontSize:13,
        color:'white',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 7,
    },
    Nom:{
        marginTop:7,
        marginLeft:2,
        fontSize:12,
        fontFamily: 'custom-font',
    },
    contenuVoir:{
        alignItems:'center',
        justifyContent:'flex-start',
        top:-80,
    },
    


})


export default Suggestion