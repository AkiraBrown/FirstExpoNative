import { View, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function IconButton({ icon, label, onPress }) {
  return (
    <Pressable style={style.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color={"#fff"} />
      <Text style={style.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

export default IconButton;

const style = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});
