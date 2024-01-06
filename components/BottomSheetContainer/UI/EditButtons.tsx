import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { ArrowRight, TrashIcon } from "../../icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import {
  deleteExpense,
  updateExpense,
} from "../../../redux/slice/expenseSlice";
import { closeModal } from "../../../redux/slice/modalSlice";
import { deleteExpenseOnline } from "../../../util/http";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default function EditButtons({
  updateExpenseHandler,
}: {
  updateExpenseHandler: () => void;
}) {
  const dispatch = useAppDispatch();
  const modalState = useAppSelector((state) => state.modal);

  const deleteExpenseHandler = async () => {
    //console.log(modalState.id, "deleted");
    firestore()
      .collection("expenses")
      .doc(auth().currentUser?.uid)
      .collection(new Date().getFullYear().toString())
      .doc(modalState.id || "")
      .delete()
      .then(() => {
        //console.log('deleted')
      });
    dispatch(deleteExpense({ id: modalState.id || "" }));
    dispatch(closeModal());
  };

  return (
    <View style={styles.buttonContainer}>
      <Button
        onPress={deleteExpenseHandler}
        icon={({ color, size }) => <TrashIcon color={color} size={size} />}
        mode="text"
        textColor="#FF2A29"
        style={{ borderRadius: 10 }}
      >
        Delete
      </Button>
      <Button
        onPress={updateExpenseHandler}
        labelStyle={{ color: "white" }}
        icon={({ color, size }) => <ArrowRight color={color} size={size} />}
        mode="contained"
        contentStyle={{ flexDirection: "row-reverse" }}
        style={{ borderRadius: 10, backgroundColor: "#00BA62" }}
      >
        Update
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",

    alignContent: "center",

    justifyContent: "center",
    flexDirection: "row",
    gap: 2,
  },
});
