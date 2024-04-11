import { StyleSheet, Text, View,  Pressable, } from 'react-native';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';





const MenuNavbar = () => {
    const navigation = useNavigation();

     
  const onPressBack = () => {
    navigation.goBack();
  };





    return (
        <View>
            <View style={styles.NavBar}>
                <View style={styles.Container}>
                    <Pressable style={styles.Icon} onPress={onPressBack}>
                        <Ionicons name="ios-arrow-back" size={25} color="#f94990" />
                    </Pressable>
                    <Text style={styles.Menu}>Profil</Text>
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
        height: 40,
        display: 'flex',
        flexDirection: 'row',

    },
    Icon: {
        top: 3,
        right: 10,
    },
    Menu: {
        fontSize: 17,
        fontWeight: 'bold',
    },




})


export default MenuNavbar