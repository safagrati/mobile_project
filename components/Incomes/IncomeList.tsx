import { FlashList } from "@shopify/flash-list";
import React, {
    ReactNode,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from "react";
import ListContainer from "./ListContainer";
import { Incomes } from "../../data/model";
import { FlatList, LayoutAnimation, RefreshControl, View } from "react-native";
import { fetchIncomes } from "../../util/http";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setIncome } from "../../redux/slice/incomeSlice";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
export default function IncomeList({
    incomes,
    ListHeaderComponent,
    periodName,
}: {
    incomes: Incomes[];
    periodName: string;
    ListHeaderComponent?: JSX.Element;
}) {
    const [refreshing, setRefreshing] = React.useState(false);
    const dispatch = useAppDispatch();
    const memoIncome = useMemo(() => incomes, [incomes]);

    const onRefresh = React.useCallback(() => {
        async function getIncomes() {
            let incomeList: {
                id: string;
                name: string;
                category: any;
                date: any;
                amount: number;
            }[] = [];

            const incomes = await firestore()
                .collection("incomes")
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
                        incomeList.push(snap);
                    });
                });

            dispatch(setIncome(incomeList));
        }
        getIncomes();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <FlashList
                decelerationRate={"fast"}
                fadingEdgeLength={60}
                estimatedItemSize={200}
                data={memoIncome}
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
                    <ListContainer periodName={periodName} income={item} />
                )}
            />
        </View>
    );
}
