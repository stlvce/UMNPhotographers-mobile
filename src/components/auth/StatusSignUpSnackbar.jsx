import { useSelector, useDispatch } from "react-redux";
import { closeStatusSU } from "../../store/slices/authSlice";
import StatusSnackbar from "../ui/StatusSnackbar";

const StatusSignUpSnackbar = () => {
  const dispatch = useDispatch();
  const statusSignUp = useSelector((state) => state.auth.statusSignUp);

  const closeSnackbar = () => {
    dispatch(closeStatusSU());
  };

  return (
    <StatusSnackbar
      isVisible={statusSignUp.isError}
      message={"Пользователь успешно создан"}
      errorMessage={statusSignUp.errorMessage}
      closeSnackbar={closeSnackbar}
    />
  );
};

export default StatusSignUpSnackbar;
