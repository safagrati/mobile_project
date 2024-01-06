import {
  View,
  Text,
  LayoutChangeEvent,
  ImageBackground,
  Dimensions,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "../screens/AllExpenses";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import AddNewExpenseButton from "../components/UI/AddNewExpenseButton";
import { BackIcon, CalendarIcon, HomeIcon } from "../components/icons";
import { BottomSheetContainer } from "../components/BottomSheet/BottomSheet";
import { useCallback, useRef } from "react";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useAppDispatch } from "../redux/hooks/hooks";
import { openModalAdd } from "../redux/slice/modalSlice";
import { Avatar, TouchableRipple } from "react-native-paper";
import { FadeInView } from "../components/FadeInView";
import Profile from "../screens/Profile";
import { useAppSelector } from "../redux/hooks/hooks";
import { useColorScheme } from "react-native";

import {
  ExpenseProp,
  LoginProp,
  ProfileProp,
  RootStackAuthParamList,
  RootStackParamList,
  SignUpProp,
} from "../types/navigation";
import IconButton from "../components/UI/IconButton";
import BottomSheetScreen from "../screens/BottomSheetScreen";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { toastConfig } from "../components/UI/CustomToastConfig";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

const Stack = createNativeStackNavigator<RootStackAuthParamList>();
// const Tab = createBottomTabNavigator();

export default function AuthComponent() {
  const dispatch = useAppDispatch();

  const { width, height } = Dimensions.get("window");
  const theme = useColorScheme();

  const isDarkTheme = theme === "dark";
  return (
    <>
      <StatusBar
        animated={true}
        style={isDarkTheme ? "light" : "dark"}
        backgroundColor="transparent"
      />
      <View style={{ position: "absolute", width: "100%", zIndex: 999 }}>
        <Toast config={toastConfig} />
      </View>
      <BottomSheetModalProvider>
        <BottomSheetContainer>
          {/* {<BottomSheetScreen/>} */}

          <ImageBackground
            resizeMode="cover"
            style={{ flex: 1 }} //! style={{flex:1}}, incase of ui issues
            imageStyle={{ opacity: 0.1 }}
            source={require("../assets/images/bg.webp")}
          >
            <Stack.Navigator
              screenOptions={{
                contentStyle: {
                  backgroundColor: isDarkTheme ? "#000000" : "#FFFFFF00",
                },
              }}
            >
              <Stack.Screen
                name="Login"
                options={({ navigation }: LoginProp) => {
                  return {
                    animation: "fade",
                    animationDuration: 1,
                    headerShadowVisible: false,
                    headerShown: false,
                    headerTitleAlign: "center",
                    headerTintColor: isDarkTheme ? "white" : "black",
                    headerBackVisible: false,
                    headerTransparent: true,
                  };
                }}
                component={LoginScreen}
              />
              <Stack.Screen
                name="Signup"
                options={({ navigation }: SignUpProp) => {
                  return {
                    animation: "fade",
                    animationDuration: 1,
                    headerShadowVisible: false,
                    headerShown: false,
                    headerTitleAlign: "center",
                    headerTintColor: isDarkTheme ? "white" : "black",
                    headerBackVisible: false,
                    headerTransparent: true,
                  };
                }}
                component={SignupScreen}
              />
              <Stack.Screen
                name="Reset"
                options={{
                  animation: "fade",
                  animationDuration: 1,
                  headerShadowVisible: false,
                  headerShown: false,
                  headerTitleAlign: "center",
                  headerTintColor: isDarkTheme ? "white" : "black",
                  headerBackVisible: false,
                  headerTransparent: true,
                }}
                component={ResetPasswordScreen}
              />
            </Stack.Navigator>
          </ImageBackground>
        </BottomSheetContainer>
      </BottomSheetModalProvider>
    </>
  );
}
