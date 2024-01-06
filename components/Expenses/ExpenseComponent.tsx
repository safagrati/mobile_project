import { StyleSheet, View, Text, useColorScheme } from "react-native";

import ExpenseList from "./ExpenseList";
import { Expenses } from "../../data/model";
import EmptyLottie from "../UI/EmptyLottie";
export default function ExpenseComponent({
  expenses,
  periodName,
  ListHeaderComponent,
}: {
  expenses: Expenses[];
  periodName: string;
  ListHeaderComponent?: JSX.Element;
}) {
  const theme = useColorScheme();

  const isDarkTheme = theme === "dark";
  const expenseSum = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const formattedExpenseSum = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(expenseSum);
  return (
    <View style={styles.root}>
      <View
        style={[
          styles.header,
          { backgroundColor: isDarkTheme ? "#161b22" : "white" },
        ]}
      >
        <Text
          style={[styles.textHead, { color: isDarkTheme ? "white" : "black" }]}
        >
          {periodName}
        </Text>
        <Text
          style={[styles.textHead, { color: isDarkTheme ? "white" : "black" }]}
        >
          {formattedExpenseSum}
        </Text>
      </View>
      {expenses.length > 0 ? (
        <ExpenseList
        periodName={periodName}
          expenses={expenses}
          ListHeaderComponent={ListHeaderComponent}
        />
      ) : (
        <EmptyLottie />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    borderRadius: 10,
    padding: 10,

    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textHead: {
    fontSize: 15,

    fontFamily: "JakaraExtraBold",
  },
});
