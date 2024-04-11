import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomToast = ({ message, backgroundColor }) => (
  <View style={[styles.toastContainer, { backgroundColor }]}>
    <Text style={styles.toastText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  toastContainer: {
    padding: 16,
    borderRadius: 8,
  },
  toastText: {
    color: "white",
    fontSize: 16,
  },
});

export default CustomToast;
