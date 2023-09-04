import { StatusBar } from "expo-status-bar";
import { useState, useRef } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import domtoimage from "dom-to-image";

// Image Imports
const PlaceholderImage = require("./Images/background-image.png");

// Component Imports
import ImageViewer from "./components/imageViewer/ImageViewer";
import Button from "./components/common/Button/Button";
import CircleButton from "./components/circleButton/CircleButton";
import IconButton from "./components/iconButton/IconButton";
import EmojiPicker from "./components/emojiPicker/EmojiPicker";
import EmojiList from "./components/emojiList/EmojiList";
import EmojiSticker from "./components/emojiSticker/EmojiSticker";

export default function App() {
  const [selectedImage, setSetselectedImage] = useState(null);
  const [showAppOptions, setshowAppOptions] = useState(false);
  const [isModaleVisible, setIsModalVisible] = useState(false);
  const [pickeEmoji, setPickeEmoji] = useState(null);

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();

  const onReset = () => {
    setshowAppOptions(false);
  };
  const onAddSticker = () => {
    setIsModalVisible(true);
  };
  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localURI = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localURI);
        if (localURI) {
          alert("Saved!");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });
        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };
  if (status === null) {
    requestPermission();
  }
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
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeHolderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {pickeEmoji !== null ? (
            <EmojiSticker imageSize={40} stickerSource={pickeEmoji} />
          ) : null}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon={"refresh"} label={"Reset"} onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon={"save-alt"}
              label={"Save"}
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
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
      <EmojiPicker isVisible={isModaleVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickeEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
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
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
