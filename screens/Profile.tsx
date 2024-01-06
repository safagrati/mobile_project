import { View, Text } from "react-native";
import TestApp from "../components/BottomSheetContainer/UI/AnimatedFlatlist";
import { Button } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import ProfileComponent from "../components/BottomSheetContainer/ProfileComponent";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
 
  return (
    <SafeAreaView style={{ marginTop: 50 , flex:1}}>
      <ProfileComponent />
     
    </SafeAreaView>
  );
}
