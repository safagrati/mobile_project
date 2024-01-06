

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
  // print the grouped list
  
  export const makeAmountList = (expenseList: Expenses[]) => {
    let amountList:any = [];
  
    for (let i = 1; (i <= new Date().getMonth()+1); i++) {
   
        const month = groupedExpensesTotal(expenseList).find(
          (item) => item.month === i
        );
       if (month){
        amountList.push(month?.totalAmount/1000);}
        else{
          amountList.push(0)
        }
    }
  
    return amountList;
  };
 
  