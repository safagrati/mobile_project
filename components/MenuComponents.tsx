import { Pressable, View } from "react-native";
import { Button, Menu } from "react-native-paper";
import { More } from "./icons";

export default function MenuComponents({
  visible,
  openMenu,
  closeMenu,
}: {
  visible: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}) {
  return (
    <Menu
    
      contentStyle={{ backgroundColor: "#1a1b1c", borderRadius: 12 , }}
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <View style={{ width: 30, height: 30 }}>
          <Pressable onPress={openMenu}>
            <More size={25} color="white" />
          </Pressable>
        </View>
      }
    >
      <Menu.Item leadingIcon="redo" titleStyle={{color:"white"}}  onPress={() => {}} title="Redo" />
      <Menu.Item leadingIcon="undo" titleStyle={{color:"white"}}  onPress={() => {}} title="Undo" />
      
    </Menu>
  );
}
