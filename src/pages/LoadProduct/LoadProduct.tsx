import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import BtImagenPicker from "../../components/BtImagenPicker";

export default function LoadProduct() {
  return (
    <View>
      <BtImagenPicker />
      <TextInput placeholder="Nombre del producto" style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "white",
    borderColor: "white",
  },
});
