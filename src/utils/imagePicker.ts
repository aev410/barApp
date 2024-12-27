import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { ImageItem } from "../types/types";

const appFolder = `${FileSystem.documentDirectory}images`;

// Cargar imágenes desde el directorio
export const loadImages = async () => {
  try {
    const files = await FileSystem.readDirectoryAsync(appFolder);
    const loadedImages = files.map((file) => ({
      id: file,
      uri: `${appFolder}/${file}`,
    }));
    return loadedImages[0];
  } catch (error) {
    throw new Error("Error al cargar imágenes: " + error);
  }
};

// Seleccionar imagen (desde cámara o galería)
export const pickImage = async (
  source: "camera" | "gallery",
): Promise<ImageItem> => {
  let result: ImagePicker.ImagePickerResult;
  if (source === "camera") {
    result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
  } else {
    result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
  }

  if (!result.canceled && result.assets) {
    const savedPath = await saveImageToAppFolder(result.assets[0].uri);
    if (savedPath) {
      return { id: Date.now().toString(), uri: savedPath };
    }
  }
  throw new Error("Error al seleccionar imagen");
};

// Guardar una imagen en el sistema de archivos
const saveImageToAppFolder = async (uri: string): Promise<string | null> => {
  const fileName = `${Date.now()}.jpg`; // Crear un nombre único
  const newPath = `${appFolder}/${fileName}`;
  try {
    await FileSystem.copyAsync({ from: uri, to: newPath });
    return newPath; // Devolver la nueva ruta de la imagen
  } catch (error) {
    console.error("Error al guardar la imagen:", error);
    return null;
  }
};

export const deleteImage = async (id: string) => {
  try {
    const filePath = `${appFolder}/${id}`;
    await FileSystem.deleteAsync(filePath);
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
  }
};
