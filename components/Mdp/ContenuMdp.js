import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Platform } from 'react-native';
import { Alert } from 'react-native';
import { BASE_URL } from "../../helper/url";



const logo = require('../../assets/images/logo.png');
const ContenuMdp = () => {
    const navigation = useNavigation();
    const [Email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);
    const onPressCOnnexion = () => {
        navigation.navigate('COnnexion');
    };


    const handleLogin = () => {
        if (!Email) {
            setEmailError('Veuillez saisir votre adresse e-mail.');
        } else {
            setEmailError('');

            setEmailError('');
            return;
        }
    };
    // Envoi des données au serveur pour l'authentification
    const handleMdpOublie = async () => {
        try {
            const response = await fetch(BASE_URL + 'resetPassword', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: Email,
                }),
            });

            if (!response.ok) {
                throw new Error('Erreur de réseau');
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                // La réponse est au format JSON, on peut la parser
                const result = await response.json();

                if ('success' in result && result.success) {
                    setEmail('');
                    setResetSuccess(true);

                } else {
                    // Afficher un message d'erreur si l'authentification a échoué
                    setEmailError(result.message || 'Une erreur est survenue lors de la réinitialisation du mot de passe.');
                    setResetSuccess(false);

                }
            } else {
                // La réponse n'est pas au format JSON, gérer l'erreur
                throw new Error('La réponse du serveur n\'est pas au format JSON');
            }

        } catch (error) {
        console.error('Erreur lors de la réinitialisation du mot de passe:', error);
            // Afficher un message d'erreur en cas d'erreur lors de la requête
         //   Alert.alert('Erreur', 'Une erreur est survenue lors de la réinitialisation du mot de passe. Veuillez réessayer plus tard.');
        }
    }

    return (
        <KeyboardAwareScrollView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>

                <View style={styles.imageContainer}>

                    <Image source={logo} style={{ width: 130, height: 40 }} />
                </View>
                <View style={styles.textContenu}>
                    <Text style={styles.title}>Mot de passe oublié</Text>
                </View>
                <View style={styles.InputMailCOntenu}>

                    <View style={styles.textContenu}>
                        <Text style={styles.text}>Votre adresse e-mail :</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        value={Email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <View style={styles.textContenu}>
                        <Text style={styles.errorText}>{emailError}</Text>
                    </View>
                </View>

                <View style={styles.boxtext}>
                    <Text style={styles.text1}>Veuillez entrer votre adresse e-mail pour reinitialiser votre mot de passe.</Text>
                </View>
                {resetSuccess ? (
                    // Afficher un message de succès
                    <View style={styles.successMessage}>
                        <Text style={styles.successText}>
                            Email envoyé à {Email}.une fois que vous aurez repris la main sur votre compte, Veuillez changer immédiatement votre mot de passe.
                        </Text>
                    </View>
                ) : ('')}
                <TouchableOpacity style={styles.button} onPress={() => { handleLogin(); handleMdpOublie() }}>
                    <Text style={styles.buttonText}>Envoyer</Text>
                </TouchableOpacity>
                <View style={styles.textconnecter}>
                    <Text >Vous êtes déjà inscrit ?</Text>
                    <TouchableOpacity style={styles.connecter} onPress={onPressCOnnexion}><Text style={styles.textconnecter1}>Se connecter ici !</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    container: {

        flex: 1,
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
    title: {
        fontSize: 24,
        fontWeight: 'normal',
        marginBottom: 20,
        textDecorationLine: 'underline',
        marginTop: 20,
        // marginLeft: 10,
        marginRight: 10,
        fontSize: 20,
    },
    textContenu: {
        width: '90%',
    },
    text: {
        // marginLeft: 10,
        justifyContent: 'flex-start',
    },
    InputMailCOntenu: {
        width: '100%',
        alignItems: 'center',
    },

    input: {
        height: 40,
        width: '90%',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 5,
        borderColor: "#4b0082",
    },
    errorText: {
        color: 'red',
        marginTop: -20,
        marginBottom: 10,

    },
    boxtext: {
        marginTop: -10,

    },
    text1: {
        color: 'grey',
    },
    successMessage: {
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#E8E9EB',
        borderRadius: 5,
        width: '90%',
        padding: 5,
        marginLeft: 10,
    },
    successText: {

    },
    button: {
        backgroundColor: '#79328d',
        padding: 10,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        width: '90%',

    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',

    },
    textconnecter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,


    },
    textconnecter1: {
        color: 'blue',
        marginRight: 10,
    },
    connecter: {
        marginLeft: 10,
    },

});

export default ContenuMdp;