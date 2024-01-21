import { useTheme } from "react-native-paper";
import { Banner } from "react-native-paper";
import statusAuth from "../../utils/statusAuth";

const StatusBanner = ({ data, error, visible, changeVisible }) => {
  const theme = useTheme();
  let bannerMessage = statusAuth(data, error);

  return (
    <Banner
      visible={visible}
      actions={[
        {
          label: "Закрыть",
          onPress: changeVisible,
        },
      ]}
      style={{ backgroundColor: theme.colors.bannerBackground }}
    >
      {bannerMessage}
    </Banner>
  );
};

export default StatusBanner;
