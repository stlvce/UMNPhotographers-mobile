import React from "react";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { useDispatch } from "react-redux";
import { changeVisibleAddTechModal } from "../store/reducers/techSlice";

const RootAppBar = ({ navigation, route, options, back }) => {
  const dispatch = useDispatch();
  const title = getHeaderTitle(options, route.name);

  const handleAddTech = () => {
    dispatch(changeVisibleAddTechModal());
  };

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
        <Appbar.Action onPress={handleAddTech} icon="plus" mode="contained" />
      )}
    </Appbar.Header>
  );
};

export default RootAppBar;
