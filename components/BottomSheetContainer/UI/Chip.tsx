import { useState } from "react";
import { View, Text, GestureResponderEvent } from "react-native";
import { Chip } from "react-native-paper";
import { CloseCircleIcon } from "../../icons";
import { Category } from "../../../data/model";

export default function ChipContainer({
  color,
  text,
  handlePressed,
  handleClose,
  pressed,
}: {
  color: string;
  text: string;
  handlePressed: (e: GestureResponderEvent, category?: Category) => void;
  handleClose: () => void;
  pressed: boolean;
}) {
  return (
    <Chip
      icon={() => null}
      selectedColor={color}
      closeIcon={({ size, color }) => (
        <CloseCircleIcon size={size} color={color} />
      )}
      mode={pressed ? "outlined" : "flat"}
      textStyle={{
        color,
        fontSize: 15,
        textAlign: "center",
        marginBottom: 0,
        marginTop: 0,
        marginLeft: 0,
        marginRight: pressed ? 0 : 7,
      }}
      style={{
        backgroundColor: `${color}23`,
        borderColor: color,
        padding: 0,
        margin: 0,
        height: 25,
      }}
      onClose={!pressed ? undefined : handleClose}
      onPress={handlePressed}
    >
      {text}
    </Chip>
  );
}
