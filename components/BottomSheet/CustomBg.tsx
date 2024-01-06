import React, { useMemo } from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";
import { View, useColorScheme } from "react-native";

export const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  //#region styles
  const theme = useColorScheme();

  const isDarkTheme = theme === "dark";
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    // @ts-ignore
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      ["#D7EBA800", isDarkTheme ? "#00000000" : "#D7EBA8"]
    ),
  }));
  const containerAnimatedStyleBottom = useAnimatedStyle(() => ({
    // @ts-ignore
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      ["#ffffff", isDarkTheme ? "#00000000" : "#ffffff"]
    ),
  }));
  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle]
  );
  const containerStyleBottom = useMemo(
    () => [style, containerAnimatedStyleBottom],
    [style, containerAnimatedStyleBottom]
  );

  // render
  return (
    <>
      <Animated.View
        pointerEvents="none"
        style={[
          containerStyle,
          { borderRadius: 20, marginLeft: 20, marginTop: 10, marginRight: 20, },
        ]}
      ></Animated.View>
      <Animated.View style={[
          containerStyleBottom,
          { borderRadius: 20, marginLeft: 0, marginTop: 100, marginRight: 0, },
        ]}>

      </Animated.View>
    </>
  );
};

export default CustomBackground;
