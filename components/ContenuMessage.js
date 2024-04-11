import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useUser } from './context/usercontext';
import { useRoute } from '@react-navigation/native';
import { getDatabase, ref, onValue } from 'firebase/database';

const ContenuMessage = () => {
    const [messages, setMessages] = useState([]);
    const { Monprofil } = useUser();
    const route = useRoute();
    const userData = route.params.userData;
    const Idvisited = Monprofil && Monprofil.Id ? Monprofil.Id : 'defaultUserId';
    const Id = userData && userData.Id ? userData.Id : 'defaultUserId';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase();
                const visitesRef = ref(db, 'Messages');

                onValue(visitesRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const messagesData = Object.keys(data).map((key) => ({ id: key, ...data[key] }));

                        // Filtrer les messages associés à Idvisited et les réponses associées à Id
                        const filteredMessages = messagesData.filter(message => {
                            if (message.Idvisited === Idvisited && message.Id === Id) {
                                return true; // Si les IDs correspondent, c'est un message
                            } else if (message.Idvisited === Id && message.Id === Idvisited) {
                                return true; // Si les IDs inversés correspondent, c'est une réponse
                            } else {
                                return false; // Autrement, ne pas inclure
                            }
                        });

                        setMessages(filteredMessages);
                    } else {
                        console.log('Aucune donnée de visite trouvée.');
                    }
                });
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchData();
    }, [Idvisited]); // Exécuter l'effet uniquement lorsque Idvisited change

    return (
        <ScrollView>
            <View style={style.contenumessage}>
                {messages.map((message, index) => (
                    <View key={index}>
                        {message.Idvisited === Idvisited ? (
                            <View style={style.messages}>
                                <Text style={style.messagesTExt}>{message.inputValue}</Text>
                            </View>
                        ) : (
                            <View style={style.Repons}>
                                <Text style={style.ReponsTExt}>{message.inputValue}</Text>
                            </View>
                        )}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    contenumessage: {
        paddingTop: 10,
        width: '100%',
        height: '100%',
        paddingBottom: 100,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    messages: {
        width: '90%',
        borderRadius: 20,
        left: '8%',
        padding: 10,
        marginTop: 20,
        backgroundColor: '#07668f',
    },
    Repons: {
        width: '90%',
        borderRadius: 20,
        top: 10,
        left: 10,
        padding: 10,
        backgroundColor: 'lightgrey',
        marginTop: 20,
        padding: 10,
    },
    ReponsTExt: {
        color: 'black',
        fontSize: 12,
    },
    messagesTExt: {
        color: 'white',
        fontSize: 12,
    },
});

export default ContenuMessage;
