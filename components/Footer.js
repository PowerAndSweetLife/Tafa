import { StyleSheet, Text, View, Pressable, Animated, Easing } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from './context/usercontexttheme';
import { useUser } from '../components/context/usercontext';
import { getDatabase, ref, onValue } from 'firebase/database';
import * as Font from 'expo-font';

const Footer = () => {
  const { Monprofil } = useUser();
  const Id = Monprofil && Monprofil.Id ? Monprofil.Id : 'defaultUserId';
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'custom-font': require('../assets/Fonts/Italic.ttf'),
      });
      setIsFontLoaded(true); // Mettre à jour l'état pour indiquer que la police est chargée
    };
    loadFonts();
  }, []);

  useEffect(() => {
    // Exécuter uniquement si la police est chargée
    if (isFontLoaded) {
      const fetchData = async () => {
        try {
          const db = getDatabase();
          const messagesRef = ref(db, 'Messages');
          onValue(messagesRef, (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const uniqueSenders = new Set();
              const newMessages = [];
              Object.keys(data).forEach((key) => {
                const message = data[key];
                const pair = message.Idenvoyermes < message.Idrecusmes
                  ? `${message.Idenvoyermes}-${message.Idrecusmes}`
                  : `${message.Idrecusmes}-${message.Idenvoyermes}`;
                if (!uniqueSenders.has(pair) && message.Idrecusmes === Id && !message.lu) {
                  uniqueSenders.add(pair);
                  newMessages.push(message);
                }
              });
              setNewMessagesCount(newMessages.length);
              setIsBlinking(newMessages.length > 0);
            }
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [Id, isFontLoaded]); // Ajouter isFontLoaded comme dépendance

  const onPressHome = () => {
    navigation.navigate('Accueil');
  };

  const onPressRencontre = () => {
    navigation.navigate('Rencontres');
  };

  const onPressMatch = () => {
    navigation.navigate('Match');
  };

  const onPressMessage = () => {
    navigation.navigate('Discussions');
  };

  const startBlinkingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, { toValue: 0.8, duration: 300, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(scaleValue, { toValue: 1, duration: 300, easing: Easing.linear, useNativeDriver: true }),
      ]),
    ).start();
  };

  useEffect(() => {
    if (isBlinking) {
      startBlinkingAnimation();
    }
  }, [isBlinking]);

  return (
    <View style={[styles.footerfixed, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
      <View style={styles.footer}>
        <Pressable style={styles.Icon} onPress={onPressHome}>
          <Ionicons name="home" size={20} color="#f94990" />
          <Text style={[styles.Accueil, { fontFamily: isFontLoaded ? 'custom-font' : null }]}>Accueil</Text>
        </Pressable>
        <Pressable style={styles.Icon} onPress={onPressRencontre}>
          <Ionicons name="location" size={20} color="lightgrey" />
          <Text style={[styles.colortext, { fontFamily: isFontLoaded ? 'custom-font' : null }]}>Rencontres</Text>
        </Pressable>
        <Pressable style={styles.Icon} onPress={onPressMessage}>
          {newMessagesCount > 0 ? (
            <>
              <View style={styles.Badge} >
                <Text style={styles.badgeText} >{newMessagesCount}</Text>
              </View>
              <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <Ionicons name="chatbubble-ellipses" size={20} color={isBlinking ? '#f94990' : 'lightgrey'} />
              </Animated.View>
            </>
          ) : (
            <Ionicons name="chatbubble-ellipses" size={20} color="lightgrey" />
          )}
          <Text style={[styles.colortext, { fontFamily: isFontLoaded ? 'custom-font' : null, color: isBlinking ? '#f94990' : 'lightgrey' }]}>Messages</Text>
        </Pressable>
        <Pressable style={styles.Icon} onPress={onPressMatch}>
          <Ionicons name="heart" size={20} color="lightgrey" />
          <Text style={[styles.colortext, { fontFamily: isFontLoaded ? 'custom-font' : null }]}>Match</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerfixed: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'flex-end',
    bottom: 0,
    backgroundColor: 'white',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 60,
    paddingTop: 10,
    justifyContent: 'space-evenly',
    bottom: 0,
  },
  Icon: {
    alignItems: 'center',
  },
  Accueil: {
    color: '#f94990',
    fontSize: 10,
  },
  colortext: {
    color: 'lightgrey',
    fontSize: 10,
  },
  Badge: {
    position: 'absolute',
    top: -3,
    right: -2,
    backgroundColor: '#79328d',
    width: 15,
    height: 15,
    borderRadius: 50,
    paddingLeft: 5,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Footer;
