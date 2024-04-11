import { TouchableOpacity, StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { BASE_URL } from "../helper/url";
import Ionicons from '@expo/vector-icons/Ionicons';
import Swiper from 'react-native-deck-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import SkeletonItem from '../components/skeleton/skeletonRencontre';
import defaultHommeAvatar from '../assets/Avatar/avatarhomme2.jpg';
import defaultfemmeAvatar from '../assets/Avatar/avatarfemme2.jpg';
import { useUser } from './context/usercontext';
import 'firebase/database';
import firebase from 'firebase/app';
import { getDatabase, ref, push, set } from 'firebase/database';




const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const yearOfBirth = parseInt(dateOfBirth.split('/')[2]); // Récupérer l'année de naissance et la convertir en nombre entier
    const age = today.getFullYear() - yearOfBirth;
    return age;
};
;

const defaultAvatar = (sexe) => {
    return sexe === 'Homme' ? defaultHommeAvatar : defaultfemmeAvatar;
};


const ContenuRencontres = () => {
    const { Monprofil } = useUser();
    const Id = Monprofil && Monprofil.Id ? Monprofil.Id : 'defaultUserId';
    const navigation = useNavigation();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    
    const onPressProfil = () => {
        navigation.navigate('Profil');
    };


    useEffect(() => {
        setLoading(true); // Définir le chargement comme actif avant de récupérer les données

        // Calculer l'index de début et de fin pour la pagination
        const startIndex = (page - 1) * 10;
        const endIndex = page * 10;

        fetch(`${BASE_URL}users?_start=${startIndex}&_end=${endIndex}`)
            .then(response => response.json())
            .then(data => {
                // Filtrer les données pour ne pas inclure l'utilisateur connecté et ceux qui n'ont pas de img_link
                const filteredData = data.filter(user => user.Id !== Id && user.img_link);
                const filteredByGender = filteredData.filter(user => {
                    if (Monprofil.Sexe === 'Homme') {
                        return user.Sexe === 'Femme';
                    } else if (Monprofil.Sexe === 'Femme') {
                        return user.Sexe === 'Homme';
                    }
                });
                const formattedData = filteredData.map(user => ({
                    nom: user.Nom,
                    age: calculateAge(user.Date_de_naissance),
                    Situation: user.Situation,
                    Images: user.img_link,
                    Sexe: user.Sexe,
                    Id: user.Id
                }));
                // Mettre à jour les cartes existantes avec les nouvelles données paginées
                setCards(prevCards => [...prevCards, ...formattedData]);
                setLoading(false); // Marquer le chargement comme terminé
                console.log('Données récupérées avec succès :', data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données:', error);
                setLoading(false); // Marquer le chargement comme terminé en cas d'erreur
            });
    }, [page]); // Rafraîchir les données chaque fois que la page change

    // Fonction pour charger plus de membres lors du défilement
    const loadMoreMembers = () => {
        setPage(prevPage => prevPage + 1); // Augmenter le numéro de page pour récupérer les membres suivants
    };

    const firebaseConfig = {
        apiKey: "AIzaSyCql_o_TZT7-bbBYY9PTa_ee8VfdaMQo4g",
        authDomain: "tafa1-2a9e0.firebaseapp.com",
        databaseURL: "https://tafa1-2a9e0-default-rtdb.firebaseio.com",
        projectId: "tafa1-2a9e0",
        storageBucket: "tafa1-2a9e0.appspot.com",
        messagingSenderId: "444808821936",
        appId: "1:444808821936:web:243a5339773f19185dcf75",
        measurementId: "G-GZEMBD98F4"
    };
    //const app = initializeApp(firebaseConfig);
    const database = getDatabase();

    const swipeLeft = () => {
        swiperRef.swipeLeft();
    };

    const swipeRight = () => {
        swiperRef.swipeRight();
    };
    const insererDonnees = (likerId, likedUserId,likedUser) => {
        try {
            const newDataRef = push(ref(database, 'likes'));
            set(newDataRef, {
                likerId: likerId,
                likedUserId: likedUserId,
                likedUserProfile: likedUser
            });
        } catch (error) {
            console.error('Erreur lors de l\'insertion des données:', error);
        }
    };
    const onSwipedRight = (index) => {
        const swipedUser = cards[index];
        console.log('Swiped right:', swipedUser);
        insererDonnees(Id, swipedUser.Id,swipedUser);
    };




    return (
        <View style={styles.Container}>
            {loading ? (
                <View style={styles.skeletonContainer}>
                    {[...Array(1)].map((_, index) => (
                        <SkeletonItem key={index} />
                    ))}
                </View>
            ) : (
                <Swiper
                    cardHorizontalMargin={10}
                    cardVerticalMargin={35}
                    ref={(swiper) => (swiperRef = swiper)}
                    cards={cards}
                    renderCard={(card) => {
                        if (!card) return null;
                        return (
                            <View style={styles.ImageContainer}>
                                <Image source={card.Images ? { uri: BASE_URL + card.Images } : defaultAvatar(card.Sexe)}
                                    style={styles.BackgroundImage} />
                                <LinearGradient
                                    colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0)']}
                                    style={{
                                        height: 80, alignItems: 'center', borderRadius: 5, borderTopLeftRadius: 15,
                                        borderTopRightRadius: 15,
                                    }}>
                                    <View style={styles.Text}>
                                        <View style={styles.NomEtInfoContenu}>
                                            <View style={styles.NomEtInfoContenu}>
                                                <Text style={styles.NOM}>{card.nom}, {card.age} ans</Text>
                                            </View>
                                            <View style={styles.INFO}>
                                                <Pressable style={styles.Icon} onPress={swipeRight}>
                                                    <Ionicons name="information-circle" size={25} color="white" />
                                                </Pressable>
                                            </View>
                                        </View>
                                        <Text style={styles.Situation}>{card.Situation}</Text>
                                    </View>
                                </LinearGradient>
                                <View style={styles.Pressable}>
                                    <View style={styles.Circle}>
                                        <TouchableOpacity style={styles.Icon} onPress={swipeLeft}>
                                            <Ionicons name="close" size={50} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.Circle1}>
                                        <TouchableOpacity style={styles.Icon} onPress={swipeRight}>
                                            <Ionicons name="heart" size={50} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <LinearGradient
                                    colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.7)']}
                                    style={{
                                        height: 50, alignItems: 'center', borderBottomLeftRadius: 15,
                                        borderBottomRightRadius: 15,
                                    }}></LinearGradient>
                            </View>
                        );
                    }}
                    // onSwipedLeft={(index) => onSwipedLeft(index)} // Passez l'index à la fonction onSwipedLeft
                    onSwipedRight={onSwipedRight}
                    onSwiped={(cardIndex) => console.log('Card swiped:', cardIndex)}
                    onSwipedAll={() => console.log('All cards have been swiped')}
                    cardIndex={0}
                    backgroundColor="white"
                    stackSize={2}
                    verticalSwipeEnabled={false}
                    verticalSwipe={false}
                />
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    skeletonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    BackgroundImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: 'auto',
        borderRadius: 15,
        overflow: 'hidden',
    },
    ImageContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '87%',
        justifyContent: 'space-between',
        marginTop: -20,
    },
    Text: {
        display: 'flex',
        width: '100%',
        height: 80,
        flexDirection: 'column',
        paddingLeft: 20,
        paddingTop: 10,
        position: 'absolute',
    },
    NomEtAge: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    NomEtInfoContenu: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    NOM: {
        width: '80%',
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    INFO: {
        width: '42%',
        display: 'flex',
        alignItems: 'flex-end',
    },
    Situation: {
        color: 'white',
    },
    Pressable: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        bottom: 0,
        position: 'absolute',
        paddingBottom: 40,
    },
    Circle: {
        display: 'flex',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginRight: 5,
    },
    Circle1: {
        display: 'flex',
        borderRadius: 50,
        width: 60,
        paddingTop: 5,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft: 5,

    }
});

export default ContenuRencontres
