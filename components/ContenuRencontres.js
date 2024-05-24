import { TouchableOpacity, StyleSheet, Text, View, Image, Pressable, Animated, Modal, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { BASE_URL, BASE_URL_IMAGE } from "../helper/url";
import Ionicons from '@expo/vector-icons/Ionicons';
import Swiper from 'react-native-deck-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import SkeletonItem from '../components/skeleton/skeletonRencontre';
import defaultHommeAvatar from '../assets/Avatar/avatarhomme2.jpg';
import defaultfemmeAvatar from '../assets/Avatar/avatarfemme2.jpg';
import { useUser } from './context/usercontext';
import firebase from 'firebase/app';
import { getDatabase, ref, push, set, get } from 'firebase/database';
import FloatingHearts from '../components/FloatingHearts';
import { useTheme } from './context/usercontexttheme';
import * as Font from 'expo-font';
import loadFonts from './loadFonts';
import { BackHandler } from 'react-native';




const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) {
        return null; // Ou une valeur par défaut appropriée si nécessaire
    }
    const today = new Date();
    const yearOfBirth = parseInt(dateOfBirth.split('-')[0]);
    const age = today.getFullYear() - yearOfBirth;
    return age;
};

const defaultAvatar = (sexe) => {
    return sexe === 'homme' ? defaultHommeAvatar : defaultfemmeAvatar;
};

