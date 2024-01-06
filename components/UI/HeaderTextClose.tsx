import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  useColorScheme,
  ToastAndroid,
} from "react-native";
import IconButton from "./IconButton";
import { CloseCircleIcon } from "../icons";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { closeModal, openModalAdd } from "../../redux/slice/modalSlice";
import { useEffect, useState } from "react";
import { doNothing } from "../../redux/slice/expenseSlice";
import Toast from "react-native-toast-message";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";

export default function HeaderTextClose({ header }: { header: string }) {
  const dispatch = useAppDispatch();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const theme = useColorScheme();

  const isDarkTheme = theme === "dark";
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTextContainer}>
        <Text
          style={[
            styles.headerText,
            { color: isDarkTheme ? "white" : "black" },
          ]}
        >
          {header}
        </Text>
      </View>
      <View style={styles.closeContainer}>
        <View style={{ height: 30, width: 30 }}>
          <IconButton
            onPress={() => {
              // Keyboard.dismiss();
              // if (isKeyboardVisible){
              // setTimeout(() => {
              //   dispatch(closeModal());
              // }, 50);}else {
              //   dispatch(closeModal());
              // }
              if (isKeyboardVisible) {
                Toast.show({
                  type: "presstoClose",
                  text1: " to dismiss",
                });

                return Keyboard.dismiss();
              }
              if (!isKeyboardVisible) {
                return dispatch(closeModal());
              }

              dispatch(closeModal());
            }}
            size={30}
          >
            <CloseCircleIcon color={"#FF0000"} size={30} />
          </IconButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
  headerText: {
    fontFamily: "JakaraExtraBold",
    fontSize: 20,
    includeFontPadding: false,
  },
  closeContainer: {
    alignItems: "flex-start",
  },
  headerTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
