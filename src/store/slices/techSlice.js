import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { techApi } from "../../api/techApi";
import { act } from "@testing-library/react-native";

export const saveTech = createAsyncThunk(
  "tech/save",
  async (formData, { rejectedWithValue, getState, dispatch }) => {
    try {
      // TODO: не сохраняется рейтинг
      const state = getState();

      let modelFromDB = state.tech.modelTechList[formData.type].find(
        (item) => item.name === formData.model,
      ) ?? { name: formData.model, type: formData.type };
      let manufacturerFromDB = state.tech.manufacturerTechList[
        formData.type
      ].find((item) => item.name === formData.manufacturer) ?? {
        name: formData.manufacturer,
        type: formData.type,
      };

      if (!modelFromDB.id) {
        await dispatch(techApi.endpoints.saveModel.initiate(modelFromDB));
        const { data } = await dispatch(
          techApi.endpoints.receiveTechModelByName.initiate(modelFromDB),
        );
        modelFromDB = data;
      }

      if (!manufacturerFromDB.id) {
        await dispatch(
          techApi.endpoints.saveManufacturer.initiate(manufacturerFromDB),
        );
        const { data } = await dispatch(
          techApi.endpoints.receiveManufacturerByName.initiate(
            manufacturerFromDB,
          ),
        );
        manufacturerFromDB = data;
      }

      const oldTechList = state.tech.userTechInfo.technique.map((item) => ({
        ...item,
        modelId: item?.model.id,
        manufacturerId: item?.manufacturer.id,
        manufacturer: undefined,
        model: undefined,
      }));

      await dispatch(
        techApi.endpoints.updateTechniqueList.initiate({
          ...state.tech.userTechInfo,
          technique: [
            ...oldTechList,
            {
              ...formData,
              manufacturer: undefined,
              model: undefined,
              modelId: modelFromDB.id,
              manufacturerId: manufacturerFromDB.id,
              rating: Number(formData.rating),
            },
          ],
        }),
      );

      const { data: newTechList } = await dispatch(
        techApi.endpoints.receiveUserTechListForUpdating.initiate(),
      );
      return newTechList;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error);
    }
  },
);

export const removeTech = createAsyncThunk(
  "tech/remove",
  async (tech, { rejectedWithValue, dispatch, getState }) => {
    try {
      const state = getState();
      const oldTechList = state.tech.userTechInfo.technique
        .filter((item) => item.id !== tech.id)
        .map((item) => ({
          ...item,
          modelId: item?.model.id,
          manufacturerId: item?.manufacturer.id,
          manufacturer: undefined,
          model: undefined,
        }));

      await dispatch(
        techApi.endpoints.updateTechniqueList.initiate({
          ...state.tech.userTechInfo,
          technique: [...oldTechList],
        }),
      );

      const { data: newTechList } = await dispatch(
        techApi.endpoints.receiveUserTechListForUpdating.initiate(),
      );
      return newTechList;
    } catch (error) {
      return rejectedWithValue(error);
    }
  },
);

const initialState = {
  userTechInfo: {},
  modelTechList: { camera: [], battery: [], flash: [], lens: [], memory: [] },
  manufacturerTechList: {
    camera: [],
    battery: [],
    flash: [],
    lens: [],
    memory: [],
  },
  statusAddTech: {
    isSuccess: false,
    errorMessage: null,
  },
};

const techSlice = createSlice({
  name: "tech",
  initialState,
  reducers: {
    closeStatusAddTech: (state) => {
      state.statusAddTech = { isVisible: false, errorMessage: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveTech.fulfilled, (state, action) => {
        state.userTechInfo = action.payload;
        state.statusAddTech.isVisible = true;
      })
      .addCase(saveTech.rejected, (state, action) => {
        console.log(action);
        state.statusAddTech = {
          isVisible: true,
          errorMessage: "Ошибка",
        };
      });
    builder.addCase(removeTech.fulfilled, (state, action) => {
      state.userTechInfo = action.payload;
    });
    builder.addMatcher(
      techApi.endpoints.receiveUserTechList.matchFulfilled,
      (state, action) => {
        state.userTechInfo = action.payload;
      },
    );
    builder.addMatcher(
      techApi.endpoints.receiveTechModels.matchFulfilled,
      (state, action) => {
        state.modelTechList[action.payload[0]?.type] = action.payload;
      },
    );
    builder.addMatcher(
      techApi.endpoints.receiveManufacturer.matchFulfilled,
      (state, action) => {
        state.manufacturerTechList[action.payload[0]?.type] = action.payload;
      },
    );
  },
});

export default techSlice.reducer;
export const { closeStatusAddTech } = techSlice.actions;
