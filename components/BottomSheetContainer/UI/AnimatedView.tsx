import React, {
  useState,
  useEffect,
  ReactNode,
  PropsWithChildren,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  RegisteredStyle,
  ViewStyle,
} from "react-native";
import { useAppSelector } from "../../../redux/hooks/hooks";

type FadeInViewProps = PropsWithChildren<{ style: ViewStyle }>;

export const AnimatedViewBottomSheet = ({
  isVisible,

  children,
}: {
  isVisible: boolean;

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
        duration: 150,
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
  if (shouldRender)
    return (
      <Animated.View style={[{ width: "100%", height: "100%" }, animatedStyle]}>
        {children}
      </Animated.View>
    );
  return <></>;
};
