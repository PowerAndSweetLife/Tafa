
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import NotificationScreen from './screens/NotificationScreen';
import RechercheScreen from './screens/RechercheScreen';
import ResultatsScreen from './screens/ResultatsScreen';


const Stack = createStackNavigator();



function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Accueil"  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Accueil" component={HomeScreen} />
      <Stack.Screen name="Recherche" component={RechercheScreen} />
      <Stack.Screen name="Resultats" component={ResultatsScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      
       
    </Stack.Navigator>
  </NavigationContainer>

  );
};



export default App;