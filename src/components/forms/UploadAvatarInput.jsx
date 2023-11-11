import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

{
  /* TODO: сделать загрузку фотографии */
}
const UploadAvatarInput = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Фотография</Text>
      <Avatar.Image size={100} />
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
