import { StyleSheet, Text, View,  Pressable, } from 'react-native';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from './context/usercontexttheme';




const MenuNavbar = () => {
    const navigation = useNavigation();
    const { isDarkMode } = useTheme();
     
  const onPressBack = () => {
    navigation.goBack();
  };





    return (
        <View>
            <View  style={[styles.NavBar, { backgroundColor: isDarkMode ? '#000000' : '#ffffff' }]}>
                <View style={styles.Container}>
                    <Pressable style={styles.Icon} onPress={onPressBack}>
                        <Ionicons name="ios-arrow-back" size={25} color="#f94990" />
                    </Pressable>
                    <Text style={[styles.Menu, { fontFamily: 'modal-font',color: isDarkMode ? '#ffffff' : '#000000' }]}>Profil</Text>
                </View>

            </View>
        </View>



    )
}


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        

    },
    NavBar: {
        paddingLeft: 20,
        marginTop: 30,
        paddingBottom: 10,
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',

    },
    Icon: {
        top: 3,
        right: 10,
    },
    Menu: {
        fontSize: 17,
       // fontWeight: 'bold',
    },




})


export default MenuNavbar