import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import * as ImagePicker from "expo-image-picker";

// Image Imports
const PlaceholderImage = require("./Images/background-image.png");

// Component Imports
import ImageViewer from "./components/imageViewer/ImageViewer";
import Button from "./components/common/Button/Button";

export default function App() {
  const [selectedImage, setSetselectedImage] = useState(null);
  const [showAppOptions, setshowAppOptions] = useState(false);

  //This function enables the user to pick an image from their local files
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSetselectedImage(result.assets[0].uri);
      setshowAppOptions(true);
    } else {
      alert("You did not select an image");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeHolderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      {showAppOptions ? (
        <View />
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label={"Choose a photo"}
            theme={"primary"}
            onPress={pickImageAsync}
          />
          <Button
            label={"Use this photo"}
            onPress={() => setshowAppOptions(true)}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
