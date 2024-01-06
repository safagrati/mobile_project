import React, { useState, useEffect, ReactNode } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  RegisteredStyle,
  ViewStyle,
} from "react-native";
import { useAppSelector } from "../../../redux/hooks/hooks";

export const AnimatedButton = ({
  isVisible,
  style,
  children,
}: {
  isVisible: boolean;
  style?: RegisteredStyle<ViewStyle>;
  children: ReactNode;
}) => {
  const [animation] = useState(new Animated.Value(0));
  const [shouldRender, setShouldRender] = useState(isVisible);
  const modalOpen = useAppSelector((state) => state.modal.isOpen);

  useEffect(() => {
    //console.log("shouldRender", shouldRender);
    if (isVisible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        //console.log("dddd");
        return setShouldRender(false);
      });
    }
    if (modalOpen) {
      setShouldRender(true);
    }
  }, [isVisible, modalOpen]);

  const animatedStyle = {
    opacity: animation,
  };

  const getCurrentValue = () => {};

  return (
    <View
      style={{
        position: "absolute",
        zIndex: 999,
        display: shouldRender ? "flex" : "none",
        bottom: 20,
        paddingHorizontal: 20,
        width: "100%",
      }}
    >
      <Animated.View style={[animatedStyle]}>{children}</Animated.View>
    </View>
  );
};
