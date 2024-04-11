import React from "react";
import { View, Text, StyleSheet } from "react-native";


function AproposInterface() {
  return (
    <View style={style.Container}>
      <View style={style.Contenu}>
        <View  >
          <Text style={style.Langue}>Homme</Text>
          <Text style={style.Langue}>Celibataire</Text>
          <Text style={style.Langue}>30 ans</Text>
          <Text style={style.Langue}>1m67</Text>
          <Text style={style.Langue}>Habite a Antananarivo,Madagascar </Text>
          <Text style={style.Langue}>Recherche une relation serieux</Text>
        </View>


        <View>
          <Text style={style.TextLight}>Emploi</Text>
          <Text style={style.esthic}>Esthiticienne</Text>
        </View>


        <View>
          <Text style={style.TextLight}>Etude</Text>
          <Text style={style.esthic}>Droit a l'unniversite d'antananarivo</Text>
        </View>


        <View>
          <Text style={style.TextLight}>Centres et intérêt</Text>
        </View>


        <View style={style.ContenuInteret}>
          <Text style={style.interet}>basket</Text>
          <Text style={style.interet}>cinema</Text>
          <Text style={style.interet}>balade a vélo</Text>
        </View>


        <View>
          <Text style={style.TextLight}>Langues</Text>
        </View>


        <View >
          <Text style={style.Langue}>Francais</Text>
          <Text style={style.Langue}>Anglais</Text>
        </View>


        <View>
          <Text style={style.TextLight}>Signe astrologique</Text>
          <Text style={style.Langue}>Verseau</Text>
        </View>

        <View>
          <Text style={style.TextLight}>Mode de vie</Text>
          <Text style={style.Langue}>Alcool : pour le grand occasion</Text>
          <Text style={style.Langue}>Cigarette : Non</Text>
        </View>


      </View>
    </View>

  );
}
const style = StyleSheet.create({
  Container: {
    display: 'flex',
    flexDirection: 'column',
   backgroundColor:'white',
    alignItems: 'center',
      width:'100%',
      height:400,
  },
  Contenu:{
    width:'91%',
  },
  TextLight:{
    color:'lightgrey',
    marginTop:10,
  },
  ContenuInteret:{
    display:'flex',
    flexDirection:'row',
    width:'70%',
    justifyContent:'space-around',
    left:-5,
  },
  interet:{
   backgroundColor:'lightgrey',
   borderRadius:15,
   paddingLeft:10,
   paddingRight:10,
   fontSize:12,
  },
  Langue:{
    fontSize:12,
  },
});

export default AproposInterface;
