import { Banner } from "react-native-paper";

const StatusBanner = ({ status, visible, changeVisible }) => {
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
      {status}
    </Banner>
  );
};

export default StatusBanner;
