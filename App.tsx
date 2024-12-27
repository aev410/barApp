import { StyleSheet, View } from "react-native";
import LoadProduct from "./src/pages/LoadProduct";

export default function App() {
  return (
    <View style={styles.container}>
      <LoadProduct />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A2329",
    alignItems: "center",
    justifyContent: "center",
  },
});
