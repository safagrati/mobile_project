export type Category =
  | "Food"
  | "Transport"
  | "Movie"
  | "Internet"
  | "Others"
  | "Club"
  | "Rent"
  | "Savings"
  | "Salary"
  | "Freelance"
  ;

export class Expenses {
  id: string;
  category: Category | null;
  name: string;
  amount: number;
  date: Date;
  constructor(
    id: string,
    category: Category,
    name: string,
    amount: number,
    date: Date
  ) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.amount = amount;
    this.date = date;
  }
}

export class Incomes {
  id: string;
  category: Category | null;
  name: string;
  amount: number;
  date: Date;
  constructor(
    id: string,
    category: Category,
    name: string,
    amount: number,
    date: Date
  ) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.amount = amount;
    this.date = date;
  }
}