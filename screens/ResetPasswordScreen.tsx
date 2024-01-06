import { View, Text, StyleSheet, useColorScheme, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";

import InputComponent from "../components/Auth/Input";

import { Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import validator from "validator";

import { ResetProp } from "../types/navigation";
import auth from "@react-native-firebase/auth";
import ResetLottie from "../components/UI/ResetLottie";
import BlurComponentEmail from "../components/blurView/blurComponentEmail";

export default function ResetPasswordScreen({ navigation }: ResetProp) {
  const [input, setInput] = useState({
    email: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
  });

  const [loading, setIsloading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const closeModal = () => {
    setIsVisible(false);
  };

  const openModal = () => {
    setIsVisible(true);
  };
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  const validateEmail = (text: string) => {
    //console.log(text);

    if (!validator.isEmail(text)) {
      //console.log("Email is Not Correct");
      setInput((prev) => {
        return { ...prev, email: { value: text, isValid: false } };
      });
      return false;
    } else {
      setInput((prev) => {
        return { ...prev, email: { value: text, isValid: true } };
      });

      //console.log("Email is Correct");
    }
  };

  useEffect(() => {
    const backAction = () => {
     navigation.goBack()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const submitHandler = async () => {
    setIsloading(true);
    auth()
      .sendPasswordResetEmail(input.email.value)
      .then(() => {
        openModal();
        setIsloading(false);
      })
      .catch(() => {});
  };
  return (
    <>
      <BlurComponentEmail isVisible={isVisible} closeModal={closeModal} text={input.email.value} />
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.screen}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: 200, width: 200 }}>
            <ResetLottie />
          </View>
          <View style={{ width: "100%", height: "100%" }}>
            <View style={{ gap: 10 }}>
              <Text style={{ fontFamily: "JakaraSemiBold" }}>
                Reset Password
              </Text>
              <InputComponent
                placeholder="Email"
                styles={{
                  borderColor: input.email.isValid ? "#E4E3E3" : "red",
                  borderWidth: 1.5,
                  color: isDarkTheme ? "white" : "black",
                }}
                options={{
                  autoCapitalize: "none",
                  autoCorrect: false,
                  value: input.email.value,
                  onChangeText: (text) => {
                    validateEmail(text);
                  },
                }}
              />

              <Button
                mode="contained"
                loading={loading}
                disabled={input.email.value.length < 1 || !input.email.isValid}
                onPress={submitHandler}
                labelStyle={{ fontFamily: "JakaraSemiBold" }}
                style={{ height: 50, borderRadius: 10 }}
                contentStyle={{ height: 50 }}
              >
                Reset Password
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 12,

    alignItems: "center",
  },
});
