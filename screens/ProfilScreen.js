import React from "react";
import { View, Text, SafeAreaView, ScrollView ,StyleSheet } from "react-native";
import NavProfil from "../components/Profil/NavProfil";
import Profil from "../components/Profil/Profil";
import Footer from "../components/Profil/Footer";

function ProfilScreen() {
  return (
    <SafeAreaView stickyHeaderIndices={[2]} style={styles.Container}>
      <NavProfil />
      <ScrollView>
        <Profil />
       
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  }


})
export default ProfilScreen;
