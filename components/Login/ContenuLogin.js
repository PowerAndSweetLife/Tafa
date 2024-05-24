import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BASE_URL } from "../../helper/url";
import { useUser } from '../context/usercontext';
import * as Font from 'expo-font'
import loadFonts from '../loadFonts';


const logo = require('../../assets/images/logo.png');

const ContenuLogin = () => {
    const navigation = useNavigation();
    const [Email, setEmail] = useState('');
    const [Mots_de_passe, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [messagedError, setMessageError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [userId, setuserId] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { setMonprofil } = useUser();
    const [isFontLoaded, setIsFontLoaded] = useState(false);

    const handleLogin = () => {
        // Vérifier si les deux champs sont vides
        if (!Email && !Mots_de_passe) {
            setEmailError('Veuillez saisir votre adresse e-mail.');
            setPasswordError('Veuillez saisir votre mot de passe.');
        }
        // Vérifier si l'e-mail est vide
        else if (!Email) {
            setEmailError('Veuillez saisir votre adresse e-mail.');
            setPasswordError('');
        }
        // Vérifier si le mot de passe est vide
        else if (!Mots_de_passe) {
            setEmailError('');
            setPasswordError('Veuillez saisir votre mot de passe.');
        }
        // Si aucun des champs n'est vide, effacer les messages d'erreur
        else {
            setEmailError('');
            setPasswordError('');
        }
    };

    //visibilité de mot de passe
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    // Envoi des données au serveur pour l'authentification
    const handleAuth = async () => {
        try {
            const response = await fetch(BASE_URL + 'authentification', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: Email,
                    Mots_de_passe: Mots_de_passe,
                }),
            });

            if (!response.ok) {
                throw new Error('Erreur de réseau');
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                if ('success' in result && result.success) {

                    setMessageError('');
                    setTimeout(() => {
                        setResetSuccess(true);
                        setEmail('');
                        setPassword('');
                    }, 10000);
                    const { user } = result;
                    setMonprofil(user);
                    setuserId(user.Id);
                    await updateEnligne(user.Id); // Appel de la fonction pour mettre à jour 'enLigne'
                    navigation.navigate('Accueil');
                } else {
                    setResetSuccess(false);
                    setMessageError('Adresse e-mail ou mot de passe incorrect.');
                }
            } else {
                throw new Error('La réponse du serveur n\'est pas au format JSON');
            }
        } catch (error) {
            console.error('Erreur lors de l\'authentification:', error);
            throw new Error('Une erreur est survenue lors de l\'authentification. Veuillez réessayer plus tard.');
        }
    };

    // Fonction pour mettre à jour 'enLigne' dans le backend
    const updateEnligne = async (userId) => {
        console.log(userId);
        try {
            const response = await fetch(BASE_URL + 'updateEnligne', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    enLigne: 1,
                }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de enLigne');
            }

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de enLigne:', error);
            throw new Error('Une erreur est survenue lors de la mise à jour de enLigne. Veuillez réessayer plus tard.');
        }
    };

    const onPressmotsdepasseoublier = () => {
        navigation.navigate('MotdePasse');
    };
    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'modal-font': require('../../assets/Fonts/Montserrat-Bold.ttf'),
                'custom-fontmessage': require('../../assets/Fonts/Montserrat-Regular.ttf'),
            });
            setIsFontLoaded(true); // Mettre à jour l'état pour indiquer que la police est chargée
        };
        loadFonts();
    }, []);

    return (
        <KeyboardAwareScrollView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={logo} style={{ width: 130, height: 40 }} />
                </View>
                <View style={styles.COntenuTExtCOnnexion}>
                    <Text style={[styles.title, { fontFamily: isFontLoaded ? 'modal-font' : null }]}>Connexion</Text>
                </View>
                <View>
                    <Text style={[styles.text, { fontFamily: isFontLoaded ? 'custom-fontmessage' : null }]}>Votre adresse e-mail :</Text>
                    <View style={styles.textinputMail}>
                        <TextInput

                            style={[styles.input1, { fontFamily: isFontLoaded ? 'custom-fontmessage' : null }]}
                            placeholder="Email"
                            onChangeText={(text) => setEmail(text)}
                            value={Email}
                        />
                    </View>
                    <Text style={styles.errorText}>{emailError}</Text>
                </View>

                <View>
                    <Text style={[styles.text, { fontFamily: isFontLoaded ? 'custom-fontmessage' : null }]}>Votre mot de passe :</Text>
                    <View style={styles.textinputMdp}>
                        <TextInput

                            style={[styles.input2, { fontFamily: isFontLoaded ? 'custom-fontmessage' : null }]}
                            placeholder="Mot de passe"
                            secureTextEntry={!isPasswordVisible}
                            onChangeText={(text) => setPassword(text)}
                            value={Mots_de_passe}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Ionicons
                                name={isPasswordVisible ? 'eye' : 'eye-off'}
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.errorText}>{passwordError}</Text>
                    <View style={styles.boxforgetPassword}>
                        <TouchableOpacity style={styles.forgetPassword} onPress={onPressmotsdepasseoublier}>
                            <Text style={styles.textinscription1}>Mot de passe oublié</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => { handleAuth(); handleLogin() }}>
                    <Text style={[styles.buttonText, { fontFamily: isFontLoaded ? 'modal-font' : null }]} >Se connecter</Text>
                </TouchableOpacity>
                <Text style={styles.errorText1}>{messagedError}</Text>
                <View style={styles.textinscription}>
                    <Text >Vous n'avez pas de compte ?</Text>
                    <TouchableOpacity style={styles.inscription} onPress={() => navigation.navigate("Inscprition")}>
                        <Text style={styles.textinscription1}>S'incrire ici !</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150,
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    COntenuTExtCOnnexion: {
        display: 'flex',
        width: '90%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'normal',
        marginBottom: 20,
        // textDecorationLine: 'underline',
        marginTop: 20,

    },
    text: {
        marginLeft: 10,
        fontSize: 15,

    },
    textinputMail: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        width: '90%',
        borderColor: "#4b0082",
    },
    input1: {
        height: 40,
        width: '90%',
        //  fontFamily: 'custom-fontmessage'
    },
    textinputMdp: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        width: '90%',
        borderColor: "#4b0082",
    },
    input2: {
        height: 40,
        width: '80%',
        //   fontFamily: 'custom-fontmessage'
    },
    boxforgetPassword: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    forgetPassword: {
        display: 'flex',
        marginRight: 20,
        marginBottom: 10,
        alignItems: 'flex-end',
    },
    button: {
        backgroundColor: '#79328d',
        padding: 10,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
        width: '90%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        //  fontWeight: 'bold',
        //  fontFamily: 'modal-font'
    },
    textinscription: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    inscription: {
        marginRight: 10,
    },
    textinscription1: {
        color: 'blue',
    },
    errorText: {
        color: 'red',
        marginLeft: 10,
        marginTop: -30,
        padding: 10,
    },
    errorInput: {
        borderColor: 'red', // Changer la couleur de la bordure en cas d'erreur
    },
    errorText1: {
        color: 'red',
        marginTop: -10,
        padding: 10,
    }
});

export default ContenuLogin;
