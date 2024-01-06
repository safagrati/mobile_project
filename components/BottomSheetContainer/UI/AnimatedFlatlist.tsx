import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity, Animated } from "react-native";

const DATA = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
  { id: "4", title: "Item 4" },
  { id: "5", title: "Item 5" },
];

const AnimatedFlatList = ({
  data,
}: {
  data: { id: string; title: string }[];
}) => {
  const [animatedData, setAnimatedData] = useState(data);

  const handleDeleteItem = (id: any) => {
    const index = animatedData.findIndex((item) => item.id === id);
    const newData = [...animatedData];
    newData.splice(index, 1);
    setAnimatedData(newData);
  };

  const handleRenderItem = ({
    item,
    index,
  }: {
    item: { id: string; title: string };
    index: number;
  }) => {
    const animation = new Animated.Value(1);

    const handleDelete = () => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        handleDeleteItem(item.id);
      });
    };

    const animatedStyle = {
      opacity: animation,
    };

    return (
      <>
        <Animated.View style={[animatedStyle]}>
          <Text>{item.title}</Text>
        </Animated.View>
      </>
    );
  };

  return (
    <FlatList
      data={animatedData}
      renderItem={handleRenderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const TestApp = () => {
  return (
    <View>
      <AnimatedFlatList data={DATA} />
    </View>
  );
};

export default TestApp;
