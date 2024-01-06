import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  useColorScheme,
} from "react-native";
import React from "react";
import { TextStyle } from "react-native";

export default function InputComponent({
  placeholder,
  options,
  styles,
}: {
  placeholder: string;
  options?: TextInputProps;
  styles?: StyleProp<TextStyle>;
}) {
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  return (
    <TextInput
      secureTextEntry={placeholder === "Password"}
      style={[
        style.input,
        styles,

        {
          backgroundColor: isDarkTheme ? "#161b22" : "white",
          color: isDarkTheme ? "white" : "black",
        },
      ]}
      placeholderTextColor={isDarkTheme ? "#E2E2E2" : "grey"}
      placeholder={placeholder}
      {...options}
    />
  );
}

const style = StyleSheet.create({
  input: {
    backgroundColor: "white",
    height: 55,
    borderRadius: 10,
    borderWidth: 0.5,
    fontFamily: "JakaraSemiBold",
    includeFontPadding: false,
    borderColor: "#E4E3E3",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
