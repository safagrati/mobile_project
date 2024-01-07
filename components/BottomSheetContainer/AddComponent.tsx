import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  TextInput,
  useColorScheme,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import HeaderTextClose from "../UI/HeaderTextClose";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import InputText from "./UI/InputText";

import { ScrollView } from "react-native-gesture-handler";
import ChipContainer from "./UI/Chip";
import { Dimensions } from "react-native";
import { useRef, useState } from "react";
import { categoryList } from "../../data/category";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DatePickerAndroid } from "./UI/DatePicker";
import { AnimatedButton } from "./UI/AnimateButton";
import AddButtons from "./UI/AddButtons";
import { Category } from "../../data/model";
import { closeModal } from "../../redux/slice/modalSlice";
import { addExpense } from "../../redux/slice/expenseSlice";
import { AnimatedView } from "./UI/Animate";
import { storeExpense } from "../../util/http";
import Modal from "react-native-modal";
import LoadingOverlay from "../UI/LoadingOverlay";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default function AddComponent() {
  const width = Dimensions.get("screen").width;
  const [isFetching, setIsFetching] = useState(false);
  const expense = useAppSelector((state) => state.expense.expenses);



  const dispatch = useAppDispatch();
  const modalState = useAppSelector((state) => state.modal);
  const [content, setContent] = useState<{
    expName: { value: string; isValid: boolean };
    amount: { value: string; isValid: boolean };
  }>(() => {
    return {
      expName: {
        value: "",
        isValid: true,
      },
      amount: {
        value: "",
        isValid: true,
      },
    };
  });

  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  const [date, setDate] = useState(() => new Date());
  const [category, setCategory] = useState<{
    value: Category | null;
    isValid: boolean;
  }>({
    value: null,
    isValid: true,
  });

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const handleChange = (inputIdentifier: string, enteredText: string) => {
    setContent((currentInput) => {
      return {
        ...currentInput,
        [inputIdentifier]: { value: enteredText, isValid: true },
      };
    });
  };

  const handlePressed = (inputIdentifier: Category) => {
    if (category.value === inputIdentifier) {
      return setCategory({ value: null, isValid: false });
    }
    setCategory({ value: inputIdentifier, isValid: true });
  };
  const handleClose = () => {
    setCategory({ value: null, isValid: false });
  };

  const addExpenseHandler = async () => {
    const amountIsValid =
      !isNaN(Number(content.amount.value)) && Number(content.amount.value) > 0;
    const expNameIsValid = content.expName.value.trim().length > 0;
    const categoryIsValid = typeof category.value === "string";
    setContent((content) => {
      return {
        amount: { value: content.amount.value, isValid: amountIsValid },
        expName: { value: content.expName.value, isValid: expNameIsValid },
      };
    });
    setCategory((category) => {
      return {
        value: category.value,
        isValid: categoryIsValid,
      };
    });
    if (!amountIsValid || !expNameIsValid || !categoryIsValid) {
      return;
    }

    if (category.value !== null) {
      if (Keyboard.isVisible()) {
        return Keyboard.dismiss();
      }
      if (!Keyboard.isVisible()) {
        setIsFetching(true);
        firestore()
          .collection("expenses")
          .doc(auth().currentUser?.uid)
          .collection(new Date().getFullYear().toString())
          .add({
            name: content.expName.value,
            amount: Number(content.amount.value),
            category: category.value,
            date: date,
          })

          .then((e) => {
            dispatch(
              addExpense({
                id: e.id,
                name: content.expName.value,
                amount: Number(content.amount.value),
                category: category.value,
                date: date,
              })
            );
          });

        dispatch(closeModal());
      }
    }
  };

  const inValidForm =
    !content.amount.isValid || !content.expName.isValid || !category.isValid;
  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <HeaderTextClose header="Add Expense" />
        <View style={{ width: "100%", height: "100%", gap: 10 }}>
          <AnimatedView isVisible={inValidForm}>
            <Text style={{ textAlign: "center", color: "red" }}>
              Error in inputs
            </Text>
          </AnimatedView>
          <InputText
            value={content.expName.value}
            onChange={handleChange.bind(null, "expName")}
            invalid={!content.expName.isValid}
            label="Expense Name"
          />
          <InputText
            icon={"DT"}
            invalid={!content.amount.isValid}
            value={content.amount.value}
            onChange={handleChange.bind(null, "amount")}
            label="Amount"
            textInputConfig={{
              keyboardType: "number-pad",
            }}
          />

          <View style={{ height: 60, width: width, paddingLeft: 2, gap: 5 }}>
            <Text
              style={{
                fontFamily: "JakaraExtraBold",
                color: category.isValid ? "#7E7C7C" : "red",
              }}
            >
              Select a category
            </Text>
            <ScrollView
              horizontal={true}
              style={{ flex: 1 }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 6 }}
            >
              {categoryList.map((cat) => (
                <ChipContainer
                  handlePressed={handlePressed.bind(null, cat.type)}
                  handleClose={handleClose}
                  key={cat.type}
                  pressed={cat.type === category.value}
                  color={isDarkTheme ? "#FFFFFF" : cat.color}
                  text={cat.type}
                />
              ))}
            </ScrollView>
          </View>
          <View>
            <Text style={{ fontFamily: "JakaraExtraBold", color: "#656565" }}>
              Date
            </Text>
            <DatePickerAndroid date={date} onChange={onChange} />
          </View>
        </View>
        <AnimatedButton isVisible={modalState.isOpen && modalState.id === null}>
          <AddButtons updateExpenseHandler={addExpenseHandler} />
        </AnimatedButton>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 2,
  },
});
