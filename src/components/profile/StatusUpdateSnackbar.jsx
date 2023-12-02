import { useSelector, useDispatch } from "react-redux";
import { closeStatusUpdate } from "../../store/slices/userSlice";
import StatusSnackbar from "../ui/StatusSnackbar";

const StatusUpdateSnackbar = () => {
  const dispatch = useDispatch();
  const statusUpdateUserInfo = useSelector(
    (state) => state.user.statusUpdateUserInfo,
  );

  const closeSnackbar = () => {
    dispatch(closeStatusUpdate());
  };

  return (
    <StatusSnackbar
      isVisible={statusUpdateUserInfo.isVisible}
      message={"Данные успешно обновлены"}
      errorMessage={statusUpdateUserInfo.errorMessage}
      closeSnackbar={closeSnackbar}
    />
  );
};

export default StatusUpdateSnackbar;
