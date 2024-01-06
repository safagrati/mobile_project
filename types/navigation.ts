import { NavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  ExpenseApp: undefined;
  Profile: undefined;

  BottomSheet: undefined;
};

export type RootStackAuthParamList = {
  Login: undefined;
  Signup: undefined;
  Reset: undefined;
};

export type ExpenseProp = NativeStackScreenProps<
  RootStackParamList,
  "ExpenseApp"
>;
export type ProfileProp = NativeStackScreenProps<RootStackParamList, "Profile">;
export type LoginProp = NativeStackScreenProps<RootStackAuthParamList, "Login">;
export type ResetProp = NativeStackScreenProps<RootStackAuthParamList, "Reset">;
export type SignUpProp = NativeStackScreenProps<
  RootStackAuthParamList,
  "Signup"
>;
export type BottomSheetProp = NativeStackScreenProps<
  RootStackParamList,
  "BottomSheet"
>;
export type ProfileNavigationProp = NavigationProp<
  RootStackParamList,
  "Profile"
>;

export type ResetNavigationProp = NavigationProp<
  RootStackAuthParamList,
  "Reset"
>;
