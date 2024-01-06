import * as React from "react";
import { DefaultTheme, PaperProvider, useTheme } from "react-native-paper";
import App from "./App/AppComponent";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { View, Text, Appearance, useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AuthComponent from "./App/AuthComponent";
import auth from "@react-native-firebase/auth";
import { FadeInView } from "./components/FadeInView";

SplashScreen.preventAutoHideAsync();
export default function Main() {
  const [fontsLoaded] = useFonts({
    PantonExtraBold: require("./assets/fonts/Panton.ttf"),
    JakaraExtraBold: require("./assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    JakaraMedium: require("./assets/fonts/PlusJakartaSans-Medium.ttf"),
    JakaraSemiBold: require("./assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const Navigation = () => {
    const theme = useColorScheme();
    const isDarkTheme = theme === "dark";
    const [user, setUser] = useState();

    async function onAuthStateChanged(user: any) {
      setUser(user);
      //console.log("🚀 ~ file: App.tsx:44 ~ onAuthStateChanged ~ user:", user)
      await SplashScreen.hideAsync();
    }

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }, []);

    return (
      <NavigationContainer onReady={onLayoutRootView}>
        {!user ? (
          <FadeInView style={{ flex: 1, backgroundColor: isDarkTheme ? "#000000" :"#FFFFFF" }}>
            <AuthComponent />
          </FadeInView>
        ) : (
          <App />
        )}
      </NavigationContainer>
    );
  };
  return (
    <PaperProvider>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </PaperProvider>
  );
}
