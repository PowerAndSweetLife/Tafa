import { StyleSheet, Text, View, Pressable ,Animated, Easing  } from 'react-native';
import React, { useState, useEffect } from 'react'; 
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from './context/usercontexttheme';
import { useUser } from './context/usercontext';
import { getDatabase, ref, onValue } from 'firebase/database';



const Footer = () => {
  const { Monprofil } = useUser();
  const Id = Monprofil && Monprofil.Id ? Monprofil.Id : 'defaultUserId';
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  

   
    useEffect(() => {
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
            }
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, [Id]);
    
    const onPressAccueil = () => {
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
    const [isBlinking, setIsBlinking] = useState(false);
    const [scaleValue] = useState(new Animated.Value(1)); 
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
    <View  style={[styles.footerfixed, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
      <View style={styles.footer}>

        <Pressable style={styles.Icon} onPress={onPressAccueil}>
          <Ionicons name="home" size={20} color="lightgrey" />
          <Text  style={[styles.colortext,{ fontFamily: 'custom-font'}]}>Accueil</Text>
        </Pressable>

        <Pressable style={styles.Icon} onPress={onPressRencontre}>
          <Ionicons name="location" size={20} color="#f94990" />
          <Text  style={[styles.Rencontre,{ fontFamily: 'custom-font'}]}>Rencontres</Text>
        </Pressable>


        <Pressable style={styles.Icon} onPress={onPressMessage}>
        {newMessagesCount > 0 && (
            <View style={styles.Badge}>
              <Text style={styles.badgeText}>{newMessagesCount}</Text>
            </View>
          )}
          <Ionicons name="chatbubble-ellipses" size={20} color={isBlinking ? '#f94990' : 'lightgrey'} />
          <Text  style={[styles.colortext,{ fontFamily: 'custom-font'}]}>Messages</Text>
        </Pressable>

        <Pressable style={styles.Icon} onPress={onPressMatch}>
          <Ionicons name="heart" size={20} color="lightgrey" />
          <Text  style={[styles.colortext,{ fontFamily: 'custom-font'}]}>Match</Text>
        </Pressable>

      </View>
    </View>


  )
}


const styles = StyleSheet.create({
  footerfixed: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'flex-end',
    bottom: 0,
  
  },
  footer: {

    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 60,
    paddingTop: 10,
    justifyContent: 'space-evenly',
    bottom: '0',
  },
  Icon: {
    alignItems: 'center',
    
    width:100,
  },
  Rencontre:{
    color: '#f94990',
    fontSize:10,
  //  fontWeight: 'bold',
  },
  colortext: {
    color: 'lightgrey',
  // fontWeight: 'bold',
    fontSize:10,

  },
  Badge: {
    position: 'absolute',
    top: -3,
    right: -5,
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


export default Footer