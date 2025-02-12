import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function User() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>User Page - {id}</Text>
    </View>
  );
}
