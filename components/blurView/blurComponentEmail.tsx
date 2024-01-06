import { View, Text, useColorScheme } from "react-native";

import { Button, Modal, Portal } from "react-native-paper";
import { AnimatedViewBlur } from "../BottomSheetContainer/UI/AnimateBlur";
import Blur from ".";

import { useNavigation } from "@react-navigation/native";
import { ResetNavigationProp } from "../../types/navigation";


export default function BlurComponentEmail({
  isVisible,
  closeModal,
  text,
}: {
  isVisible: boolean;
  closeModal: () => void;
  text: string;
}) {
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
const navigation = useNavigation<ResetNavigationProp>()
  const mailAddress = text?.split("@")[1]?.split(".")[0];
  return (
    <Portal>
      <AnimatedViewBlur isVisible={isVisible}>
        <Blur />
      </AnimatedViewBlur>
      <Modal
        visible={isVisible}
        onDismiss={closeModal}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDarkTheme ? "black" : "white",
       padding:20,
          marginHorizontal: 100,
          borderRadius: 20,
          alignContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "JakaraExtraBold",
            color: isDarkTheme ? "white" : "black",
          }}
        >
          Open your {mailAddress} app and follow the reset link
        </Text>
        <Button onPress={()=>{
          closeModal()
          navigation.navigate('Login')
          
        }} mode='contained' style={{marginTop:20}} labelStyle={{ fontFamily: "JakaraExtraBold",}}>Okay</Button>
      </Modal>
    </Portal>
  );
}
