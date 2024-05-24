import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, Image, Modal, TouchableOpacity, Pressable, Keyboard, StyleSheet } from "react-native";
import { useUser } from './context/usercontext';
import { useRoute } from '@react-navigation/native';
import { useTheme } from './context/usercontexttheme';
import { BASE_URL, BASE_URL_IMAGE } from "../helper/url";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Font from 'expo-font';

const ContenuMessage = () => {
    const scrollViewRef = useRef(); // Référence pour scroller automatiquement au dernier message
    const [messages, setMessages] = useState([]); // État pour stocker les messages
    const { Monprofil } = useUser(); // Utilisation du contexte utilisateur
    const route = useRoute(); // Utilisation du hook de navigation pour obtenir les paramètres de la route
    const { isDarkMode } = useTheme(); // Utilisation du contexte thème pour le mode sombre
    const userData = route.params.userData; // Données de l'utilisateur passées via la route
    const Idenvoyermes = Monprofil && Monprofil.id ? Monprofil.id : 'defaultUserId'; // ID de l'utilisateur courant
    const Id = userData && userData.id ? userData.id : 'defaultUserId'; // ID de l'utilisateur de la conversation
    const [isLoading, setIsLoading] = useState(false); // État de chargement des images
    const [loadingProgress, setLoadingProgress] = useState(0); // État de progression de chargement des images
    const [Nomenvoyermes, setNomenvoyermes] = useState(''); // Nom de l'utilisateur courant
    const [Idrecusmes, setIdRecusmes] = useState(''); // ID du destinataire du message
    const [Imagesenvoyermes, setImagesenvoyermes] = useState(''); // Image de profil de l'utilisateur courant
    const [isModalOpen, setIsModalOpen] = useState(false); // État de la modal d'image
    const [modalImage, setModalImage] = useState(''); // Image affichée dans la modal

    // Fonction pour ouvrir et fermer la modal d'image
    const toggleModal = (image) => {
        setModalImage(image);
        setIsModalOpen(!isModalOpen);
    };

    // Fonction pour charger les polices personnalisées
    const loadFonts = async () => {
        await Font.loadAsync({
            'custom-font': require('../assets/Fonts/Lato-Bold.ttf'),
            'custom-fontmessage': require('../assets/Fonts/Montserrat-Regular.ttf')
        });
    };

    // Chargement des polices au montage du composant
    useEffect(() => {
        loadFonts();
    }, []);

    // Chargement des messages depuis l'API
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`${BASE_URL}/messenger/getDiscussion?page=0&pseudo=${userData.pseudo}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                if (result.messages) {
                    setMessages(result.messages);
                    setNomenvoyermes(result.friend.pseudo);
                    setIdRecusmes(result.friend.id);
                    setImagesenvoyermes(result.friend.photo);

                    // Scroll automatique jusqu'au dernier message
                    if (scrollViewRef.current) {
                        scrollViewRef.current.scrollToEnd({ animated: true });
                    }
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [Idenvoyermes, userData.pseudo]);

    // Fonction pour calculer la différence de temps entre maintenant et le timestamp du message
    const calculateTimeDifference = (timestamp) => {
        const currentTime = Date.now();
        const messageTime = new Date(timestamp).getTime();
        const timeDiff = currentTime - messageTime;
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));

        if (minutesDiff < 1) {
            return "à l'instant";
        } else if (minutesDiff < 60) {
            return `${minutesDiff} minute${minutesDiff > 1 ? 's' : ''}`;
        } else if (minutesDiff < 1440) { // Moins de 24 heures
            const hoursDiff = Math.floor(minutesDiff / 60);
            return `${hoursDiff} heure${hoursDiff > 1 ? 's' : ''}`;
        } else { // Plus de 24 heures
            const daysDiff = Math.floor(minutesDiff / 1440);
            return `${daysDiff} jour${daysDiff > 1 ? 's' : ''}`;
        }
    };

    // Gestionnaire d'événement pour détecter la fermeture du clavier
    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                // Scroll jusqu'au dernier message
                if (scrollViewRef.current) {
                    scrollViewRef.current.scrollToEnd({ animated: true });
                }
            }
        );
        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <ScrollView ref={scrollViewRef}>
            <View style={style.contenumessage}>
                {/* En-tête de la conversation avec le profil de l'utilisateur */}
                <View style={style.profil}>
                    <View style={style.porteurimage}>
                        <Image
                            source={{ uri: Imagesenvoyermes ? BASE_URL_IMAGE + Imagesenvoyermes : (userData.photo ? BASE_URL_IMAGE + 'profile/' + userData.photo : 'default') }}
                            style={style.image}
                        />
                    </View>
                    <View style={style.porteurNom}>
                        <Text style={{ ...style.porteurText, fontFamily: 'custom-font', fontSize: 25, fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>
                            {Nomenvoyermes || userData.pseudo}
                        </Text>
                    </View>
                    <View style={style.porteurText}>
                        <Text style={{ ...style.porteurText, fontFamily: 'custom-font', fontSize: 20, fontWeight: 'bold', marginRight: 10, color: isDarkMode ? '#f94990' : '#f94990' }} >Tafa</Text>
                        <Text style={{ ...style.porteurText, fontFamily: 'custom-fontmessage', fontSize: 15, fontWeight: 'light', marginRight: 10, color: isDarkMode ? '#ffffff' : '#000000' }} >Permet de Vous Rencontrer</Text>
                    </View>
                </View>

                {/* Affichage des messages */}
                {messages.map((message, index) => (
                    <View key={index}>
                        {/* Si l'utilisateur courant est l'expéditeur */}
                        {message.sender === Idenvoyermes ? (
                            <View style={style.Container}>
                                {/* Affichage du texte du message */}
                                {message.contenuMessage && !message.pieceJointe && (
                                    <View style={{
                                        ...style.messages,
                                        backgroundColor: isDarkMode ? '#81a9e7' : '#0084ff',
                                        width: message.contenuMessage.length < 10 ? '25%' :
                                            message.contenuMessage.length < 15 ? '25%' :
                                                message.contenuMessage.length < 20 ? '30%' :
                                                    message.contenuMessage.length < 30 ? '40%' :
                                                        message.contenuMessage.length < 40 ? '50%' :
                                                            message.contenuMessage.length < 50 ? '60%' :
                                                                message.contenuMessage.length < 60 ? '70%' :
                                                                    '70%'
                                    }}>
                                        <Text style={{ ...style.messagesTExt, color: isDarkMode ? '#000000' : '#ffffff' }}> {message.contenuMessage}</Text>
                                    </View>
                                )}
                                {/* Affichage de l'image envoyée */}
                                {message.pieceJointe && !message.contenuMessage && (
                                    <View style={style.Contenuimages}>
                                        <Pressable onPress={() => toggleModal(message.pieceJointe)}>
                                            <Image
                                                source={{ uri: BASE_URL_IMAGE + 'message/' + message.pieceJointe }}
                                                style={style.images}
                                                onLoadStart={() => setIsLoading(true)}
                                                onLoadEnd={() => setIsLoading(false)}
                                                onProgress={(event) => setLoadingProgress(Math.round((event.nativeEvent.loaded / event.nativeEvent.total) * 100))}
                                            />
                                        </Pressable>
                                    </View>
                                )}
                                {/* Affichage de l'emoji envoyé */}
                                {message.emoji && !message.contenuMessage && (
                                    <View style={style.Contenuemojierepons}>
                                        <Text style={{ fontSize: 30 }}>{message.emoji}</Text>
                                    </View>
                                )}
                                {/* Affichage de l'heure d'envoi du message */}
                                <Text style={style.time1}>{calculateTimeDifference(message.dateSent)}</Text>
                            </View>
                        ) : (
                            < View style={style.reponseContainer}>///* Si l'utilisateur courant est le destinataire */
                                <View style={style.porteurimagereponse}>
                                    <Image
                                        source={{ uri: BASE_URL + Imagesenvoyermes }}
                                        style={style.imagereponse}
                                    />
                                </View>
                                <View style={style.reponsesousContainer}>
                                    {/* Affichage du texte du message reçu */}
                                    {message.contenuMessage && !message.pieceJointe && (
                                        <View style={{
                                            ...style.Repons,
                                            backgroundColor: isDarkMode ? '#3c4043' : '#e7e8ea',
                                            width: message.contenuMessage.length < 10 ? '25%' :
                                                message.contenuMessage.length < 15 ? '25%' :
                                                    message.contenuMessage.length < 20 ? '30%' :
                                                        message.contenuMessage.length < 30 ? '40%' :
                                                            message.contenuMessage.length < 40 ? '50%' :
                                                                message.contenuMessage.length < 50 ? '60%' :
                                                                    message.contenuMessage.length < 60 ? '70%' :
                                                                        '70%'
                                        }}>
                                            <Text style={{ ...style.ReponsTExt, color: isDarkMode ? '#ffffff' : '#000000' }}> {message.contenuMessage}</Text>
                                        </View>
                                    )}
                                    {/* Affichage de l'image reçue */}
                                    {message.pieceJointe && !message.contenuMessage && (
                                        <View style={style.Contenuimagesrepons}>
                                            <Pressable onPress={() => toggleModal(message.pieceJointe)}>
                                                <Image
                                                    source={{ uri: BASE_URL_IMAGE + 'message/' + message.pieceJointe }}
                                                    style={style.images}
                                                />
                                            </Pressable>
                                        </View>
                                    )}
                                    {/* Affichage de l'emoji reçu */}
                                    {message.emoji && !message.contenuMessage && (
                                        <View style={style.Contenuemojierepons}>
                                            <Text style={{ fontSize: 30 }}>{message.emoji}</Text>
                                        </View>
                                    )}
                                    {/* Affichage de l'heure de réception du message */}
                                    <Text style={style.time2}>{calculateTimeDifference(message.dateSent)}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                ))}
                {/* Modal pour afficher les images en plein écran */}
                <Modal visible={isModalOpen} transparent={true} animationType="fade">
                    <View style={style.Modal}>
                        <View style={style.modalContainer}>
                            <View style={style.modalContainerImage}>
                                <TouchableOpacity style={style.modalclose} onPress={toggleModal}>
                                    <Ionicons name="close" size={30} color='#f94990' />
                                </TouchableOpacity>
                                <Image
                                    source={{ uri: BASE_URL + modalImage }}
                                    style={style.modalImage}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView >
    );
};

const style = StyleSheet.create({
    contenumessage: {
        flex: 1,
        padding: 10
    },
    profil: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    porteurimage: {
        marginRight: 10
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    porteurNom: {
        flex: 1
    },
    porteurText: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    Container: {
        alignItems: 'flex-end',
        marginBottom: 10
    },
    messages: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 5
    },
    messagesTExt: {
        fontSize: 16
    },
    Contenuimages: {
        marginBottom: 5
    },
    images: {
        width: 200,
        height: 200,
        borderRadius: 10
    },
    Contenuemojierepons: {
        marginBottom: 5
    },
    time1: {
        fontSize: 12,
        textAlign: 'right'
    },
    reponseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    porteurimagereponse: {
        marginRight: 10
    },
    imagereponse: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    reponsesousContainer: {
        flex: 1
    },
    Repons: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 5
    },
    ReponsTExt: {
        fontSize: 16
    },
    Contenuimagesrepons: {
        marginBottom: 5
    },
    time2: {
        fontSize: 12
    },
    Modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '90%',
        height: '90%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 10
    },
    modalContainerImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalclose: {
        position: 'absolute',
        top: 20,
        right: 20
    },
    modalImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
});

export default ContenuMessage;


