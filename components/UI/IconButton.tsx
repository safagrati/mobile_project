import { TouchableRipple } from "react-native-paper";
import { AddIcon } from "../icons";
import { StyleSheet, View } from "react-native";
import { ReactNode } from "react";

export default function IconButton({
 
  size,
  onPress,
  children,
  radius,
}: {
  radius?: number,
  size: number;
  onPress: () => void;
  children: ReactNode;
}) {
  return (
    <View style={[style.touchable, { height: size, borderRadius: radius=== undefined ? 100: radius }]}>
      <TouchableRipple onPress={onPress} style={{height:40,width:40}}>{children}</TouchableRipple>
    </View>
  );
}

const style = StyleSheet.create({
  touchable: {
    borderRadius: 100,
    height: 40,
    padding: 0,

    overflow: "hidden",
  },
});
