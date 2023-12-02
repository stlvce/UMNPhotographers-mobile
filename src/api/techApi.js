import api from "./";

export const techApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Техника фотографа
    receiveUserTechList: builder.query({
      query: () => ({
        url: "/technique/all",
      }),
    }),
    receiveUserTechListForUpdating: builder.mutation({
      query: () => ({ url: "/technique/all" }),
    }),
    updateTechniqueList: builder.mutation({
      query: (newData) => {
        return {
          url: "/technique",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: newData,
        };
      },
    }),
    // Модели техники
    receiveTechModels: builder.query({
      query: (type) => ({
        url: `/technique/model/${type}`,
      }),
    }),
    receiveTechModelByName: builder.mutation({
      query: ({ type }) => {
        return {
          url: `/technique/model/${type}`,
        };
      },
      transformResponse: (response, meta, arg) => {
        return response.find((item) => item.name === arg.name);
      },
    }),
    saveModel: builder.mutation({
      query: (newModel) => ({
        url: "/technique/model",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: newModel,
      }),
    }),
    // Производители техники
    receiveManufacturer: builder.query({
      query: (type) => ({
        url: `/technique/manufacturer/${type}`,
      }),
    }),
    receiveManufacturerByName: builder.mutation({
      query: ({ type }) => {
        return {
          url: `/technique/manufacturer/${type}`,
        };
      },
      transformResponse: (response, meta, arg) => {
        return response.find((item) => item.name === arg.name);
      },
    }),
    saveManufacturer: builder.mutation({
      query: (newManufacturer) => ({
        url: "/technique/manufacturer",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: newManufacturer,
      }),
    }),
  }),
});

export const {
  useReceiveUserTechListQuery,
  useReceiveTechModelsQuery,
  useReceiveTechModelByNameMutation,
  useReceiveManufacturerQuery,
} = techApi;
