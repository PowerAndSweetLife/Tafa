import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, } from 'react-native';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';




const NavBarDiscu = () => {
    const navigation = useNavigation();

    const onPressRecherche = () => {
        navigation.navigate('Profil');
    };
    const handlePressBack = () => {
        navigation.goBack();
      };
      const handlePressSearch = () => {
        navigation.navigate('Messagesearch');
      };

    return (


        <View style={styles.NavBar}>

            <View style={styles.AlignerTExt}>

                <View style={styles.imageContainer}>
                    <Pressable style={styles.IconBack} onPress={handlePressBack}>
                        <Ionicons name="ios-arrow-back" size={25} color="#f94990" />
                    </Pressable>
                </View>


                <View style={styles.Text}>
                    <Text  style={styles.Discussions}>Discussions</Text>
                </View>

            </View>


            <View style={styles.iconcontainer}>
                <Pressable style={styles.Icon} onPress={handlePressSearch}>
                    <Ionicons name="search" size={22} color="#f94990" />
                </Pressable>

           
                <Pressable style={styles.Icon} onPress={onPressRecherche}>
                    <Ionicons name="settings" size={20} color="#f94990" />
                </Pressable>

            </View>





        </View>




    )
}


const styles = StyleSheet.create({


    NavBar: {
        marginTop: 30,
        paddingBottom: 10,
        width: '100%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-around',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
    },

    iconcontainer: {
        height: 50,
        width:'50%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-end',
        alignItems: 'center',
        
    },
    Icon: {
        marginRight: 10,
        height: 60,
       // marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    IconBack: {
        marginRight: 10,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',

    },

    AlignerTExt: {
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
        
    },

    Text: {
        // width:100 ,
        justifyContent: 'center',
      
    },
    Discussions:{
        fontSize: 17,
         fontWeight: 'bold',
    },

})


export default NavBarDiscu