import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Pressable, Image, ScrollView, item } from 'react-native';
import NavSearchmodif from '../components/NavSearchmodif';
import { useNavigation } from '@react-navigation/native';




const ResultatSearchMassage = ({ route }) => {
    const navigation = useNavigation();

    const onPressMessages = () => {
        navigation.navigate('Messages');
    };

    // Effectuez la recherche et affichez les résultats

    const { searchTerm } = route.params;
    const allItems = [
        { id: 1, nom: 'nirymamy', imageSource: require('../assets/images/nirymamy.jpg'), messages: 'coucou!' },
        { id: 2, nom: 'nDeba', imageSource: require('../assets/images/test4.jpg'), messages: ' votre application, vous pouvez remplacer le contenu réel par des placeholders de chargement, qui simulent le contenu en cours de chargement. Voici comment vous pouvez intégrer un effet de skeleton dans votre composant Contenu :' },
        { id: 3, nom: 'photograph', imageSource: require('../assets/images/test5.jpg'), messages: 'coucou!' },
        { id: 4, nom: 'miary', imageSource: require('../assets/images/test2.jpg'), messages: 'coucou!' },
        { id: 5, nom: 'Danny', imageSource: require('../assets/images/test3.jpg'), messages: 'coucou!' },
        { id: 6, nom: 'Test6', imageSource: require('../assets/images/test.jpg'), messages: 'coucou!' },
        { id: 5, nom: 'Danny', imageSource: require('../assets/images/test3.jpg'), messages: 'coucou!' },
        { id: 6, nom: 'Test6', imageSource: require('../assets/images/test.jpg'), messages: 'coucou!' },
        { id: 4, nom: 'miary', imageSource: require('../assets/images/test2.jpg'), messages: 'coucou!' },
        { id: 5, nom: 'Danny', imageSource: require('../assets/images/test3.jpg'), messages: 'coucou!' },
        { id: 6, nom: 'Test6', imageSource: require('../assets/images/test.jpg'), messages: 'coucou!' },
        { id: 5, nom: 'Danny', imageSource: require('../assets/images/test3.jpg'), messages: 'coucou!' },
        { id: 6, nom: 'Test6', imageSource: require('../assets/images/test.jpg'), messages: 'coucou!' },
        { id: 4, nom: 'miary', imageSource: require('../assets/images/test2.jpg'), messages: 'coucou!' },
        { id: 5, nom: 'Danny', imageSource: require('../assets/images/test3.jpg'), messages: 'coucou!' },
        { id: 6, nom: 'Test6', imageSource: require('../assets/images/test.jpg'), messages: 'coucou!' },
        { id: 5, nom: 'Danny', imageSource: require('../assets/images/test3.jpg'), messages: 'coucou!' },
        { id: 6, nom: 'Test6', imageSource: require('../assets/images/test.jpg'), messages: 'coucou!' },

        // ... Ajoutez d'autres éléments au besoin
    ];
    const filteredResults = allItems.filter(item =>
        item.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const calculateProximity = (text, searchTerm) => {
        const commonChars = text
            .toLowerCase()
            .split('')
            .filter(char => searchTerm.toLowerCase().includes(char)).length;

        return commonChars;
    };

    // Tri des résultats en fonction de la proximité avec le terme de recherche
    const sortedResults = allItems.sort((a, b) => {
        const proximityA = calculateProximity(a.nom, searchTerm);
        const proximityB = calculateProximity(b.nom, searchTerm);

        return proximityB - proximityA;
    });







    const elementsJSX = [];

    // Boucle for pour générer les éléments JSX
    for (let i = 0; i < allItems.length; i++) {
        const item = allItems[i];
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
                            <Text style={styles.NomTExt}>{item.nom}</Text>
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
        <SafeAreaView style={styles.Body}>
            <NavSearchmodif />
            <ScrollView style={styles.scrollView}>
                {filteredResults.length === 0 ? (
                    <View style={styles.Body}>
                        <Text style={styles.NOresult}>Aucun résultat trouvé pour "{searchTerm}"</Text>
                    </View>
                ) : (
                    <View style={styles.contenu}>
                        {elementsJSX}
                    </View>
                )}

            </ScrollView>
        </SafeAreaView>
    )







};
const styles = StyleSheet.create({
    Body: {
        backgroundColor: 'white',
    },
    Contenu: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 70,
        borderRadius: 7,
        paddingTop: 7,
        justifyContent: 'center',

    }
    ,
    contenu: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',

    },
    ContenuProfil: {
        width: 71,
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
        //paddingLeft: 10,
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




    NOresult: {
        textAlign: 'center',
        color: 'red',
        fontSize: 15,
        marginTop: 100,

    }
})
export default ResultatSearchMassage;
