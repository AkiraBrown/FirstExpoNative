import { View, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function CircleButton({ onPress }) {
  return (
    <View style={style.circleButtonContainer}>
      <Pressable style={style.circleButton} onPress={onPress}>
        <MaterialIcons name="add" size={38} color={"#25292e"} />
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: "#ffd33d",
    borderRadius: 42,
    padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 42,
    backgroundColor: "#fff",
  },
});

export default CircleButton;
