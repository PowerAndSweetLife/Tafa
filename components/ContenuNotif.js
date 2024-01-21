import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, Button, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import React from 'react'
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ContenuNotif = () => {

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);

    const fetchData = async () => {
        try {
            // Simulez une pause de 2 secondes (remplacez cela par votre logique de chargement réelle)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Remplacez cette logique par votre moyen de récupérer les données depuis une source externe
            const newNotifications = [
                // ... Remplacez cela par vos données réelles
                { id: 1, nom: 'lorem', message: 'a consulté votre profil, il sinterresse à vous ! Envoyer-lui un petit Coucou', imageSource: require('../assets/images/nirymamy.jpg') },
                { id: 2, nom: 'nDeba', message: 'a consulté votre profil, il sinterresse à vous ! Envoyer-lui un petit Coucou', imageSource: require('../assets/images/test4.jpg') },
                { id: 3, nom: 'photograph', message: 'a consulté votre profil, il sinterresse à vous ! Envoyer-lui un petit Coucou', imageSource: require('../assets/images/test5.jpg') },
                { id: 4, nom: 'miary', message: 'a consulté votre profil, il sinterresse à vous ! Envoyer-lui un petit Coucou', imageSource: require('../assets/images/test2.jpg') },
                { id: 5, nom: 'Danny', message: 'a consulté votre profil, il sinterresse à vous ! Envoyer-lui un petit Coucou', imageSource: require('../assets/images/test3.jpg') },
                { id: 6, nom: 'Test6', message: 'a consulté votre profil, il sinterresse à vous ! Envoyer-lui un petit Coucou', imageSource: require('../assets/images/test.jpg') },
                { id: 7, nom: 'lorem', message: 'a consulté votre profil, il sinterresse à vous ! Envoyer-lui un petit Coucou', imageSource: require('../assets/images/nirymamy.jpg') },
                { id: 8, nom: 'nDeba', message: 'a consulté votre profil, il sinterresse à vous ! Envoyer-lui un petit Coucou', imageSource: require('../assets/images/test4.jpg') },
                { id: 9, nom: 'photograph', message: 'a consulté votre profil, il sinterresse à vous ! Envoyer-lui un petit Coucou', imageSource: require('../assets/images/test5.jpg') },
                { id: 10, nom: 'miary', message: 'a consulté votre profil, il sinterresse à vous ! Envoyer-lui un petit Coucou', imageSource: require('../assets/images/test2.jpg') },
            ];

            setNotifications(prevNotifications => [...prevNotifications, ...newNotifications]);
            setIsLoading(false);
        } catch (error) {
            console.error('Erreur lors du chargement des données :', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
        setIsLoading(true);
        fetchData();
    };

    const renderNotificationItem = ({ item }) => (
        <View style={styles.Container}>
            <View style={styles.NotifContainer}>
                <View style={styles.NotifProfil}>
                    <Image source={item.imageSource} style={styles.image} />
                </View>
                <View style={styles.NotifText}>
                    <Text style={styles.Nom}>{item.nom}</Text>
                    <Text style={styles.message}>{item.message}</Text>
                </View>
                <View style={styles.Info}>
                    <Pressable onPress={() => changeText()}>
                        <Ionicons name="question-mark" size={15} color="gray" />
                    </Pressable>
                </View>
            </View>
        </View>
    );

    return (
        
        <FlatList
            data={notifications.slice(0, 7)}  // Afficher uniquement les 5 premières notifications
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderNotificationItem}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() => (
                isLoading && <ActivityIndicator size="large" color="#f94990" />
            )}
        />
    );
};


const styles = StyleSheet.create({

    Container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    NotifContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 2,
        width: '96%',
        height: 100,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'lightgray',
        borderRadius: 10,

    },
    NotifProfil: {
        marginLeft: 10,
        width: 70,
        borderRadius: 50,
        height: 70,

    },
    image: {
        width: 70,
        borderRadius: 50,
        height: 70,
    },
    NotifText: {
        width: '70%',
        height: 90,
        marginLeft: 5,
        paddingTop: 10,

    },
    Info: {
        width: 20,
        height: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderColor: 'gray',
        borderWidth: 2,
        marginTop: -50,

    },
    Nom: {
        fontSize: 20,
    },
})


export default ContenuNotif

