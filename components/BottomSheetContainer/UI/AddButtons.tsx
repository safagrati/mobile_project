import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { ArrowRight, TrashIcon } from "../../icons";
import { addExpense, updateExpense } from "../../../redux/slice/expenseSlice";
import { closeModal } from "../../../redux/slice/modalSlice";
import { useAppDispatch } from "../../../redux/hooks/hooks";
import { useState } from "react";

export default function AddButtons({updateExpenseHandler}: {updateExpenseHandler: ()=> void}) {


  return (
    <View style={[styles.buttonContainer]}>
      <Button
        onPress={() => {
          updateExpenseHandler();
        }}
        icon={({ color, size }) => <ArrowRight color={color} size={size} />}
        mode="contained"
        labelStyle={{
          fontSize: 16,
          fontFamily: "JakaraSemiBold",
          color: "white",
        }}
        contentStyle={{ flexDirection: "row-reverse", height: 50 }}
        style={{
          borderRadius: 10,
          height: 50,
          backgroundColor: "#00BA63",
          width: "100%",
          justifyContent: "center",
        }}
      >
        Add
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    gap: 2,
  },
});
