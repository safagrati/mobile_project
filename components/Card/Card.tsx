import { ImageBackground, View, Text, StyleSheet } from "react-native";
import Chart from "../Expenses/ChartExpense";
import { Dimensions } from "react-native";

export function CardIncome({
  amountPerDay,
  totalEarned,
}: {
  amountPerDay: number[];
  totalEarned: string;
}) {
  const width = Dimensions.get("window").width;
  return (
    <View style={{ width, alignItems: "center" }}>
      <ImageBackground
        resizeMode="cover"
        imageStyle={{ opacity: 1 }}
        style={style.frontBox}
        source={require("../../assets/images/box-cut.webp")}
      >
        <Text style={style.header}>Total Earned (This week)</Text>

        <Text style={style.money}>{totalEarned || 'TND'}</Text>
        <View style={[style.chartContainer, { width: width * 0.75 }]}>
          <Chart
            height={100}
            width={width * 0.7}
            withHorizontalLabels={false}
            amountPerDay={amountPerDay}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

export function CardExpense({
  amountPerDay,
  totalSpent,
}: {
  amountPerDay: number[];
  totalSpent: string;
}) {
  const width = Dimensions.get("window").width;
  return (
    <View style={{ width, alignItems: "center" }}>
      <ImageBackground
        resizeMode="cover"
        imageStyle={{ opacity: 1 }}
        style={style.frontBox}
        source={require("../../assets/images/box-cut.webp")}
      >
        <Text style={style.header}>Total Spent (This week)</Text>

        <Text style={style.money}>{totalSpent || 'TND'}</Text>
        <View style={[style.chartContainer, { width: width * 0.75 }]}>
          <Chart
            height={100}
            width={width * 0.7}
            withHorizontalLabels={false}
            amountPerDay={amountPerDay}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    height: 300,
    alignItems: "center",
  },
  chartContainer: {
    marginTop: 10,
    height: 100,
    overflow: "hidden",
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  frontBox: {
    height: 210,
    overflow: "hidden",
    aspectRatio: 6442 / 3771,
    padding: 20,
    marginTop: 50,
  },
  cardContent: {
    height: 16,
    width: "100%",
    backgroundColor: "red",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    fontFamily: "RobotoMedium",
  },
  money: {
    fontSize: 40,
    color: "white",
    textAlign: "center",
    fontFamily: "RobotoBold",
  },
  headerRight: {},
});
