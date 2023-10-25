import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-paper";

const UploadAvatarForm = () => {
  return (
    <View style={styles.containerImage}>
      <Avatar.Icon size={100} icon="upload" />
    </View>
  );
};

const styles = StyleSheet.create({
  containerImage: {
    alignItems: "center",
    marginBottom: 20,
  },
});

export default UploadAvatarForm;
