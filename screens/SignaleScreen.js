import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import NavSearchmodif from '../components/NavSearchmodif';
import { BASE_URL } from "../helper/url";
import { useTheme } from '../components/context/usercontexttheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import defaultHommeAvatar from '../assets/Avatar/avatarhomme2.jpg';
import defaultfemmeAvatar from '../assets/Avatar/avatarfemme2.jpg';
import { TextInput } from "react-native";


const SignaleScreen = () => {
    const route = useRoute();
    const userData = route.params.userData;
    const Images = userData.img_link;
    const Nom = userData.Nom;
    const Sexe = userData.Sexe;
    const Prenom = userData.Prenom;
    const { isDarkMode } = useTheme();
    const [inputValue1, setInputValue1] = useState('');
    const navigation = useNavigation();
    const onPressBack = () => {
        navigation.goBack();
    };
    const defaultAvatar = (sexe) => {
        return sexe === 'Homme' ? defaultHommeAvatar : defaultfemmeAvatar;
    };
    return (
        <View style={[{ height: 800, backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
            <SafeAreaView>
                <ScrollView style={styles.scrollView}>
                    <View style={[styles.NavBar, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>

                        <View style={styles.imageContainer}>
                            <Pressable style={styles.IconBack} onPress={onPressBack}>
                                <Ionicons name="ios-arrow-back" size={25} color="#f94990" />
                            </Pressable>
                        </View>
                    </View>

                    <View style={[styles.contenu, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
                        <View style={styles.profil}>
                            <View style={styles.porteurimage}>
                                <Image
                                    source={Images ? { uri: BASE_URL + Images } : defaultAvatar(Sexe)}

                                    style={styles.image}
                                />
                            </View>
                            <View style={styles.porteurNom}>
                                <Text style={{ fontFamily: 'custom-font', fontSize: 25, fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>
                                    {Nom}
                                </Text>
                            </View>
                            <View style={styles.porteurText}>
                                <Text style={{ fontFamily: 'custom-font', fontSize: 20, fontWeight: 'bold', marginRight: 10, color: isDarkMode ? 'red' : 'red', }} >Vous voullez signialee {Nom}</Text>
                                <Text style={{ fontFamily: 'custom-fontmessage', fontSize: 15, marginRight: 10, color: isDarkMode ? '#ffffff' : '#000000' }} >Il ne saura pas qui l'a signalée.Si une ersonne est en danger immdiat,contactez les secours sans plus attendre</Text>
                            </View>

                            <View style={styles.porteurText1}>
                                <Text style={{ fontFamily: 'custom-font', fontSize: 15, fontWeight: 'bold', marginRight: 10, color: isDarkMode ? '#ffffff' : '#000000' }} >Veuillez mettre une motif de signialement s'il vous plait</Text>
                                <View style={[styles.TextInput, { borderColor: isDarkMode ? '#79328d' : 'gray', }]}>
                                    {inputValue1.length === 0 && (
                                        <Text style={[styles.placeholder, { color: isDarkMode ? '#ffffff' : '#000000' }]}>Motifs de signalement ...</Text>
                                    )}
                                    <TextInput
                                        style={{ flex: 1, color: isDarkMode ? '#ffffff' : '#000000' }}
                                        onChangeText={(text) => setInputValue1(text)}
                                        value={inputValue1}
                                        placeholderTextColor={isDarkMode ? 'white' : 'gray'}
                                    />

                                </View>

                            </View>

                        </View>


                        <View style={[styles.Body, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>

                            <View style={styles.BtnContainer}>
                                <View style={[{ display: 'flex', flexDirection: 'row', paddingBottom: 5 }]}>
                                    <Text style={[{ fontFamily: 'custom-fontmessage', color: isDarkMode ? '#ffffff' : '#000000' }]} >Envoyer Votre signalement a</Text>
                                    <Text style={[{ fontFamily: 'modal-font', color: isDarkMode ? '#f94990' : '#f94990', fontSize: 17, bottom: 3 }]} > Tafa</Text>
                                </View>

                                <TouchableOpacity onPress={onPressBack} style={[styles.Envoyer, { fontFamily: 'custom-fontmessage', }]}>

                                    <Text style={[{ fontFamily: 'custom-fontmessage', color: '#ffffff' }]} >Envoyer le signalement</Text>

                                </TouchableOpacity>


                            </View>
                        </View>

                    </View>





                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({

    contenu: {
        height: 'auto',
        width: '100%',
        display: 'flex',
        alignItems: 'center',

    },

    Body: {
        height: 100,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 15,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    NavBar: {
        marginTop: 30,
        paddingBottom: 10,
        width: '100%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,

    },


    IconBack: {
        marginRight: 10,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',

    },

    BtnContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    Envoyer: {
        backgroundColor: 'blue',
        width: '90%',
        height: 40,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'

    },
    profil: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 50,
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
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 60,
    },
    porteurText1: {
        width: 500,
        height: 250,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    TextInput: {
        height: 220,
        borderWidth: 1,
        borderColor: "#4b0082",
        width: "70%",
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 12,
        marginTop: 10,
        paddingTop: 10,
        display: 'flex',
        flexDirection: "row",
        alignItems: "flex-start",
    },
    placeholder: {
        color: "lightgray",
    },
});

export default SignaleScreen;
