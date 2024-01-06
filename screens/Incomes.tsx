import { View, StyleSheet, Button } from "react-native";

import AnalyticsCard from "../components/Card/AnalyticsCard";

import IncomeComponent from "../components/Incomes/IncomeComponent";

import { useAppSelector, useAppDispatch } from "../redux/hooks/hooks";
import {
    filterIncomeForCurrentWeek,
    getAmountsPerDay,
    getAmountsPerDayIncomes,
    getLessThanDate,
    makeAmountList,
} from "../util/date";
import { FadeInView } from "../components/FadeInView";
import { useEffect, useState } from "react";

import { setIncome } from "../redux/slice/incomeSlice";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function Incomes() {
    const incomeList = useAppSelector((state) => state.income.incomes);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    const thisweekincome = filterIncomeForCurrentWeek(incomeList);

    const sortedIncome = thisweekincome.sort(
        (a, b) => Number(b.date) - Number(a.date)
    );
    const incomeSum = thisweekincome?.reduce(
        (acc, curr) => acc + curr.amount,
        0
    );
    const formattedIncomeSum = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(incomeSum);
    let amountperDay;
    if (thisweekincome.length > 0) {
        amountperDay = makeAmountList(thisweekincome);
        //console.log("🚀 ~ file: Home.tsx:32 ~ Home ~ amountperDay:", amountperDay);
    }

    useEffect(() => {
        setIsFetching(true);
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
                    setIsFetching(false);
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
                })
                .catch((error) => {
                    setIsFetching(false);
                    setError(error);
                });



            dispatch(setIncome(incomeList));
        }
        getIncomes();
    }, []);
    if (isFetching) {
        return <LoadingOverlay />;
    }
    if (error) {
        return <ErrorOverlay error={error} />;
    }
    return (
        <FadeInView style={styles.root}>
            <View>
                <AnalyticsCard
                    amountPerDay={amountperDay || [0]}
                    totalSpent={formattedIncomeSum.split(".")[0]}
                />
            </View>
            <View style={styles.sec}>
                <IncomeComponent incomes={sortedIncome} periodName="📅 This week" />
            </View>
        </FadeInView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop: 40,
    },
    sec: {
        flex: 1,
        marginTop: 10
    },
    moneyContainer: {
        alignItems: "center",
    },
    allTimeText: {
        fontSize: 20,

        color: "grey",
    },
    moneyText: {
        fontSize: 50,
        includeFontPadding: false,

        color: "black",
    },
});
