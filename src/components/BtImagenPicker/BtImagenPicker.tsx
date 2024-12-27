import React, { useEffect, useState } from "react";
import { Alert, Button, View, StyleSheet, Image } from "react-native";
import { ImageItem } from "../../types/types";
import * as FileSystem from "expo-file-system";
import { loadImages, pickImage } from "../../utils/imagePicker";

export default function ImagePicker() {
  const [images, setImages] = useState<ImageItem>();
  const appFolder = `${FileSystem.documentDirectory}images`;

  // Crear el directorio si no existe
  useEffect(() => {
    const setupFolder = async () => {
      const dirInfo = await FileSystem.getInfoAsync(appFolder);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(appFolder, { intermediates: true });
      }
    };

    const fetchImages = async () => {
      await setupFolder(); // Asegura que esta listo el directorio
      const loadedImages = await loadImages();
      setImages(loadedImages); // Actualiza el estado con las imágenes cargadas
    };

    fetchImages();
  }, [appFolder]);

  return (
    <View>
      <View style={styles.buttons}>
        <Button
          title="Añadir Imagen"
          onPress={() =>
            Alert.alert("Añadir imagen", "¿Que quieres hacer?", [
              {
                text: "Usar camara",
                onPress: async () => {
                  const ima = await pickImage("camera");
                  setImages(ima);
                },
              },
              {
                text: "Elegir de galeria",
                onPress: async () => {
                  const ima = await pickImage("gallery");
                  setImages(ima);
                },
              },
            ])
          }
        />
      </View>
      <Image source={{ uri: images?.uri }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
});
