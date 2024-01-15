import React from "react";
import { Appbar, useTheme, Tooltip } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { useSelector } from "react-redux";

const RootAppBar = ({ navigation, route, options, back }) => {
  const theme = useTheme();
  const title = getHeaderTitle(options, route.name);
  const userEventListID = useSelector((state) => state.event.userEventListID);

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.navigatorContainer }}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content
        title={
          title === "Events"
            ? "Мероприятия"
            : title === "Tech"
              ? "Техника"
              : title
        }
      />
      {route.name === "Мероприятие" &&
        userEventListID.find((eventId) => eventId === route.params.id) && (
          <Appbar.Action
            icon="calendar"
            onPress={() =>
              navigation.push("Расписание мероприятия", route.params.id)
            }
          />
        )}
      {route.name === "Tech" && (
        <Appbar.Action
          onPress={() => navigation.push("Добавление техники")}
          icon="plus"
          mode="contained"
        />
      )}

      {route.name === "Ваш календарь" && (
        <Tooltip title="">
          <Appbar.Action onPress={() => {}} icon="comment-question-outline" />
        </Tooltip>
      )}

      {route.name === "Удобное время" && (
        <Tooltip title="">
          <Appbar.Action onPress={() => {}} icon="comment-question-outline" />
        </Tooltip>
      )}
    </Appbar.Header>
  );
};

export default RootAppBar;
