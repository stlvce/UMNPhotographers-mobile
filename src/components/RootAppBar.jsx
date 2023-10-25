import React from "react";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";

const RootAppBar = ({ navigation, route, options, back }) => {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {route.name === "Мероприятие" && (
        <Appbar.Action
          icon="calendar"
          onPress={() => navigation.push("Ваш календарь")}
        />
      )}
      {route.name === "Техника" && (
        <Appbar.Action onPress={() => {}} icon="plus" mode="contained" />
      )}
    </Appbar.Header>
  );
};

export default RootAppBar;
