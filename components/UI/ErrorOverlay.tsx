import { View, StyleSheet, Text } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setExpense } from "../../redux/slice/expenseSlice";
import { fetchExpenses } from "../../util/http";

export default function ErrorOverlay({ error }: { error: string }) {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>An error occured</Text>
      <Text style={styles.text2}>{error}</Text>
      <Button
        mode="contained"
        style={{ marginTop: 20 }}
        onPress={async () => {
          const expenses = await fetchExpenses();
          dispatch(setExpense(expenses));
        }}
      >
        Retry
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "transparent",
  },

  text1: {
    fontFamily: "JakaraExtraBold",
    fontSize: 30,
  },

  text2: {
    fontFamily: "JakaraSemiBold",
  },
});
