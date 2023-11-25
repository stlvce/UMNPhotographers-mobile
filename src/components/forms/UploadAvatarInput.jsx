import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Avatar, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const UploadAvatarInput = ({ hasTitle = false, value, handleChange }) => {
  const imagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.1,
    });

    if (!result.canceled) {
      handleChange(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {hasTitle && <Text variant="titleLarge">Фотография</Text>}
      <TouchableOpacity onPress={imagePick} activeOpacity={0.9}>
        <Avatar.Image size={100} source={value && { uri: value }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
});

export default UploadAvatarInput;
