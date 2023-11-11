import api from "./";

export const techApi = api.injectEndpoints({
  endpoints: (builder) => ({
    techniqueInfo: builder.query({
      query: () => ({
        url: "/technique/all",
      }),
    }),
  }),
});

export const { useTechniqueInfoQuery } = techApi;
