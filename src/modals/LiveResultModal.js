import { FlatList, Modal, StyleSheet, View } from "react-native";
import {
  Button,
  TextInput,
  IconButton,
  List,
  Text,
  useTheme,
  Divider,
} from "react-native-paper";

const LiveResultModal = ({
  modalTitle,
  isVisible,
  closeModal,
  placeholder,
  varName,
  initialList,
  searchLetters,
  handler,
}) => {
  const theme = useTheme();

  const filteredList = initialList?.filter((item) =>
    item.name.toLowerCase().includes(searchLetters.toLowerCase()),
  );

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View
        style={{
          ...styles.centeredView,
          backgroundColor: theme.colors.background,
        }}
      >
        <View style={styles.header}>
          <IconButton icon="close" onPress={closeModal} />
          <Text variant="titleMedium">{modalTitle}</Text>
          <Button onPress={closeModal}>Готово</Button>
        </View>

        <View style={styles.main}>
          <TextInput
            mode="outlined"
            value={searchLetters}
            placeholder={placeholder}
            onChangeText={(e) => handler(varName, e)}
          />
          <FlatList
            data={filteredList}
            style={styles.list}
            ListEmptyComponent={
              <View>
                <Text style={styles.textState}>
                  Введите название, чтобы сохранить его
                </Text>
              </View>
            }
            ItemSeparatorComponent={<Divider />}
            renderItem={(item) => {
              return (
                <List.Item
                  onPress={() => {
                    handler(varName, item.item.name);
                    closeModal();
                  }}
                  title={item.item.name}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  main: {
    padding: 10,
    flex: 1,
    marginTop: 20,
  },
  list: { marginTop: 20 },
  textState: { textAlign: "center", marginTop: 200, opacity: 0.7 },
});

export default LiveResultModal;
