import { View, Text, Pressable } from "react-native";
import { Link, router } from "expo-router";

export default function Home() {
  return (
    <View>
      <Text>Home Page</Text>
      <Link href="/users/1">Go to user 1</Link>

      <Pressable onPress={() => router.push("/users/2")}>
        <Text>Go to user 2</Text>
      </Pressable>

      <Pressable
        onPress={() =>
          router.push({
            pathname: "/users/[id]",
            params: { id: 3 },
          })
        }
      >
        <Text>Go to user 3</Text>
      </Pressable>
    </View>
  );
}
