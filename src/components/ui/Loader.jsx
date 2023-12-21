import { ActivityIndicator } from "react-native";

const Loader = ({ ...props }) => {
  return <ActivityIndicator animating={true} size="large" {...props} />;
};

export default Loader;
