import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Pressable, FlatList ,ScrollView} from 'react-native';
import SkeletonItem from '../components/skeleton/skeletonContenuNoif';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useUser } from './context/usercontext';
import { BASE_URL } from "../helper/url";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from './context/usercontexttheme';
import * as Font from 'expo-font';
import { BackHandler } from 'react-native';

const ContenuNotif = () => {
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
    const loadFonts = async () => {
        await Font.loadAsync({
      
          'custom-fontmessage': require('../assets/Fonts/Montserrat-Regular.ttf')
        });
      };
      
      useEffect(() => {
        loadFonts();
      }, []);


    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const { Monprofil } = useUser();
    const Id = Monprofil && Monprofil.Id ? Monprofil.Id : 'defaultUserId';
    const [notifications, setNotifications] = useState([]);
    const { isDarkMode } = useTheme();
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase();
                const visitesRef = ref(db, 'profiles_visits');
    
                onValue(visitesRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const notificationsData = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
                        const currentUserVisites = notificationsData.filter((visite) => {
                            return visite.visitedUserId === Id || visite.visitorUserId === Id;
                        }).map((visite) => {
                            return {
                                id: visite.id,
                                nom: visite.visitorUserId, // Utilisez visite.visitedUserId si c'est ce que vous voulez
                                message: visite.Notifications,
                                time: visite.timestamp,
                                imageSource: { uri: BASE_URL + visite.img_link },
                                isNew: true,
                            };
                        });
    
                       
                        const sortedNotifications = currentUserVisites.sort((a, b) => {
                            const timeA = new Date(a.time).getTime();
                            const timeB = new Date(b.time).getTime();
                            return timeB - timeA;
                        });

                        setNotifications(sortedNotifications);
                        setLoading(false);
                    } else {
                        console.log('Aucune donnée de visite trouvée.');
                        setLoading(false);
                    }
                });
            } catch (error) {
                console.error('Error loading data:', error);
                setLoading(false);
            }
        };
    
        fetchData();
    }, [Id]);
    

    const onPressProfil = () => {
        navigation.navigate('Profil');
    };

    const renderNotificationItem = ({ item }) => {
        const currentTime = Date.now();
        const notificationTime = new Date(item.time).getTime();
        const timeDiff = currentTime - notificationTime;
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));
        let hoursDiff = 0;
        let daysDiff = 0;

        if (minutesDiff > 60) {
            hoursDiff = Math.floor(minutesDiff / 60);
            if (hoursDiff > 24) {
                daysDiff = Math.floor(hoursDiff / 24);
            }
        }

        let timeDisplay = '';
        if (daysDiff > 0) {
            timeDisplay = `${daysDiff} jour${daysDiff > 1 ? 's' : ''}`;
        } else if (hoursDiff > 0) {
            timeDisplay = `${hoursDiff} heure${hoursDiff > 1 ? 's' : ''}`;
        } else {
            timeDisplay = `${minutesDiff} minute${minutesDiff > 1 ? 's' : ''}`;
        }
                    

        

        return (
            <Pressable onPress={onPressProfil}>
                <View style={styles.Container}>
                    <View style={styles.NotifContainer}>
                        <View style={styles.NotifProfil}>
                            <Image source={item.imageSource} style={styles.image} />
                        </View>
                        <View style={styles.NotifText}>
                            <Text  style={[styles.Nom, {  color: isDarkMode ? '#ffffff' : '#000000' }]}>{item.nom}</Text>
                            <Text  style={[styles.MESSAGES, {fontFamily: 'custom-fontmessage', color: isDarkMode ? '#ffffff' : 'grey' }]} numberOfLines={1} ellipsizeMode="tail">{item.message}</Text>
                        </View>
                        <View style={styles.Notiftime}>
                            <Pressable style={styles.Icon} >
                                <Ionicons name="close-circle" size={22} color="white" />
                            </Pressable>
                            <Text  style={[styles.time, {fontFamily: 'custom-fontmessage', color: isDarkMode ? '#ffffff' : 'grey' }]}> il y a {timeDisplay}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <View   style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
        {loading ? (
            <View style={styles.skeletonContainer}>
                <View style={styles.contenu}>
                    {[...Array(10)].map((_, index) => (
                        <SkeletonItem key={index} />
                    ))}
                </View>
            </View>
        ) : (
            <FlatList
    data={notifications}
    keyExtractor={item => item.id.toString()}
    renderItem={renderNotificationItem}
    nestedScrollEnabled={true}
/>
        )}
    </View>
 );
};

const styles = StyleSheet.create({
    Container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        marginBottom: 5,
    },
    NotifContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 70,
        alignItems: 'center',
        paddingTop: 15,
    },
   
    NotifProfil: {
        marginLeft: 10,
        width: 70,
        height: 70,
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 50,
    },
    NotifText: {
        width: '58%',
        height: 70,
        paddingTop: 10,
    },
   
    MESSAGES: {
        top: 5,
        fontSize: 12,
     
        
      },
    Notiftime: {
        alignItems: 'flex-end',
        width: 80,
        height: 70,
        paddingTop: 10,
    },
    time: {
        fontSize: 10,
        top: 4,
    },
    Nom: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    Icon: {
        top: -15,
    },
});

export default ContenuNotif;
