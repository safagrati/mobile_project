import { FlashList } from "@shopify/flash-list";
import React, {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import ListContainer from "./ListContainer";
import { Expenses } from "../../data/model";
import { FlatList, LayoutAnimation, RefreshControl, View } from "react-native";
import { fetchExpenses } from "../../util/http";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setExpense } from "../../redux/slice/expenseSlice";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
export default function ExpenseList({
  expenses,
  ListHeaderComponent,
  periodName,
}: {
  expenses: Expenses[];
  periodName: string;
  ListHeaderComponent?: JSX.Element;
}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useAppDispatch();
  const memoExpense = useMemo(() => expenses, [expenses]);

  const onRefresh = React.useCallback(() => {
    async function getExpenses() {
      let expenseList: {
        id: string;
        name: string;
        category: any;
        date: any;
        amount: number;
      }[] = [];

      const expenses = await firestore()
        .collection("expenses")
        .doc(auth().currentUser?.uid)
        .collection(new Date().getFullYear().toString())
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            const snap = {
              id: documentSnapshot.id,
              name: documentSnapshot.data().name,
              category: documentSnapshot.data().category,
              date: documentSnapshot.data().date.toDate(),
              amount: documentSnapshot.data().amount,
            };
            expenseList.push(snap);
          });
        });

      dispatch(setExpense(expenseList));
    }
    getExpenses();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        decelerationRate={"fast"}
        fadingEdgeLength={60}
        estimatedItemSize={200}
        data={memoExpense}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        stickyHeaderHiddenOnScroll
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={
          periodName === `📅 ${new Date().getFullYear().toString()}`
            ? true
            : false
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListContainer periodName={periodName} expense={item} />
        )}
      />
    </View>
  );
}
