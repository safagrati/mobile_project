import { View, Text, StyleSheet, KeyboardAvoidingView, useColorScheme } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputComponent from "../components/Auth/Input";
import ProfileLottie from "../components/UI/Profile";
import { Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GoogleICon } from "../components/icons";
import validator from "validator";
import {
  createAccountWithEmail,
  loginWithEmail,
} from "../firebase/auth/withEmail";
import Toast from "react-native-toast-message";
import { SignUpProp } from "../types/navigation";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
export default function SignupScreen({ navigation }: SignUpProp) {
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";

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
  const [googleLoading, setIsGoogleLoading] = useState(false);
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

  const handlePassword = (text: string) => {
    //console.log(text);
    if (!validator.isStrongPassword(text)) {
      setInput((prev) => {
        return { ...prev, password: { value: text, isValid: false } };
      });
      return false;
    }
    setInput((prev) => {
      return { ...prev, password: { value: text, isValid: true } };
    });
  };

  const submitHandler = async () => {
    setIsloading(true);
    createAccountWithEmail(input.email.value, input.password.value)
      .then((response) => {

      })
      .catch((e: any) => {

        if (e.code === "auth/email-already-in-use") {
          Toast.show({
            type: "loginToast",
            text1: "That email address is already in use!",
          });
        } else if (e.code === "auth/invalid-email") {
          Toast.show({
            type: "loginToast",
            text1: "That email address is invalid!",
          });
        }
        setIsloading(false);
      });
  };

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 200, width: 200 }}>
          <ProfileLottie />
        </View>
        <View style={{ width: "100%", height: "100%" }}>
          <View style={{ gap: 10 }}>
            <Text style={{ fontFamily: "JakaraSemiBold" }}>Sign up!</Text>
            <InputComponent
              placeholder="Email"
              styles={{
                borderColor: input.email.isValid ? "#E4E3E3" : "red",
                borderWidth: 1.5,
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
            <InputComponent
              placeholder="Password"
              options={{
                value: input.password.value,
                onChangeText: (text) => {
                  handlePassword(text);
                },
              }}
              styles={{
                borderColor: input.password.isValid ? "#E4E3E3" : "red",
                borderWidth: 1.5,
              }}
            />

            <Button
              mode="contained"
              loading={loading}
              disabled={
                input.email.value.length < 1 ||
                input.password.value.length < 1
                /*||
                !input.password.isValid ||
                !input.email.isValid*/
              }
              onPress={submitHandler}

              labelStyle={{ fontFamily: "JakaraSemiBold" }}
              style={{ height: 50, borderRadius: 10 }}
              contentStyle={{ height: 50 }}
            >
              Sign up
            </Button>
            <Button
              mode="outlined"
              onPress={() => {
                navigation.replace("Login");
              }}
              labelStyle={{ fontFamily: "JakaraSemiBold" }}
              style={{ height: 50, borderRadius: 10, borderColor: "#AA00FF" }}
              contentStyle={{ height: 50 }}
            >
              Have have an account ? Login
            </Button>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          ></View>
          <Button
            mode="contained"
            loading={googleLoading}
            labelStyle={{
              fontFamily: "JakaraSemiBold",
              includeFontPadding: false,
              color: isDarkTheme ? "white" : "black"
            }}
            textColor="black"
            onPress={() => {
              setTimeout(() => { setIsGoogleLoading(true) }, 100)
              onGoogleButtonPress().then(() =>
                setIsGoogleLoading(false)
              ).catch(() => { setIsGoogleLoading(false) })
            }
            }
            icon={({ size, color }) => (
              <GoogleICon size={size + 5} color={color} />
            )}
            style={{
              height: 50,
              borderRadius: 10,
              backgroundColor: isDarkTheme ? "#33193A" : "#FDF5FF",
              borderWidth: 0.5,

              borderColor: "#F7D9FF",
            }}
            contentStyle={{
              height: 50,
              justifyContent: "space-between",
              paddingRight: 100,
            }}
          >
            Signup with Google
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 12,

    alignItems: "center",
  },
});