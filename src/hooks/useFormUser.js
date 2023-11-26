import { useState, useCallback } from "react";

const useFormUser = ({ initialState }) => {
  const [formData, setFormData] = useState({
    ...initialState,
  });

  const handleChange = useCallback(
    (varName, newValue) => {
      setFormData({ ...formData, [varName]: newValue });
    },
    [formData],
  );

  const handleSubmit = () => {};

  return [formData, handleChange, setFormData];
};

export default useFormUser;
