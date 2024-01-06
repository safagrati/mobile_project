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
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import AddNewExpenseButton from "../components/UI/AddNewExpenseButton";
import {
  BackIcon,
  CalendarIcon,
  HomeIcon,
  LogoutIcon,
  ProfileIcon,
} from "../components/icons";
import { BottomSheetContainer } from "../components/BottomSheet/BottomSheet";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useAppDispatch } from "../redux/hooks/hooks";
import { openModalAdd } from "../redux/slice/modalSlice";
import { TouchableRipple } from "react-native-paper";
import { FadeInView } from "../components/FadeInView";
import Profile from "../screens/Profile";
import { useAppSelector } from "../redux/hooks/hooks";
import { useColorScheme } from "react-native";
import { Image } from "expo-image";
import auth from "@react-native-firebase/auth";

import {
  ExpenseProp,
  ProfileProp,
  RootStackParamList,
} from "../types/navigation";
import IconButton from "../components/UI/IconButton";

import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { toastConfig } from "../components/UI/CustomToastConfig";

import BlurComponent from "../components/blurView/blurComponent";
import Incomes from "../screens/Incomes";
const Stack = createNativeStackNavigator<RootStackParamList>();
// const Tab = createBottomTabNavigator();

const Tab = createMaterialTopTabNavigator();
function BottomTabNavigator() {
  const theme = useColorScheme();

  const isDarkTheme = theme === "dark";
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      sceneContainerStyle={{
        backgroundColor: isDarkTheme ? "#000000" : "transparent",
        paddingHorizontal: 25,
      }}
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "transparent",
        },

        tabBarAndroidRipple: {
          color: !isDarkTheme ? "#DED2FF" : "#212020",
          borderless: true,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: isDarkTheme ? "white" : "black",
        tabBarStyle: {
          height: 70,
          backgroundColor: isDarkTheme ? "#000000" : "#FFFFFF",
          borderTopWidth: isDarkTheme ? 1 : 0,
          borderTopColor: "#282828",
          shadowColor: "red",

          shadowRadius: 200,
          elevation: 18,
          borderTopLeftRadius: isDarkTheme ? 0 : 15,
          borderTopRightRadius: isDarkTheme ? 0 : 15,
        },
        // headerTitleStyle: {
        //   paddingHorizontal: 10,

        //   fontSize: 30,
        // },
      }}
    >

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon size={30} color={color} />,
          // headerTitle: "Home",
          // headerTransparent: true,
          // headerPressColor: "#7B5D5D",
          // headerTintColor: "#000000",
        }}
      />
      <Tab.Screen
        name="Incomes"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon size={30} color={color} />,
          // headerTitle: "Home",
          // headerTransparent: true,
          // headerPressColor: "#7B5D5D",
          // headerTintColor: "#000000",
        }}
      />

      <Tab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          // headerTitle: "Spending",
          // headerTransparent: true,

          tabBarIcon: ({ color }) => <CalendarIcon size={30} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const signout = () => {
  auth()
    .signOut()
    .then(() => console.log("User signed out!"));
};
export default function App() {
  const dispatch = useAppDispatch();
  const blurModal = useAppSelector((state) => state.blurModal);

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
      <BlurComponent />
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
                name="ExpenseApp"
                component={BottomTabNavigator}
                options={({ navigation }: ExpenseProp) => {
                  return {
                    headerShown: true,
                    headerTitle: "",

                    headerLeft: ({ }) => (
                      <FadeInView
                        style={{
                          width: 48,
                          marginLeft: 5,
                          borderRadius: 100,
                          overflow: "hidden",
                        }}
                      >
                        <TouchableRipple
                          style={{ borderRadius: 100 }}
                          onPress={() => {
                            navigation.navigate("Profile");
                          }}
                        >
                          {auth().currentUser?.photoURL !== null ? (
                            <Image
                              source={auth().currentUser?.photoURL}
                              style={{ height: 48, width: 48 }}
                            />
                          ) : (
                            <ProfileIcon
                              size={48}
                              color={isDarkTheme ? "white" : "black"}
                            />
                          )}
                        </TouchableRipple>
                      </FadeInView>
                    ),
                    headerRight: ({ tintColor }) => (
                      <FadeInView style={{ width: 50 }}>
                        <AddNewExpenseButton
                          pressColor={tintColor}
                          tintColor={tintColor}
                          onPress={() => {
                            dispatch(openModalAdd());
                          }}
                        />
                      </FadeInView>
                    ),
                    headerShadowVisible: false,
                    headerTransparent: true,
                  };
                }}
              />
              <Stack.Screen
                name="Profile"
                options={({ navigation }: ProfileProp) => {
                  return {
                    animation: "slide_from_left",
                    animationDuration: 1,
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                    headerTintColor: isDarkTheme ? "white" : "black",
                    headerBackVisible: false,

                    headerLeft: ({ tintColor, canGoBack }) => (
                      <IconButton
                        size={40}
                        radius={10}
                        onPress={() => {
                          navigation.goBack();
                        }}
                      >
                        <BackIcon size={40} color={tintColor || "green"} />
                      </IconButton>
                    ),
                    headerRight: () => (
                      <IconButton size={40} radius={10} onPress={signout}>
                        <LogoutIcon size={40} color={"#d00f4c"} />
                      </IconButton>
                    ),
                    headerTitleStyle: {
                      fontFamily: "JakaraExtraBold",
                      fontSize: 20,
                      color: isDarkTheme ? "white" : "black",
                    },
                    headerTransparent: true,
                  };
                }}
                component={Profile}
              />
            </Stack.Navigator>
          </ImageBackground>
        </BottomSheetContainer>
      </BottomSheetModalProvider>
    </>
  );
}
