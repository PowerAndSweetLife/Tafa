import React from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message';
import HomeScreen from './screens/HomeScreen';
import NotificationScreen from './screens/NotificationScreen';
import RechercheScreen from './screens/RechercheScreen';
import ResultatsScreen from './screens/ResultatsScreen';
import RencontresScreen from './screens/RencontresScreen';
import MenuScreen from './screens/MenuScreen';
import MatchScreen from './screens/MatchScreen';
import ProfilScreen from './screens/ProfilScreen';
import MessageSreen from './screens/MessageSreen';
import RegisterScreen from './screens/RegisterScreen';
import DiscussionsScreen from './screens/DiscussionsScreen';
import LoginScreen from './screens/LoginScreen';
import MdpScreen from './screens/MdpScreen';
import MessagesearchScreen from './screens/MessagesearchScreen';
import ResultatSearchMassage from './screens/ResultatSearchMassage';
import { UserProvider} from './components/context/usercontext'; 




const Stack = createStackNavigator(); 



function App() {

  

  return (
    
   
   
    
    
   <>
 { <NavigationContainer>
  <UserProvider>
  <Stack.Navigator
          initialRouteName="COnnexion"
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS // Animation de transition
          }}
        >
     
      <Stack.Screen name="Inscprition" component={RegisterScreen} />
      <Stack.Screen name="COnnexion" component={LoginScreen} />
      <Stack.Screen name="MotdePasse" component={MdpScreen} />
      <Stack.Screen name="Accueil" component={HomeScreen} />
      <Stack.Screen name="Recherche" component={RechercheScreen} />
      <Stack.Screen name="Resultats" component={ResultatsScreen} />
      <Stack.Screen name="ResultatsMessages" component={ResultatSearchMassage} />     
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Messagesearch" component={MessagesearchScreen} />
      <Stack.Screen name="Rencontres" component={RencontresScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Match" component={MatchScreen} />
      <Stack.Screen name="Profil" component={ProfilScreen} />
      <Stack.Screen name="Messages" component={MessageSreen} />
      <Stack.Screen name="Discussions" component={DiscussionsScreen} />
      
    
    
      

    </Stack.Navigator>
    </UserProvider>
  </NavigationContainer>}
   <Toast />
 </>
  

  );
};



export default App;