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

export const AnimatedViewBlur = ({
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

  useEffect(() => {
    setShouldRender(true)
    if (isVisible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(()=>{
       
      });
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
  }, [isVisible]);

  const animatedStyle = {
    opacity: animation,
  };

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: "absolute",
          top: 0,
          display: !shouldRender ? "none" : "flex",
          left: 0,
          bottom: 0,
          right: 0,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};
