function getMonth(dateStr: string): number {
  const dateObj = new Date(dateStr);
  return dateObj.getMonth() + 1;
}

type Expenses = {
  id: string;
  category: any
  name: string;
  amount: number;
  date: Date;
}

// group the list by month
export const groupedExpensesTotal = (expenseList: Expenses[]) =>
  expenseList.reduce(
    (acc: { month: number; totalAmount: number }[], transaction: Expenses) => {
      const month = getMonth(transaction.date.toISOString());
      const existingMonth = acc.find((item) => item.month === month);
      if (existingMonth) {
        existingMonth.totalAmount += transaction.amount;
      } else {
        acc.push({ month, totalAmount: transaction.amount });
      }
      return acc;
    },
    []
  );

export function makeAmountList(expenses: Expenses[]): number[] {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  console.log("current year: ", currentYear)
  console.log("current month: ", currentMonth)
  const amounts: number[] = Array(12).fill(0);

  expenses.forEach(expense => {
    console.log("expense: ", expense);
    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear();
    const expenseMonth = expenseDate.getMonth() + 1;
    console.log("expenseMonth: ", expenseMonth);
    console.log("expenseYear: ", expenseYear);
    if (
      (currentYear - expenseYear === 1 && expenseMonth > currentMonth) ||
      (currentYear - expenseYear === 0)
    ) {
      const index = (expenseMonth - currentMonth + 11) % 12; // Calculate the correct index in the array
      amounts[index] += expense.amount;
    }
  });

  return amounts;
}