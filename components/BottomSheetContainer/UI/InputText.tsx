import { useTheme } from "react-native-paper";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { TextInputProps } from "react-native";

export default function InputText({
  label,
  value,
  onChange,
  invalid,
  icon,
  placeholder,
  textInputConfig,
}: {
  label: string;
  value: string;
  icon?: JSX.Element | string;
  invalid: boolean;
  onChange: (text: string) => void;
  placeholder?: string;
  textInputConfig?: TextInputProps;
}) {
  const [focused, setFocused] = useState(false);

  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  const labelText:any = [styles.labelText]

  if (invalid){
    labelText.push({color:  "red"})
  }
  return (
    <View style={{ width: "100%", height: 70, gap: 4 }}>
      <Text style={labelText}>{label}</Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: isDarkTheme ? "#363636" : "#E4E2E2",
          gap: 8,
          flex: 1,
          paddingHorizontal: focused ? 9 : 10,
          borderRadius: 10,
          borderColor:
            focused && isDarkTheme
              ? "white"
              : focused && !isDarkTheme
              ? "black"
              : invalid
              ? "red"
              : "white",
          borderWidth: focused || invalid ? 1 : 0,
        }}
      >
        {icon && (
          <View
            style={{
              height: "100%",
              width: 30,
              alignItems: "center",
              paddingVertical: 10,
              gap: 8,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: isDarkTheme  ? "white" : "black",
                fontFamily: "JakaraExtraBold",
                includeFontPadding: false,
              }}
            >
              {icon}
            </Text>
            <View
              style={{ width: 2, backgroundColor: "#777474", height: "100%" }}
            />
          </View>
        )}
        <TextInput
          {...textInputConfig}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          style={{
            width: "100%",
            height: "100%",
            includeFontPadding: false,
            fontSize: 18,
            color: isDarkTheme ? "white" : "black",
            fontFamily: "JakaraExtraBold",
          }}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labelText: {
    fontFamily: "JakaraExtraBold",
    color: "#939191",
  },
});
