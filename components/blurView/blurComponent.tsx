import { View, Text, useColorScheme } from "react-native";

import { Button, Modal, Portal } from "react-native-paper";
import { AnimatedViewBlur } from "../BottomSheetContainer/UI/AnimateBlur";
import Blur from ".";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { closeBlurModal } from "../../redux/slice/blurModalSlice";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavigationProp, ProfileProp } from "../../types/navigation";
import { resetExpense } from "../../redux/slice/expenseSlice";
import { ForbiddenIcon } from "../icons";

export default function BlurComponent() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ProfileNavigationProp>();
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  const blurModal = useAppSelector((state) => state.blurModal);
  const deleteAllHandler = () => {
    console.log(auth().currentUser);
    const colRef = firestore()
      .collection("expenses")
      .doc(auth().currentUser?.uid)
      .collection(new Date().getFullYear().toString());
    colRef.get().then((query) => {
      Promise.all(query.docs.map((d) => d.ref.delete()));
    });
    dispatch(closeBlurModal());
    dispatch(resetExpense());
    navigation.navigate("ExpenseApp");
  };
  return (
    <Portal>
      <AnimatedViewBlur isVisible={blurModal.isOpen}>
        <Blur />
      </AnimatedViewBlur>
      <Modal
        visible={blurModal.isOpen}
        onDismiss={() => {
          dispatch(closeBlurModal());
        }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ForbiddenIcon color="red" size={100} />
        <Text
          style={{
            textAlign: "center",
            fontFamily: "JakaraExtraBold",
            color: "white",
          }}
        >
          Do you really want to delete every Expense ?
        </Text>
        <View style={{ justifyContent: "center" }}>
          <View style={{ flexDirection: "row", gap: 6, marginTop: 20 }}>
            <Button
              style={{ borderRadius: 10, backgroundColor: "#F04438" }}
              labelStyle={{ color: "white", fontFamily: "JakaraExtraBold" }}
              mode="contained"
              onPress={deleteAllHandler}
            >
              Yes
            </Button>
            <Button
              style={{ borderRadius: 10, backgroundColor: "#12B76A" }}
              labelStyle={{ color: "white", fontFamily: "JakaraExtraBold" }}
              onPress={() => {
                dispatch(closeBlurModal());
              }}
              mode="contained"
            >
              No
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
