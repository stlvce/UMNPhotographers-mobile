import { Banner } from "react-native-paper";
import statusAuth from "../../utils/statusAuth";

const StatusBanner = ({ data, error, visible, changeVisible }) => {
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
    >
      {bannerMessage}
    </Banner>
  );
};

export default StatusBanner;
