import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, ScrollView, Image, Modal, TouchableOpacity, Pressable, Keyboard } from "react-native";
import { useUser } from './context/usercontext';
import { useRoute } from '@react-navigation/native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useTheme } from './context/usercontexttheme';
import { BASE_URL } from "../helper/url";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Font from 'expo-font';

const ContenuMessage = () => {
    const scrollViewRef = useRef();
    const [messages, setMessages] = useState([]);
    const { Monprofil } = useUser();
    const route = useRoute();
    const { isDarkMode } = useTheme();
    const userData = route.params.userData;
    const Idenvoyermes = Monprofil && Monprofil.Id ? Monprofil.Id : 'defaultUserId';
    const Id = userData && userData.Id ? userData.Id : 'defaultUserId';
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [donnees, setDonnees] = useState([]);
    const [Nomenvoyermes, setNomenvoyermes] = useState('');
    const [Idrecusmes, setIdRecusmes] = useState('');
    const [Images, setImages] = useState('');
    const [Imagesenvoyermes, setImagesenvoyermes] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const loadFonts = async () => {
        await Font.loadAsync({
            'custom-font': require('../assets/Fonts/Lato-Bold.ttf'),
            'custom-fontmessage': require('../assets/Fonts/Montserrat-Regular.ttf')
        });
    };

    useEffect(() => {
        loadFonts();
    }, []);
    useEffect(() => {


        const fetchData = async () => {
            try {
                const db = getDatabase();
                const visitesRef = ref(db, 'Messages');

                onValue(visitesRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const messagesData = Object.keys(data).map((key) => ({ id: key, ...data[key] }));

                        // Filtrer les messages associés à Idvisited et les réponses associées à Id
                        const filteredMessages = messagesData.filter(message => {
                            if (message.Idenvoyermes === Idenvoyermes && message.Idrecusmes === Id) {
                                setImages(message.Images);
                                return true; // Si les IDs correspondent, c'est un message
                            } else if (message.Idenvoyermes === Id && message.Idrecusmes === Idenvoyermes) {
                                setNomenvoyermes(message.Nomenvoyermes);

                                setIdRecusmes(message.Idrecusmes);
                                setImagesenvoyermes(message.profilenvoyermes);

                                return true; // Si les IDs inversés correspondent, c'est une réponse
                            } else {
                                return false; // Autrement, ne pas inclure
                            }
                        });
                        console.log('sary', Images);
                        setMessages(filteredMessages);
                        // Scroll automatiquement jusqu'au dernier message
                        if (scrollViewRef.current) {
                            scrollViewRef.current.scrollToEnd({ animated: true });
                        }
                    } else {
                        console.log('Aucune donnée de visite trouvée.');
                    }
                });
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchData();
    }, [Idenvoyermes]); // Exécuter l'effet uniquement lorsque Idvisited change
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
            <View style={[style.contenumessage, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
                <View style={style.profil}>
                    <View style={style.porteurimage}>
                        <Image
                            source={{ uri: Imagesenvoyermes ? BASE_URL + Imagesenvoyermes : (userData.img_link ? BASE_URL + userData.img_link : '') }}
                            style={style.image}
                        />
                    </View>
                    <View style={style.porteurNom}>
                        <Text style={{ fontFamily: 'custom-font',fontSize: 25, fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>
                            {Nomenvoyermes || userData.Nom}
                        </Text>
                    </View>
                    <View style={style.porteurText}>
                        <Text style={{ fontFamily: 'custom-font', fontSize: 20, fontWeight: 'bold', marginRight: 10, color: isDarkMode ? '#f94990' : '#f94990' }} >Tafa</Text>
                        <Text style={{ fontFamily: 'custom-fontmessage', fontSize: 15, fontWeight: 'light', marginRight: 10, color: isDarkMode ? '#ffffff' : '#000000' }} >Permet de Vous Rencontrer</Text>
                    </View>
                </View>
                {messages.map((message, index) => (
                    <View key={index} >
                        {message.Idenvoyermes === Idenvoyermes ? (
                            <View style={style.Container}>
                                {message.inputValue && !message.Images && (
                                    <View style={[
                                        style.messages,
                                        {
                                            backgroundColor: isDarkMode ? '#81a9e7' : '#0084ff',
                                            width: message.inputValue.length < 10 ? '25%' :
                                                message.inputValue.length < 15 ? '25%' :
                                                    message.inputValue.length < 20 ? '30%' :
                                                        message.inputValue.length < 30 ? '40%' :
                                                            message.inputValue.length < 40 ? '50%' :
                                                                message.inputValue.length < 50 ? '60%' :
                                                                    message.inputValue.length < 60 ? '70%' :
                                                                        message.inputValue.length < 60 ? '70%' : '70%'
                                        }
                                    ]}>
                                        <Text style={[style.messagesTExt, { fontFamily: 'custom-fontmessage', color: isDarkMode ? '#000000' : '#ffffff' }]}> {message.inputValue}</Text>
                                    </View>
                                )}
                                {message.Images && !message.inputValue && (
                                    <View style={style.Contenuimages}>
                                        <Pressable onPress={toggleModal}>
                                            <Image
                                                source={{ uri: BASE_URL + message.Images }}
                                                style={style.images}
                                                onLoadStart={() => setIsLoading(true)}
                                                onLoadEnd={() => setIsLoading(false)}
                                                onProgress={(event) => setLoadingProgress(Math.round((event.nativeEvent.loaded / event.nativeEvent.total) * 100))}
                                            />
                                        </Pressable>
                                    </View>
                                )}
                                <Text style={[style.time1, {fontFamily: 'custom-fontmessage', color: 'grey' }]}>{calculateTimeDifference(message.timestamp)}</Text>
                            </View>
                        ) : (
                            <View style={style.reponseContainer}>
                                <View style={style.porteurimagereponse}>
                                    <Image
                                        source={{ uri: BASE_URL + Imagesenvoyermes }}
                                        style={style.imagereponse}
                                    />
                                </View>
                                <View style={style.reponsesousContainer}>
                                    {message.inputValue && !message.Images && (
                                        <View style={[
                                            style.Repons,
                                            {
                                                backgroundColor: isDarkMode ? '#3c4043' : '#e7e8ea',
                                                width: message.inputValue.length < 10 ? '25%' :
                                                    message.inputValue.length < 15 ? '25%' :
                                                        message.inputValue.length < 20 ? '30%' :
                                                            message.inputValue.length < 30 ? '40%' :
                                                                message.inputValue.length < 40 ? '50%' :
                                                                    message.inputValue.length < 50 ? '60%' :
                                                                        message.inputValue.length < 60 ? '70%' :
                                                                            message.inputValue.length < 60 ? '70%' : '70%'
                                            }
                                        ]}>
                                            <Text style={[style.ReponsTExt, { fontFamily: 'custom-fontmessage', color: isDarkMode ? '#ffffff' : '#000000' }]}> {message.inputValue}</Text>
                                        </View>
                                    )}
                                    {message.Images && !message.inputValue && (
                                        <View style={style.Contenuimagesrepons}>
                                            <Pressable onPress={toggleModal}>
                                                <Image
                                                    source={{ uri: BASE_URL + message.Images }}
                                                    style={style.images}
                                                />
                                            </Pressable>
                                        </View>
                                    )}
                                    <Text style={[style.time2,{ fontFamily: 'custom-fontmessage',}]}>{calculateTimeDifference(message.timestamp)}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                ))}
                <Modal visible={isModalOpen} transparent={true} animationType="fade"   >
                    <View style={style.Modal}>
                        <View style={style.modalContainer}>
                            <View style={style.modalContainerImage}>
                                <TouchableOpacity style={style.modalclose} onPress={toggleModal}>
                                    <Ionicons name="close" size={30} color='#f94990' />
                                </TouchableOpacity>
                                <Image
                                    source={{ uri: BASE_URL + Images }}
                                    style={style.modalImage}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    contenumessage: {
        paddingTop: 10,
        width: '100%',
        height: '100%',
        paddingBottom: 100,
        display: 'flex',
        flexDirection: 'column',
    },
    Container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-end',
        paddingRight: '3%',
    },
    messages: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        padding: 10,
        marginTop: 20,
        backgroundColor: '#0084ff',
    },
    reponseContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 10,
    },
    reponsesousContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-start',
    },
    Repons: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 10,
        backgroundColor: '#e7e8ea',
        marginTop: 10,
    },
    ReponsTExt: {
        color: 'black',
        fontSize: 14,
    },
    messagesTExt: {
        color: 'white',
        fontSize: 14,
    },
    time1: {
        fontSize: 10,
        textAlign: 'right',
    },
    time2: {
        color: 'grey',
        fontSize: 10,
        textAlign: 'right',
    },
    Contenuimages: {
        width: '50%',
        height: 230,
        borderRadius: 15,
        marginTop: 20,
        borderColor: '#0084ff',
    },
    Contenuimagesrepons: {
        width: '50%',
        height: 230,
        borderRadius: 20,
        marginTop: 20,
        borderColor: '#e7e8ea',
    },
    images: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    loadingContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    profil: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 200,
    },
    porteurimage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: 'grey',
    },
    porteurimagereponse: {
        width: 35,
        height: 'auto',
        justifyContent: 'flex-end',
        paddingBottom: 8,
    },
    imagereponse: {
        width: 30,
        height: 30,
        borderRadius: 50,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    porteurNom: {
        width: 300,
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    porteurText: {
        width: 300,
        height: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainerImage: {
        width: '95%',
        height: '70%',
    },
    modalImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        zIndex: 1,
    },
    modalclose: {
        backgroundColor: 'white',
        width: 30,
        height: 30,
        position: 'absolute',
        right: -10,
        top: -15,
        borderRadius: 50,
        zIndex: 5,
    },
    Modal: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        height: "100%"
    },
});

export default ContenuMessage;
