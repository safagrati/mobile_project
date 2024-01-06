import { TouchableRipple } from "react-native-paper";
import { AddIcon } from "../icons";
import { StyleSheet, View, useColorScheme } from "react-native";

export default function AddNewExpenseButton({
  pressColor,
  tintColor,
  onPress,
}: {
  pressColor: string | undefined;
  tintColor: string | undefined;
  onPress: () => void;
}) {
  const theme = useColorScheme();

  const isDarkTheme = theme === "dark";
  return (
    <View style={style.touchable}>
      <TouchableRipple
        onPress={onPress}
        style={{ backgroundColor: isDarkTheme ? "#161b22" : "#ADC5B6" }}
      >
        <AddIcon color={isDarkTheme ? "white" : "#00465B"} size={40} />
      </TouchableRipple>
    </View>
  );
}

const style = StyleSheet.create({
  touchable: {
    borderRadius: 12,
    height: 40,
    padding: 0,
    marginRight: 10,
    backgroundColor: "#00000016",
    overflow: "hidden",
  },
});
