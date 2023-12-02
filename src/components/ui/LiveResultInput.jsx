import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";

const LiveResultInput = ({
  label,
  varName,
  initialList,
  searchLetters,
  handler,
  ...props
}) => {
  const [isVisibleResultList, setIsVisibleResultList] = useState(false);

  const filteredList = initialList?.filter((item) =>
    item.name.toLowerCase().includes(searchLetters.toLowerCase()),
  );

  return (
    <View style={styles.container} {...props}>
      <TextInput
        mode="outlined"
        label={label}
        value={searchLetters}
        onChangeText={(e) => handler(varName, e)}
        onFocus={() => setIsVisibleResultList(true)}
        // TODO: скрывать при блюре
        /*onBlur={() => {
          setIsVisibleResultList(false);
        }}*/
      />
      {isVisibleResultList && Boolean(filteredList?.length) && (
        <View style={styles.searchList}>
          {filteredList?.map((item) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                handler(varName, item.name);
                setIsVisibleResultList(false);
              }}
              activeOpacity={0.9}
              key={item.id}
            >
              <Text variant="bodyLarge">{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchList: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 1,
    left: 0,
    right: 0,
    top: 50,
    paddingTop: 10,
    zIndex: -1,
    gap: 10,
  },
  listItem: {
    padding: 10,
  },
});

export default LiveResultInput;
