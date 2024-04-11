import { StyleSheet, Text, View, Image, Pressable, ScrollView,  } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';





const ContenuSearchMessage = () => {
    const navigation = useNavigation();

    const onPressMessages = () => {
        navigation.navigate('Messages');
    };

    // Liste complète d'utilisateurs (fictive)
    const donnees = [
        { id: 1, nom: 'nirymamy', imageSource: require('../assets/images/nirymamy.jpg'), messages: 'coucou!' },
        { id: 2, nom: 'nDeba', imageSource: require('../assets/images/test4.jpg'), messages: ' votre application, vous pouvez remplacer le contenu réel par des placeholders de chargement, qui simulent le contenu en cours de chargement. Voici comment vous pouvez intégrer un effet de skeleton dans votre composant Contenu :' },
        { id: 3, nom: 'photograph', imageSource: require('../assets/images/test5.jpg'), messages: 'coucou!' },
        { id: 4, nom: 'miary', imageSource: require('../assets/images/test2.jpg'), messages: 'coucou!' },
        { id: 5, nom: 'Danny', imageSource: require('../assets/images/test3.jpg'), messages: 'coucou!' },
        { id: 6, nom: 'Test6', imageSource: require('../assets/images/test.jpg'), messages: 'coucou!' },
        { id: 5, nom: 'Danny', imageSource: require('../assets/images/test3.jpg'), messages: 'coucou!' },
        { id: 6, nom: 'Test6', imageSource: require('../assets/images/test.jpg'), messages: 'coucou!' },






        // Ajoutez d'autres objets selon vos besoins
    ];

    // Tableau pour stocker les éléments JSX générés
    const elementsJSX = [];

    // Boucle for pour générer les éléments JSX
    for (let i = 0; i < donnees.length; i++) {
        const item = donnees[i];
        elementsJSX.push(
            <Pressable style={styles.Icon} onPress={onPressMessages}>

                <View style={styles.Contenu}>

                    <View style={styles.ContenuProfil}>
                        <Image source={item.imageSource} style={styles.images} />

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
                            <Text  style={styles.NomTExt}>{item.nom}</Text>
                        </View>
                        <View style={styles.ContenuMessage}>
                            <Text style={styles.MESSAGES} numberOfLines={1} ellipsizeMode="tail">{item.messages}</Text>
                        </View>
                    </View>

                </View>
            </Pressable>









        );

    };
    return (


        <View style={styles.Container}>
            <Text style={styles.Text}>Suggestions</Text>
            <View style={styles.Contenaire}>
                {elementsJSX}
            </View>
            <View style={styles.contenuVoir}>
                <Pressable style={styles.Boutton}><Text style={styles.VoirTout}>Voir Tout</Text></Pressable>
            </View>
        </View>

    )
}


const styles = StyleSheet.create({
   // Container: {
   //     height: 500,
  //      backgroundColor:'red',
//    },
    Contenaire: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      
    },
    Text: {
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
        marginLeft:10,
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
        width: 70,
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
    NomTExt:{
        fontSize: 15, 
        fontWeight: 'bold',
    },
    ContenuMessage:{
        height: '65%',
    },
    


})


export default ContenuSearchMessage