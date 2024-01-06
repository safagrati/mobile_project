import { StyleSheet, View, Text, useColorScheme } from "react-native";

import IncomeList from "./IncomeList";
import { Incomes } from "../../data/model";
import EmptyLottie from "../UI/EmptyLottie";
export default function IncomeComponent({
    incomes,
    periodName,
    ListHeaderComponent,
}: {
    incomes: Incomes[];
    periodName: string;
    ListHeaderComponent?: JSX.Element;
}) {
    const theme = useColorScheme();

    const isDarkTheme = theme === "dark";
    const incomeSum = incomes.reduce((acc, curr) => acc + curr.amount, 0);
    const formattedIncomeSum = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(incomeSum);
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
                    {formattedIncomeSum}
                </Text>
            </View>
            {incomes.length > 0 ? (
                <IncomeList
                    periodName={periodName}
                    incomes={incomes}
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
