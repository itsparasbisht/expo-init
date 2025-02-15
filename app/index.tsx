import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function Home() {
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets) {
      setImages((prev) => [result.assets[0].uri, ...prev]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <Pressable onPress={pickImage} style={styles.btn}>
          <Text style={{ color: "white" }}>Pick an Image</Text>
        </Pressable>
        <Button title="Capture image" onPress={pickImage} />
      </View>
      <ScrollView>
        {images.length === 0 && <Text>Please select some images</Text>}
        {images?.length > 0 &&
          images.map((image) => (
            <Image key={image} source={{ uri: image }} style={styles.image} />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    flexDirection: "row",
    columnGap: 10,
    paddingBottom: 10,
  },
  btn: {
    backgroundColor: "black",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
  },
  imagesContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
    borderWidth: 5,
    borderRadius: 10,
  },
});
