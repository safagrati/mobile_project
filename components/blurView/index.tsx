import React, { Component, ReactNode } from "react";
import { View, Image, Text, StyleSheet, useColorScheme } from "react-native";
import { BlurView } from "@react-native-community/blur";

export default function Blur({ children }: { children?: ReactNode }) {
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  return (
    <View style={styles.container}>
      {children}
   
      <BlurView
        style={styles.absolute}
        blurType={isDarkTheme ? "dark" : "light"}
        blurAmount={5}
        blurRadius={8}
        reducedTransparencyFallbackColor={isDarkTheme? "black": "white"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  absolute: {
    position: "absolute",
    top: 0,

    left: 0,
    bottom: 0,
    right: 0,
  },
});
