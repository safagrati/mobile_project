import {
  View,
  Text,
  StyleSheet,
  TextInput,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import {
  Avatar,
  Button,
  MD3Colors,
  ProgressBar,
  TouchableRipple,
} from "react-native-paper";
import ImagePicker from "react-native-image-crop-picker";
import { Image } from "expo-image";

import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";

import Toast from "react-native-toast-message";
import { ProfileIcon } from "../icons";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { openBlurModal } from "../../redux/slice/blurModalSlice";

export default function ProfileComponent() {
  const dispatch = useAppDispatch();
  const [pic, setPic] = useState(() => auth().currentUser?.photoURL);
  const [name, setName] = useState(() => auth().currentUser?.displayName);
  const [uploadValue, setUploadValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const onPickImage = async () => {
    ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      cropperStatusBarColor: "#000000",
      cropperToolbarColor: "#000000",
      cropperTintColor: "#FFFFFF",
      mediaType: "photo",
      showCropGuidelines: false,
      hideBottomControls: true,
      cropperToolbarWidgetColor: "#ffffff",
      cropperCancelText: "#FFFFFF",
      cropperChooseColor: "#FFFFFF",
      cropping: true,
    })
      .then(async (image) => {
        const reference = storage().ref(
          `${auth().currentUser?.uid}.${image.mime.split("/")[1]}`
        );
        setPic(image.path);
        const task = reference.putFile(image.path.substring(7));

        task.on("state_changed", (taskSnapshot) => {
          const dec = taskSnapshot.bytesTransferred / taskSnapshot.totalBytes;

          setUploadValue(dec);
          if (dec === 1) {
            setUploadValue(0);
          }
        });
        task.then(async (e) => {
          //console.log("🚀 ~ file: ProfileComponent.tsx:37 ~ task.then ~ e:", e);
          const url = await storage().ref(e.metadata.fullPath).getDownloadURL();
          setPic(url);

          auth().currentUser?.updateProfile({ photoURL: url });
          Toast.show({ text1: "Successfully uploaded", type: "successToast" });
        });
      })
      .catch((e) => {
        //console.log(e);
      });
  };
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  return (
    <View style={styles.screen}>
      <View style={{ width: "100%", alignItems: "center", gap: 20 }}>
        <View
          style={{
            height: 100,
            width: 100,
            borderRadius: 1000,
            overflow: "hidden",
          }}
        >
          <TouchableRipple
            onPress={onPickImage}
            style={{
              backgroundColor: "#FFFFFF86",
              borderRadius: 1000,
              height: 100,
              width: 100,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {pic ? (
              <Image
                source={pic}
                style={{ height: 90, width: 90, borderRadius: 1000 }}
              />
            ) : (
              <ProfileIcon size={100} color={isDarkTheme ? "white" : "black"} />
            )}
          </TouchableRipple>
        </View>

        <Text
          style={{
            color: isDarkTheme ? "white" : "black",
            fontFamily: "JakaraExtraBold",
            fontSize: 20,
          }}
        >
          {auth().currentUser?.email}
        </Text>
      </View>
      <View style={{ height: 20, justifyContent: "center" }}>
        {uploadValue < 1 && (
          <ProgressBar
            progress={uploadValue}
            style={{ borderRadius: 200 }}
            color={MD3Colors.error50}
          />
        )}
      </View>
      <TextInput
        value={name ? name : ""}
        placeholder="What is your name ?"
        placeholderTextColor={isDarkTheme ? "white" : "black"}
        onChangeText={(text) => {
          setName(text);
        }}
        style={{
          height: 50,
          marginTop: 20,
          color: isDarkTheme ? "white" : "black",
          padding: 10,
          includeFontPadding: false,
          fontFamily: "JakaraExtraBold",
          backgroundColor: isDarkTheme ? "#161b22" : "white",
          borderRadius: 10,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          marginVertical: 20,
        }}
      >
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
        >
          <Button
            loading={isLoading}
            labelStyle={{
              fontFamily: "JakaraExtraBold",
            }}
            contentStyle={{
              height: 60,
            }}
            style={{
              height: 60,

              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#12B76A",

              borderRadius: 10,
            }}
            mode="contained"
            onPress={() => {
              setIsLoading(true);
              auth()
                .currentUser?.updateProfile({ displayName: name })
                .then((e) => {
                  setIsLoading(false);
                  Toast.show({
                    text1: "Successfully updated",
                    type: "successToast",
                  });
                });
            }}
          >
            Update Profile
          </Button>
          <Button
            loading={isLoading}
            labelStyle={{
              fontFamily: "JakaraExtraBold",
              color: "#F04438",
            }}
            contentStyle={{
              height: 60,
            }}
            style={{
              borderColor: "#F04438",
              height: 60,

              bottom: 0,
              left: 0,

              right: 0,

              borderRadius: 10,
            }}
            mode="outlined"
            onPress={() => {
              dispatch(openBlurModal());
            }}
          >
            Delete All
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
});
