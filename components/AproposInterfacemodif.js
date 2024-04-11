import React from "react";
import { View, Text, Pressable, StyleSheet, TextInput, ScrollView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';





function AproposInterfacemodif() {

  const navigation = useNavigation();


  

  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');
  const [inputValue5, setInputValue5] = useState('');
  const [inputValue6, setInputValue6] = useState('');

  const [inputValue7, setInputValue7] = useState('');
  const [inputValue8, setInputValue8] = useState('');
  const [inputValue9, setInputValue9] = useState('');
  const [inputValue10, setInputValue10] = useState('');
  const [inputValue11, setInputValue11] = useState('');
  const [inputValue12, setInputValue12] = useState('');
  const [inputValue13, setInputValue13] = useState('');


  const handlePress = () => {
    // Lorsque le Pressable est pressé, naviguez vers la nouvelle interface en passant les valeurs d'entrée
    navigation.navigate(('test'), {
      displayedValue1: inputValue1,
      displayedValue2: inputValue2,
      displayedValue3: inputValue3,
      displayedValue4: inputValue4,
      displayedValue5: inputValue5,
      displayedValue6: inputValue6,
       
    });
  };


  const handlePress1 = () => {
    // Lorsque le Pressable est pressé, naviguez vers la nouvelle interface en passant les valeurs d'entrée
    navigation.navigate(('test'), {
     
      displayedValue7: inputValue7,
      displayedValue8: inputValue8,
      displayedValue9: inputValue9,
      displayedValue10: inputValue10,
          
    });
  };



  const handlePress2 = () => {
    // Lorsque le Pressable est pressé, naviguez vers la nouvelle interface en passant les valeurs d'entrée
    navigation.navigate(('test'), {
     
      displayedValue11: inputValue11,
      displayedValue12: inputValue12,
      displayedValue13: inputValue13,
          
    });
  };



 


  return (


    <View style={style.Container}>
      


      <View style={style.Modif1}>
        <View style={style.Suit}>
            <Text style={style.Title}>Informations générales</Text> 
          </View>


          <View>

            <View style={style.AncienMdpContenu}>
              <Ionicons name="person" size={20} color="lightgrey" />
              <Text style={style.Context}>Nom</Text>
            </View>

            <View>
              <TextInput
                style={{ height: 30, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, }}
                onChangeText={(text) => setInputValue1(text)}
                value={inputValue1}
                placeholder="Votre Nom..."
              />
            </View>
          </View>



          <View>
            <View>
              <View style={style.AncienMdpContenu}>
                <Ionicons name="male-female" size={20} color="lightgrey" />
                <Text style={style.Context}>Sexe</Text>
              </View>
              <View>
                <TextInput
                  style={{ height: 30, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, }}
                  onChangeText={(text) => setInputValue2(text)}
                value={inputValue2}
                  placeholder="Sexe..."
                />
              </View>
            </View>
          </View>



          <View>
            <View>
              <View style={style.AncienMdpContenu}>
                <Ionicons name="heart" size={20} color="lightgrey" />
                <Text style={style.Context}>Situation</Text>
              </View>
              <View>
                <TextInput
                  style={{ height: 30, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, }}
                  onChangeText={(text) => setInputValue3(text)}
                  value={inputValue3}
                  placeholder="Votre Situation..."
                />
              </View>
            </View>
          </View>



          <View>
            <View style={style.AncienMdpContenu}>
              <Ionicons name="business" size={20} color="lightgrey" />
              <Text style={style.Context} >Ville</Text>
            </View>
            <View>
              <TextInput
                style={{ height: 30, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, }}
                onChangeText={(text) => setInputValue4(text)}
                value={inputValue4}
                placeholder="Votre Ville..."
              />
            </View>
          </View>



          <View>
            <View style={style.AncienMdpContenu}>
              <Ionicons name="business" size={20} color="lightgrey" />
              <Text style={style.Context}>Signe Astrologie</Text>
            </View>
            <View>
              <TextInput
                style={{ height: 30, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, borderRadius: 7, }}
                onChangeText={(text) => setInputValue5(text)}
                value={inputValue5}
                placeholder="Signe Astrologie..."
              />
            </View>
          </View>







          <View>
            <View style={style.AncienMdpContenu}>
              <Ionicons name="flag" size={20} color="lightgrey" />
              <Text style={style.Context}>Objectif</Text>
            </View>
            <View>
              <TextInput
                style={{ height: 70, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, borderRadius: 10, }}
                onChangeText={(text) => setInputValue6(text)}
                value={inputValue6}
                placeholder="Votre Oblectif..."
              />
            </View>
          </View>



         
          <View style={style.ModifierContenu}>
            <Pressable  onPress={handlePress} style={({ pressed }) => [
          style.Modifier,
          { backgroundColor: pressed ? '#f94990' : 'white' },
          { borderColor: pressed ? '#f94990' : '#07668f' },
        ]}>
              <Text style={{ fontSize: 12, color: '#07668f' ,fontWeight:'bold',}}>Modifier</Text>
            </Pressable>

          </View>
  
        </View>


        <View style={style.Modif2}>
        <View style={style.Suit}>
            <Text style={style.Title}>Emploi et Études</Text> 
          </View>


          <View>

            <View style={style.AncienMdpContenu}>
              <Ionicons name="school" size={20} color="lightgrey" />
              <Text style={style.Context}> Emploi </Text>
            </View>

            <View>
              <TextInput
                style={{ height: 30, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, borderRadius: 10, }}
                onChangeText={(text) => setInputValue7(text)}
                value={inputValue7}
                placeholder="Votre Emploi..."
              />
            </View>
          </View>



          <View>
            <View>
              <View style={style.AncienMdpContenu}>
                <Ionicons name="school" size={20} color="lightgrey" />
                <Text style={style.Context}> Études</Text>
              </View>
              <View>
                <TextInput
                  style={{ height: 30, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, borderRadius: 10, }}
                  onChangeText={(text) => setInputValue8(text)}
                value={inputValue8}
                  placeholder="Votre Etude..."
                />
              </View>
            </View>
          </View>



          <View>
            <View>
              <View style={style.AncienMdpContenu}>
                <Ionicons name="calendar" size={20} color="lightgrey" />
                <Text style={style.Context}> Centre d'intéret </Text>
              </View>
              <View>
                <TextInput
                  style={{ height: 30, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, borderRadius: 10, }}
                  onChangeText={(text) => setInputValue9(text)}
                value={inputValue9}
                  placeholder="Type something..."
                />
              </View>
            </View>
          </View>



          <View>
            <View style={style.AncienMdpContenu}>
              <Ionicons name="text" size={20} color="lightgrey" />
              <Text  style={style.Context}>  Langue </Text>
            </View>
            <View>
              <TextInput
                style={{ height: 30, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, borderRadius: 10, }}
                onChangeText={(text) => setInputValue10(text)}
                value={inputValue10}
                placeholder="Langue..."
              />
            </View>
          </View>



        
          <View style={style.ModifierContenu}>
            <Pressable  onPress={handlePress1} style={({ pressed }) => [
          style.Modifier,
          { backgroundColor: pressed ? '#f94990' : 'white' },
          { borderColor: pressed ? '#f94990' : '#07668f' },
        ]}>
              <Text style={{ fontSize: 12, color: '#07668f' ,fontWeight:'bold',}}>Modifier</Text>
            </Pressable>

          </View>
        </View>


        <View style={style.Modif3}>
          
          <View style={style.Suit}>
            <Text style={style.Title}>Mot de passe</Text> 
          </View>
          
          

          <View>

            <View style={style.AncienMdpContenu}>
              <Ionicons name="person" size={20} color="lightgrey" />
              <Text  style={style.Context}> Ancien mot de passe </Text>
            </View>

            <View>
              <TextInput
                style={{ height: 30, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, borderRadius: 10, }}
                onChangeText={(text) => setInputValue11(text)}
                value={inputValue11}
                placeholder="mot de passe..."
              />
            </View>
          </View>
          <View>

            <View>

              <View style={style.AncienMdpContenu}>
                <Ionicons name="key" size={20} color="lightgrey" />
                <Text style={style.Context}>  Nouveau mot de passe  </Text>
              </View>

              <View>
                <TextInput
                  style={{ height: 30, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, borderRadius: 10, }}
                  onChangeText={(text) => setInputValue12(text)}
                value={inputValue12}
                  placeholder="Nouveau Mot de passe..."
                />
              </View>
            </View>
          </View>

          <View>


            <View>

              <View style={style.AncienMdpContenu}>
                <Ionicons name="lock-closed" size={20} color="lightgrey" />
                <Text style={style.Context}> Confirmez votre mot de passe  </Text>
              </View>

              <View>
                <TextInput
                  style={{ height: 30, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, borderRadius: 10, }}
                  onChangeText={(text) => setInputValue13(text)}
                value={inputValue13}
                  placeholder="Confirmer ..."
                />
              </View>
            </View>
          </View>



          <View style={style.ModifierContenu}>
            <Pressable  onPress={handlePress2} style={({ pressed }) => [
          style.Modifier,
          { backgroundColor: pressed ? '#f94990' : 'white' },
          { borderColor: pressed ? '#f94990' : '#07668f' },
        ]}>
              <Text style={{ fontSize: 12, color: '#07668f' ,fontWeight:'bold',}}>Modifier</Text>
            </Pressable>

          </View>
          
        </View>




       

    </View>






  );
}
const style = StyleSheet.create({
  Container: {
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'space-around',
    width: '100%',
   // height:660,
  },
  scrollView: {
    flex: 1,
  },

  
  Suit:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },

  AncienMdpContenu: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  Title: {
    fontSize: 17,
    fontWeight: 'bold',
    left: 15,
    paddingBottom: 20,
  },
  ModifierContenu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 10,

  },
  Modifier: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   // backgroundColor: '#07668f',
    width: 90,
    height: 25,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth:1,
    borderColor:'#07668f',
  

  },
  Modif1: {
   
    marginTop: 20,
    width: '97%',
    height: 550,
    marginLeft: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: 'lightgrey',


  },
  Modif2: {
    marginTop: 20,
    width: '97%',
    height: 375,
    marginLeft: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    marginRight:5,
  },
  Modif3: {
    
    marginTop: 20,
    width: '97%',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    marginLeft: 5,
  },
  Context:{
    fontSize:11,
  },

});

export default AproposInterfacemodif;
