import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import { router } from "expo-router";

type CapturePhotoProps = {
  setIsOpen: any;
  saveImage: any;
};

export default function CapturePhoto({
  setIsOpen,
  saveImage,
}: CapturePhotoProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const cameraRef = useRef<CameraView | null>(null);

  // Request camera permissions on mount
  useEffect(() => {
    getCameraAccess();
  }, []);

  async function getCameraAccess() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  }

  const handleCapturePhoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: false };
      const photo = await cameraRef.current.takePictureAsync(options);

      if (photo?.uri) {
        setCapturedPhoto(photo.uri);
        setIsCameraActive(false);
      }
    }
  };

  function handleSavePhoto() {
    if (capturedPhoto) {
      console.log("Captured Photo URI:", capturedPhoto);
      router.push({
        pathname: "/",
        params: { photoUri: capturedPhoto },
      });
      saveImage((prev) => [capturedPhoto, ...prev]);
      setIsOpen(false);
    } else {
      console.log("No captured photo to save.");
    }
  }

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text>Requesting camera permissions...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text>No access to camera</Text>
        <Pressable onPress={getCameraAccess}>
          <Text>Grant Camera Access</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isCameraActive && (
        <CameraView style={styles.camera} ratio="16:9" ref={cameraRef} />
      )}

      {isCameraActive && (
        <View style={styles.preview}>
          <TouchableOpacity style={styles.button} onPress={handleCapturePhoto}>
            <Text style={styles.buttonText}>Capture Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsOpen(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isCameraActive && (
        <View style={styles.preview}>
          <Image source={{ uri: capturedPhoto }} style={styles.image} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setCapturedPhoto(null);
              setIsCameraActive(true);
            }}
          >
            <Text style={styles.buttonText}>Retake Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSavePhoto}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsOpen(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
  },
  preview: {
    flex: 1,
    resizeMode: "contain",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
    borderWidth: 5,
    borderRadius: 10,
  },
});
