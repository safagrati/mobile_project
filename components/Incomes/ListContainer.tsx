import { StyleSheet, View, Text, useColorScheme } from "react-native";
import { Incomes } from "../../data/model";
import { getFormatDate, getFormatDateAll } from "../../util/date";
import { TouchableRipple } from "react-native-paper";

import { useAppDispatch } from "../../redux/hooks/hooks";
import { openModalEdit } from "../../redux/slice/modalSlice";

export default function ListContainer({
    income,
    periodName,
}: {
    income: Incomes;
    periodName: string;
}) {

    const dispatch = useAppDispatch();
    const theme = useColorScheme();

    const isDarkTheme = theme === "dark";
    function renderEmoji() {
        if (income.category === "Salary") {
            return "🍝";
        } else if (income.category === "Freelance") {
            return "🌐";
        } else {
            return "📦";
        }
    }

    const formattedIncomeSum = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "TND",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(income.amount);

    const trimExpName = () => {
        if (income.name.length > 20) {
            return `${income.name.slice(0, 20)} ...`;
        } else {
            return income.name;
        }
    };


    return (
        <View style={styles.touchable}>
            <TouchableRipple
                rippleColor={!isDarkTheme ? "#E3CBCB" : "#000000"}
                style={{ backgroundColor: isDarkTheme ? "#161b22" : "white" }}
                onPress={() => {
                    dispatch(openModalEdit({ id: income.id }));
                }}
            >
                <View style={[styles.listContainer]}>
                    <View style={styles.leftSide}>
                        <View
                            style={[
                                styles.emojiContainer,
                                { backgroundColor: isDarkTheme ? "#3F3F3F" : "#f8f9fb" },
                            ]}
                        >
                            <Text style={styles.emojiTextStyle}>{renderEmoji()}</Text>
                        </View>
                        <View style={styles.costName}>
                            <Text
                                style={[
                                    styles.textHead,
                                    { color: isDarkTheme ? "white" : "black" },
                                ]}
                            >
                                {trimExpName()}
                            </Text>
                            <Text style={styles.textFoot}>
                                {periodName != `📅 ${new Date().getFullYear().toString()}`
                                    ? getFormatDate(income.date)
                                    : getFormatDateAll(income.date)}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.rightSide}>
                        <Text
                            style={[
                                styles.textHead,
                                { textAlign: "right" },
                                { color: isDarkTheme ? "white" : "black" },
                            ]}
                        >
                            {formattedIncomeSum}
                        </Text>
                        <Text style={[styles.textFoot, { textAlign: "right" }]}></Text>
                    </View>
                </View>
            </TouchableRipple>
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: "row",
        padding: 20,

        alignItems: "center",

        justifyContent: "space-between",
    },
    emojiContainer: {
        padding: 10,
        borderRadius: 12,
    },
    emojiTextStyle: {
        fontSize: 20,
    },
    leftSide: {
        flexDirection: "row",
        alignItems: "center",
    },
    costName: {
        marginLeft: 10,
    },
    textHead: {
        fontSize: 16,
        fontFamily: "JakaraExtraBold",
    },
    textFoot: {
        fontSize: 14,
        color: "#606060",
        fontFamily: "JakaraExtraBold",
    },
    rightSide: {},
    touchable: {
        borderRadius: 20,
        padding: 0,

        marginBottom: 10,

        overflow: "hidden",
    },
});
