import { Modal, Text } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { changeVisibleAddTechModal } from "../store/slices/techSlice";

const AddTechModal = () => {
  const dispatch = useDispatch();
  const isVisibleAddTechModal = useSelector(
    (state) => state.tech.isVisibleAddTechModal
  );

  const changeVisible = () => {
    dispatch(changeVisibleAddTechModal());
  };

  return (
    <Modal
      visible={isVisibleAddTechModal}
      onDismiss={changeVisible}
      contentContainerStyle={{
        backgroundColor: "white",
        padding: 20,
        marginHorizontal: 10,
      }}
    >
      <Text variant="titleMedium">Добавление техники</Text>
    </Modal>
  );
};

export default AddTechModal;
