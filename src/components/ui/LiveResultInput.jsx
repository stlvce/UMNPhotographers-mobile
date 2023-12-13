import { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, TextInput, TouchableRipple, useTheme } from "react-native-paper";

const LiveResultInput = ({
  label,
  varName,
  initialList,
  searchLetters,
  handler,
  ...props
}) => {
  const theme = useTheme();
  const [isVisibleResultList, setIsVisibleResultList] = useState(false);

  const filteredList = initialList?.filter((item) =>
    item.name.toLowerCase().includes(searchLetters.toLowerCase()),
  );

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
      {...props}
    >
      <TextInput
        mode="outlined"
        label={label}
        value={searchLetters}
        onChangeText={(e) => handler(varName, e)}
        onFocus={() => setIsVisibleResultList(true)}
      />
      {isVisibleResultList &&
        Boolean(filteredList?.length) &&
        !(filteredList[0].name === searchLetters) && (
          <FlatList
            style={styles.searchList}
            data={filteredList}
            renderItem={(item) => {
              return (
                <TouchableRipple
                  style={styles.listItem}
                  onPress={() => {
                    handler(varName, item.item.name);
                    setIsVisibleResultList(false);
                  }}
                >
                  <Text>{item.item.name}</Text>
                </TouchableRipple>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchList: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    left: 0,
    right: 0,
    top: 50,
    paddingTop: 10,
    zIndex: -1,
    gap: 10,
    maxHeight: 200,
  },
  listItem: {
    padding: 12,
  },
});

export default LiveResultInput;
