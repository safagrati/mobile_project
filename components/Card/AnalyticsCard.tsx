import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  useColorScheme,
} from "react-native";
import { More } from "../icons";
import ChartTest from "../Expenses/Chart";
import { useState } from "react";
import MenuComponents from "../MenuComponents";
import { useWindowDimensions } from "react-native";
import Card from "./Card";

export default function AnalyticsCard({
  amountPerDay,
  totalSpent,
}: {
  amountPerDay: number[];
  totalSpent: string;
}) {
  const { height, width } = useWindowDimensions();
  const theme = useColorScheme();

  const isDarkTheme = theme === "dark";

  return (
    <View style={style.root}>
      <View
        style={[
          style.backBox,
          { backgroundColor: !isDarkTheme ? "#F6E6A6" : "#F6E6A63B" },
        ]}
      ></View>

      <ScrollView
        horizontal
        style={{ width }}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToInterval={width} //your element width
        snapToAlignment={"center"}
      >
        <Card amountPerDay={amountPerDay} totalSpent={totalSpent} />
  
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    height: 270,
    alignItems: "center",
  },
  backBox: {
    height: 200,
    width: "90%",
    position: "absolute",
    marginTop: 60,
    borderRadius: 20,
    transform: [{ rotateY: "8deg" }, { rotateZ: "6deg" }],
    backgroundColor: "#F6E6A6",
  },
});
