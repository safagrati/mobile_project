import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { View, Button, Text, useColorScheme } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { isDateToday } from "../../../util/date";

export const DatePickerAndroid = ({
  date,
  onChange,
}: {
  date: Date;
  onChange: (event: any, selectedDate: any) => void;
}) => {
  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
      display: "default",
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";

  return (
    <View style={{ height: 45, borderRadius: 10, overflow: "hidden" }}>
      {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}

      <TouchableRipple
        onPress={showDatepicker}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 10,
          overflow: "hidden",
          backgroundColor: !isDarkTheme ? "#E4E2E2" : "#363636",
          paddingLeft: 10,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontFamily: "JakaraMedium",
            color: isDarkTheme ? "white" : "black",
          }}
        >
          {date.toLocaleString().split(",")[0]}{" "}
          {isDateToday(date) && " - Today"}
        </Text>
      </TouchableRipple>
    </View>
  );
};
