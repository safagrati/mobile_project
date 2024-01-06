import {
  eachDayOfInterval,
  format,
  formatDistance,
  formatRelative,
  subDays,
} from "date-fns";
import { Expenses } from "../data/model";
import { Incomes } from "../data/model"
import { enUS } from "date-fns/locale";

function isDate7DaysLess(inputDate: Date): boolean {
  const currentDate = new Date();
  const threeDaysAgo = new Date(
    currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );

  return inputDate.getTime() <= threeDaysAgo.getTime();
}

export function getFormatDate(date: Date): string {
  if (isDate7DaysLess(date)) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  return format(date, "EEE", { locale: enUS });
}

export function getFormatDateAll(date: Date): string {

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getLessThanDate(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export function isDateToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function getDatesForCurrentWeek(): Date[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - dayOfWeek
  );
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(
      sunday.getFullYear(),
      sunday.getMonth(),
      sunday.getDate() + i
    );
    dates.push(date);
  }

  return dates;
}


export function filterExpenseForCurrentWeek(expense: Expenses[]): Expenses[] {


  return expense.filter((expense) => {
    return getDatesForCurrentWeek().some((date) => {
      return (
        date.getFullYear() === expense.date.getFullYear() &&
        date.getMonth() === expense.date.getMonth() &&
        date.getDate() === expense.date.getDate()
      );
    });
  });
}

export function getAmountsPerDay(expense: Expenses[]) {

  const newList = expense.reduce((acc: Expenses[], expense) => {
    const date = new Date(
      expense.date.getFullYear(),
      expense.date.getMonth(),
      expense.date.getDate()
    );
    const existingExpense = acc.find((item) => {
      const itemDate = new Date(
        item.date.getFullYear(),
        item.date.getMonth(),
        item.date.getDate()
      );
      return itemDate.getTime() === date.getTime();
    });
    if (existingExpense) {
      existingExpense.amount += expense.amount;
    } else {
      acc.push({
        date,
        amount: expense.amount,
        id: (date.getDay() + 1).toString(),
        category: null,
        name: "",
      });
    }
    return acc;
  }, []);

  const amountswithId = newList.map((item) => { return { id: item.id, amounts: item.amount } });
  return amountswithId;
}


export const makeAmountList = (expenseList: Expenses[]) => {
  let amountList: any = [];

  for (let i = 1; (i <= 7); i++) {

    const day = getAmountsPerDay(expenseList).find(
      (item) => Number(item.id) === i
    );
    if (day) {
      amountList.push(day?.amounts);
    }
    else {
      amountList.push(0)
    }
  }

  return amountList;
};
///incomes///
export function filterIncomeForCurrentWeek(income: Incomes[]): Incomes[] {
  return income.filter((income) => {
    return getDatesForCurrentWeek().some((date) => {
      return (
        date.getFullYear() === income.date.getFullYear() &&
        date.getMonth() === income.date.getMonth() &&
        date.getDate() === income.date.getDate()
      );
    });
  });
}

export function getAmountsPerDayIncomes(income: Incomes[]) {
  const newList = income.reduce((acc: Incomes[], income) => {
    const date = new Date(
      income.date.getFullYear(),
      income.date.getMonth(),
      income.date.getDate()
    );
    const existingIncome = acc.find((item) => {
      const itemDate = new Date(
        item.date.getFullYear(),
        item.date.getMonth(),
        item.date.getDate()
      );
      return itemDate.getTime() === date.getTime();
    });
    if (existingIncome) {
      existingIncome.amount += income.amount;
    } else {
      acc.push({
        date,
        amount: income.amount,
        id: (date.getDay() + 1).toString(),
        category: null,
        name: "",
      });
    }
    return acc;
  }, []);

  const amountsWithId = newList.map((item) => ({
    id: item.id,
    amounts: item.amount,
  }));
  return amountsWithId;
}

export const makeIncomeAmountList = (incomeList: Incomes[]) => {
  let amountList: any = [];

  for (let i = 1; i <= 7; i++) {
    const day = getAmountsPerDayIncomes(incomeList).find(
      (item) => Number(item.id) === i
    );
    if (day) {
      amountList.push(day?.amounts);
    } else {
      amountList.push(0);
    }
  }

  return amountList;
};





export function getMonthsUpToCurrent(): string[] {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const months: string[] = [];
  for (let month = 1; month <= currentMonth; month++) {
    const date = new Date(currentYear, month - 1, 1);
    const monthName = date.toLocaleString('en-US', { month: 'short' });
    months.push(monthName);
  }

  return months;
}