import api from ".";

export const eventApi = api.injectEndpoints({
  endpoints: (builder) => ({
    receiveEventList: builder.query({
      query: () => ({
        url: "/event/list?page=0&size=20",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useReceiveEventListQuery } = eventApi;
