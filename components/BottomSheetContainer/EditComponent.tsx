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
import { Category } from "../../data/model";
import { AnimatedButton } from "./UI/AnimateButton";
import EditButtons from "./UI/EditButtons";
import { updateExpense } from "../../redux/slice/expenseSlice";
import { closeModal } from "../../redux/slice/modalSlice";
import { AnimatedView } from "./UI/Animate";
import { updateExpenseOnline } from "../../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";

export default function EditComponent() {
  const width = Dimensions.get("screen").width;
  const modalState = useAppSelector((state) => state.modal);
  const expense = useAppSelector((state) => state.expense.expenses);
  const income = useAppSelector((state) => state.income.incomes);
  const dispatch = useAppDispatch();
  ////console.log(modalState.id);
  const [isFetching, setIsFetching] = useState(false);
  const pageExpense = expense?.filter((exp) => {
    return exp.id === modalState.id;
  });

  const [content, setContent] = useState(() => {
    return {
      expName: { value: pageExpense[0]?.name, isValid: true },
      amount: { value: pageExpense[0]?.amount?.toString(), isValid: true },
    };
  });

  const [category, setCategory] = useState<{
    value: Category | null;
    isValid: boolean;
  }>(() => {
    return { value: pageExpense[0]?.category, isValid: true };
  });

  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  const [date, setDate] = useState(() => pageExpense[0]?.date);

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
      //console.log("I am the same");
      return setCategory({ value: null, isValid: false });
    }
    setCategory({ value: inputIdentifier, isValid: true });
  };
  const handleClose = () => {
    setCategory({ value: null, isValid: false });
  };
  const updateExpenseHandler = async () => {
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
    if (Keyboard.isVisible()) {
      return Keyboard.dismiss();
    }
    if (!Keyboard.isVisible()) {
      setIsFetching(true);
      dispatch(
        updateExpense({
          id: modalState.id || "",
          expense: {
            name: content.expName.value,
            amount: Number(content.amount.value),
            category: category.value,
            date,
          },
        })
      );
      await updateExpenseOnline(modalState.id || "", {
        name: content.expName.value,
        amount: Number(content.amount.value),
        category: category.value,
        date,
      }).catch((e) => {
        //console.log(`error  is ${e}`);
      });
      dispatch(closeModal());
    }
    //console.log("✅", content, category, date);
  };

  const inValidForm =
    !content.amount.isValid || !content.expName.isValid || !category.isValid;
  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <HeaderTextClose header="Edit Expense" />
        <View style={{ width: "100%", height: "100%", gap: 10 }}>
          <AnimatedView isVisible={inValidForm}>
            <Text style={{ textAlign: "center", color: "red" }}>
              Error in inputs
            </Text>
          </AnimatedView>
          <InputText
            value={content.expName.value || ""}
            invalid={!content.expName.isValid}
            onChange={handleChange.bind(null, "expName")}
            label="Expense Name"
          />
          <InputText
            icon={"₦"}
            textInputConfig={{ keyboardType: "number-pad" }}
            invalid={!content.amount.isValid}
            value={content.amount.value || ""}
            onChange={handleChange.bind(null, "amount")}
            label="Amount"
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
        <AnimatedButton isVisible={modalState.isOpen && modalState.id !== null}>
          <EditButtons updateExpenseHandler={updateExpenseHandler} />
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
