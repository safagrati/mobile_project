import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import ExpenseComponent from "../components/Expenses/ExpenseComponent";
import ChartFull from "../components/Expenses/ChartFull";
import { useAppSelector } from "../redux/hooks/hooks";
import { groupedExpensesTotal, makeAmountList } from "../util/groupbyMonth";

export default function AllExpenses() {
  const expensesList = useAppSelector((state) => state.expense.expenses);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // Filter expenses for the last 12 months
  const newExpense = expensesList.filter(expense => {
    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear();
    const expenseMonth = expenseDate.getMonth() + 1;

    return (
      (currentYear - expenseYear === 1 && expenseMonth >= currentMonth) ||
      (currentYear - expenseYear === 0 && currentMonth - expenseMonth <= 11)
    );
  });

  const expenseAmountPerMonth = makeAmountList(newExpense);
  const sortedExpense = newExpense.sort(
    (a, b) => Number(b.date) - Number(a.date)
  );

  return (
    <View style={styles.root}>
      <View style={styles.allExpensesContainer}>
        <Text style={styles.allExpensesText}>All Expenses</Text>
      </View>
      <View style={styles.main}>
        <ExpenseComponent
          expenses={sortedExpense}
          periodName="Last 12 Months"
          ListHeaderComponent={
            <ChartFull expenseAmount={expenseAmountPerMonth} />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  main: {
    flex: 1,
    marginTop: 30,
  },
  allExpensesContainer: {
    marginTop: 30,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    includeFontPadding: false,
  },
  allExpensesText: {
    textAlign: "center",

    fontFamily: "JakaraExtraBold",
    fontSize: 20,
  },
});