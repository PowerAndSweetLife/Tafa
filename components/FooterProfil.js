import React, { useState } from "react";
import { View,Text, StyleSheet,ToastAndroid, Pressable, Modal,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";


function FooterProfil() {
  // custom toast
  const showCustomToast = () => {
    // console.log("Function showCustomToast called");
    Toast.show({
      type: "custom",
      position: "bottom",
      text1: "Custom Toast",
      visibilityTime: 5000,
      customComponent: (
        <CustomToast
          message="Ceci est un toast personnalisé."
          backgroundColor="green"
        />
      ),
    });
  };
  const navigation = useNavigation();
  const onPressBloquer = () => {
    navigation.navigate("bloquer");
  };
  const onPressAnnuler = () => {
    navigation.navigate("contenu");
  };
  
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <View>
        <Pressable onPress={onPressAnnuler}>
          <View style={style.footerspace}>
            <Text style={style.footer1}>Annuler le Match</Text>
          </View>
        </Pressable>
        <Pressable onPress={onPressBloquer}>
          <View style={style.footerspace}>
            <Text style={style.footer2}>Signaler Bella3</Text>
          </View>
        </Pressable>

        {/*testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee  */}

        <Pressable onPress={showCustomToast}>
          <View style={style.footerspace}>
            <Text style={style.footer1} color="red">
              Bloquer DANIII
            </Text>
          </View>
        </Pressable>

        {/* __________________________________________________________ */}
        <Pressable style={style.footerspace} onPress={openModal}>
          <Text style={style.footer1} color="red">
            Bloquer Bella3
          </Text>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        {/* Contenu de votre modal */}
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <Pressable onPress={closeModal}>
              <Ionicons
                style={{ marginLeft: -160, top: -30 }}
                name="close"
                size={30}
                color="#black"
              ></Ionicons>
            </Pressable>
            <Pressable style={style.textModal}>
              <Text>Bloquer , Bella3 ?</Text>
              <Text>lorem lorem lorem lore lorem lorem lorem lorem</Text>
            </Pressable>
            <Pressable style={style.modalPressable} onPress>
              <Text style={{ color: "black", fontSize: 17 }}>
                Oui , Bloquer
              </Text>
            </Pressable>
            <Pressable style={style.modalPressable1}>
              <Text style={{ color: "black", fontSize: 17 }}>Retour</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  footer1: {
    marginLeft: 10,
    width: "95%",
    height: 50,
    backgroundColor: "#dddddd",
    textAlign: "center",
    paddingTop: 13,
    borderRadius: 15,
    color: "black",
    fontSize: 18,
  },
  footer2: {
    marginLeft: 10,
    width: "95%",
    height: 50,
    backgroundColor: "#dddddd",
    textAlign: "center",
    paddingTop: 13,
    borderRadius: 15,
    color: "red",
    fontSize: 18,
  },
  footerspace: {
    marginTop: 10,
  },
  TextFooter1: {
    marginLeft: 10,
    width: "95%",
    height: 50,
    backgroundColor: "#dddddd",
    textAlign: "center",
    paddingTop: 13,
    borderRadius: 15,
    color: "red",
    fontSize: 18,
  },
  modalContainer: {
    //
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    right: 4,
    // marginTop :20
    bottom: 200,
  },
  modalContent: {
    borderRadius: 70,
    height: 300,
    width: 350,
    backgroundColor: "white",
    // opacity : 0.5,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    top: 280,
    paddingTop: 45,
  },
  signalerView: {
    fontSize: 20,
    color: "black",
  },
  modalPressable: {
    backgroundColor: "red",
    opacity: 0.8,
    borderWidth: 1,
    height: 50,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#777",
    margin: 5,
  },
  modalPressable1: {
    // backgroundColor: "red",
    opacity: 0.8,
    borderWidth: 1,
    height: 50,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#f94990",
    margin: 5,
  },
  textModal: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FooterProfil;