const ContenuRencontres = () => {
 
      useEffect(() => {
        loadFonts();
      }, []);
     
    const { Monprofil } = useUser();
    const Id = Monprofil && Monprofil.id ? Monprofil.id : 'defaultUserId';
    const navigation = useNavigation();
    const { isDarkMode } = useTheme();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [showMatchModal, setShowMatchModal] = useState(false);
    const [pseudo, setLikedUserName] = useState('');
    const shimmerAnimation = useRef(new Animated.Value(0)).current;
    const [showFloatingHearts, setShowFloatingHearts] = useState(true);
    const [blockedUsers, setBlockedUsers] = useState([]);
    useEffect(() => {
        Animated.loop(
            Animated.timing(shimmerAnimation, {
                toValue: 1,
                duration: 4000,
                useNativeDriver: true,
            })
        ).start();
    }, []);
   
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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const blockedUsersResponse = await fetch(BASE_URL + 'usersBlocked');
                if (!blockedUsersResponse.ok) {
                    throw new Error('Erreur lors de la récupération des utilisateurs bloqués');
                }
                const blockedUsersData = await blockedUsersResponse.json();
                setBlockedUsers(blockedUsersData);
                console.log('Blocked Users:', blockedUsersData); // Vérifier les utilisateurs bloqués


                /*// Calculer l'index de début et de fin pour la pagination
                const startIndex = (page - 1) * 10;
                const endIndex = page * 10;*/
                const usersResponse = await fetch(BASE_URL + 'users');
                if (!usersResponse.ok) {
                    throw new Error('Erreur lors de la récupération des utilisateurs');
                }
                const usersData = await usersResponse.json();

                // Filtrer les données pour ne pas inclure l'utilisateur connecté et ceux qui n'ont pas de photo
                const filteredData = usersData.filter(user => user.id !== Id && user.photo);

                // Filtrer les utilisateurs bloqués
                const finalData = filteredData.filter(user => {
                    const hasBlockedCurrentUser = blockedUsersData.some(blockedUser => blockedUser.blocking_user_id === Id && blockedUser.blocked_user_id === user.id);
                    const isBlockedByCurrentUser = blockedUsersData.some(blockedUser => blockedUser.blocked_user_id === Id && blockedUser.blocking_user_id === user.id);
                    return !hasBlockedCurrentUser && !isBlockedByCurrentUser;
                  });
                


                const formattedData = finalData.map(user => ({
                    pseudo: user.pseudo,
                    age: calculateAge(user.d_naissance),
                    situation: user.situation,
                    photo: user.photo,
                    sexe: user.sexe,
                    id: user.id
                }));

                // Mettre à jour les cartes existantes avec les nouvelles données paginées
                setCards(prevCards => [...prevCards, ...formattedData]);
                setLoading(false); // Marquer le chargement comme terminé
               
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
                setLoading(false); // Marquer le chargement comme terminé en cas d'erreur
            }
        };

        fetchData();
    }, [page, Id]); // Rafraîchir les données chaque fois que la page change ou lorsque les utilisateurs bloqués sont mis à jour

    const database = getDatabase();

    const swipeLeft = () => {
        swiperRef.swipeLeft();
    };

    const swipeRight = () => {
        swiperRef.swipeRight();
    };

    const insererDonnees = (likerId, likedUserId, likedUser) => {
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

    const checkMatches = async (userId, likedUserId) => {
        const likesRef = ref(database, 'likes');

        try {
            const snapshot = await get(likesRef);
            if (snapshot.exists()) {
                const likes = snapshot.val();

                // Vérifiez si l'utilisateur et l'utilisateur aimé ont des likes mutuels
                const currentUserLike = Object.values(likes).find(like =>
                    like.likerId === userId && like.likedUserId === likedUserId
                );

                const likedUserLike = Object.values(likes).find(like =>
                    like.likerId === likedUserId && like.likedUserId === userId
                );

                if (currentUserLike && likedUserLike) {
                    const likedUser = cards.find(user => user.id === likedUserId);
                    if (likedUser) {
                        setShowMatchModal(true);
                        setLikedUserName(likedUser.pseudo); // Utiliser le nom de l'utilisateur aimé
                    }
                }
            }
        } catch (error) {
            console.error('Erreur lors de la vérification des correspondances:', error);
        }
    };

    const onSwipedRight = (index) => {
        const swipedUser = cards[index];
        console.log('Swiped right:', swipedUser);
        insererDonnees(Id, swipedUser.Id, swipedUser);
        checkMatches(Id, swipedUser.Id);
    };

    const closeModal = () => {
        setShowMatchModal(false);
        setShowFloatingHearts(false);
    };
    const backgroundColor = shimmerAnimation.interpolate({
        inputRange: [0, 0.3, 0.5, 1],
        outputRange: ['#79328d', '#f94990', '#79328d', '#f94990'],
    });
    
    const onPressProfil = async (userData1) => {
        try {
            // Effectuer une requête pour récupérer les données de l'utilisateur correspondant à matchedUserId
            const response = await fetch(BASE_URL + 'users');
            const userData = await response.json();
            const filteredData = userData.filter(user => user.id == userData1);
            if (filteredData.length > 0) {
              const userData = filteredData[0]; // Accéder au premier élément du tableau
              console.log('userData:', userData);
              navigation.navigate('Profil', { userData });
            } else {
              console.error("Aucun utilisateur correspondant trouvé.");
              // Gérer le cas où aucun utilisateur correspondant n'est trouvé
            }
          } catch (error) {
            console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
            // Gérer l'erreur selon vos besoins
          }
    };
    


    return (
        <View style={[styles.Container, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
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
                                <Image source={card.photo ? { uri: BASE_URL_IMAGE+'profile/' + card.photo } : defaultAvatar(card.sexe)}
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
                                                <Text style={[styles.NOM ,{ fontFamily: 'nomrencotre-font',color: isDarkMode ? '#ffffff' : '#ffffff' }]}>{card.pseudo}, {card.age} ans</Text>
                                            </View>
                                            <View style={styles.INFO}>
                                                <Pressable style={styles.Icon} onPress={() => onPressProfil(card.id)}>
                                                    <Ionicons name="information-circle" size={25} color="white" />
                                                </Pressable>
                                            </View>
                                        </View>
                                        <Text style={[styles.Situation,{ fontFamily: 'custom-font'}]}>{card.situation}</Text>
                                    </View>
                                </LinearGradient>
                                <View style={styles.Pressable}>
                                    <View style={styles.Circle}>
                                        <TouchableOpacity style={styles.Icon} onPress={swipeLeft}>
                                            <Ionicons name="close" size={50}color={isDarkMode ? '#79328d' : 'black'}  />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.Circle1}>
                                        <TouchableOpacity style={styles.Icon} onPress={swipeRight}>
                                            <Ionicons name="heart" size={50}  color={isDarkMode ? '#79328d' : 'black'} />
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
                    onSwipedRight={onSwipedRight}
                    onSwiped={(cardIndex) => console.log('Card swiped:', cardIndex)}
                    onSwipedAll={() => console.log('All cards have been swiped')}
                    cardIndex={0}
                     backgroundColor={isDarkMode ? '#000000' : '#ffffff'}
                    stackSize={2}
                    verticalSwipeEnabled={false}
                    verticalSwipe={false}
                />
            )}

            <Modal
                animationIn="fadeIn"
                animationOut="fadeOut"
                animationType="slide"
                transparent={true}
                visible={showMatchModal}
                onRequestClose={closeModal}
                backdropOpacity={0}
            >

                <Animated.View
                    style={[
                        styles.modalContent,
                        { backgroundColor },
                    ]}
                >

                    <View style={styles.contenuerreurText}>

                        <Text style={styles.modalText1}>Félicitations !</Text>
                        <Text style={styles.modalText2}> Vous êtes matché avec{pseudo} </Text>
                        <Pressable onPress={onPressProfil} style={styles.modaleProfile} >
                            <Text style={styles.modalText3}>Voir Profil de {pseudo} </Text>
                        </Pressable>
                        <Pressable onPress={closeModal} style={styles.modaleProfile1} >
                            <Text style={styles.modalText4}>Igniorer</Text>
                        </Pressable>
                    </View>
                   
                </Animated.View>
            </Modal>
            {showMatchModal && <FloatingHearts />}
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        zIndex:5,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    closeButton: {
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline',
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
        marginBottom: 10,
    },
    modalText3: {
        zIndex: 3,
        color: 'white',
        textAlign: 'center',
      
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText4: {
        zIndex: 3,
        color: 'black',
        textAlign: 'center',
      
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
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
        top: 10,
    },
    modalContent: {
        display: 'flex',
        width: 370,
        borderRadius: 20,
        backgroundColor: 'red',
        height: 200,
        display: 'flex',
        alignItems: 'center',
        //  justifyContent: 'center',
        top: 300,
        left: 20,
        zIndex: 1,
        textAlign: 'center',
    },
    modaleProfile: {
        backgroundColor: '#07668f',
        marginTop: 10,
        width: 300,
        height: 40,
        borderRadius: 20,
        justifyContent:'center',
    },
    modaleProfile1: {
        backgroundColor: 'white',
        marginTop: 10,
        width: 300,
        height: 40,
        borderRadius: 20,
        justifyContent:'center',
    },
});

export default ContenuRencontres;
