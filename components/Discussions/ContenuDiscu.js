import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import SkeletonItem from '../../components/skeleton/skeletonContenuDiscu';
import { useUser } from '../context/usercontext';
import { getDatabase, ref, onValue } from 'firebase/database';
import { BASE_URL } from "../../helper/url";

const ContenuDiscu = () => {
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const { Monprofil } = useUser();
    const Id = Monprofil && Monprofil.Id ? Monprofil.Id : 'defaultUserId';
    const [donnees, setDonnees] = useState([]);
    const [Idvisited, setIdVisited] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase();
                const visitesRef = ref(db, 'Messages');

                onValue(visitesRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const messagesData = Object.keys(data).map((key) => ({ id: key, ...data[key] }));

                        const uniqueMessages = [];
                        const encounteredIds = new Set();
                        for (const message of messagesData) {
                            const key = `${message.IdVisited}-${message.Id}`;
                            if (!encounteredIds.has(key)) {
                                encounteredIds.add(key);
                                uniqueMessages.push(message);
                            }
                        }

                        const filteredMessages = uniqueMessages.filter(message => message.Id === Id);
                        const Idvisited = filteredMessages.map(message => message.Idvisited);
                        setIdVisited(Idvisited);
                        setDonnees(filteredMessages);
                    } else {
                        console.log('Aucune donnée de visite trouvée.');
                    }
                });
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, []);

    useEffect(() => {
        if (Idvisited !== null) {
            fetch(BASE_URL + 'users')
                .then(response => response.json())
                .then(data => {
                    const filteredData = data.filter(user => user.Id.toString() === Idvisited.toString());
                    setUserData(filteredData);
                    setTimeout(() => setLoading(false), 5000);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données:', error);
                    setLoading(false);
                });
        }
    }, [Idvisited]);

    useEffect(() => {
        if (userData !== null) {
            console.log('donnees a envoyer', userData);
        }
    }, [userData]);

    
    const onPressMessages = () => {
        if (userData && userData.length > 0) {
            const selectedUserData = userData[0]; // Sélectionner le premier utilisateur du tableau
            navigation.navigate('Messages', { userData: selectedUserData });
        } else {
            // Gérer le cas où il n'y a pas de données utilisateur
            console.log("Aucune donnée utilisateur à envoyer.");
        }
    };
    
    

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.contenu}>
                        {[...Array(10)].map((_, index) => (
                            <SkeletonItem key={index} />
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    const elementsJSX = [];

    for (let i = 0; i < donnees.length; i++) {
        const item = donnees[i];
        elementsJSX.push(
            <Pressable style={styles.Icon} onPress={() => onPressMessages(userData)} key={i}>
                <View style={styles.Contenu}>
                    <View style={styles.ContenuProfil}>
                        <Image source={{ uri: BASE_URL + item.img_link }} style={styles.images} />
                        <View style={styles.statutContainer}>
                            {item.enLigne ? (
                                <Text style={styles.statutHorsLigne}></Text>
                            ) : (
                                <View style={styles.statutEnLigne}></View>
                            )}
                        </View>
                    </View>
                    <View style={styles.ContenuNom}>
                        <View>
                            <Text style={styles.NomTExt}>{item.Nom}</Text>
                        </View>
                        <View style={styles.ContenuMessage}>
                            <Text style={styles.MESSAGES} numberOfLines={1} ellipsizeMode="tail">{item.inputValue}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        );
    }

    return (
        <ScrollView>
            <View style={styles.Contenaire}>
                {elementsJSX}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    Contenaire: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    Contenu: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 70,
        borderRadius: 7,
        paddingTop: 7,
        justifyContent: 'center',
    },
    ContenuProfil: {
        width: 55,
        display: 'flex',
        flexDirection: 'row',
        height: 55,
        borderRadius: 50,
        borderColor: 'lightgrey',
    },
    images: {
        width: 55,
        height: 55,
        borderRadius: 50,
    },
    ContenuNom: {
        width: '80%',
        height: 70,
        paddingLeft: 10,
    },
    MESSAGES: {
        top: 10,
        fontSize: 12,
        width: '90%',
        height: 45,
    },
    statutContainer: {
        justifyContent: 'flex-end',
        right: 12,
        bottom: 5,
    },
    statutEnLigne: {
        backgroundColor: 'green',
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    statutHorsLigne: {
        backgroundColor: 'red',
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    NomTExt: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    ContenuMessage: {
        height: '65%',
    },
});

export default ContenuDiscu;
