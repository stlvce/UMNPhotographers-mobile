import api from ".";

export const eventApi = api.injectEndpoints({
  endpoints: (builder) => ({
    receiveEventList: builder.query({
      query: (sort = null, page = 0, size = 20) => ({
        url: Boolean(sort)
          ? `/event/list?page=${page}&size=${size}&sort=${sort}`
          : `/event/list?page=${page}&size=${size}`,
      }),
    }),
    eventRegister: builder.mutation({
      query: (eventId) => ({
        url: `event/${eventId}/register`,
        method: "POST",
      }),
    }),
    receiveZonesEvent: builder.query({
      query: (eventId) => ({
        url: `event/${eventId}/zone`,
      }),
    }),
    receiveZonePriorityUser: builder.query({
      query: (eventId) => ({
        url: `event/${eventId}/zone_priority`,
      }),
    }),
    savePriority: builder.mutation({
      query: ([eventId, zonePriority]) => ({
        url: `event/${eventId}/zone_priority/upsert`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: zonePriority,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useReceiveEventListQuery,
  useEventRegisterMutation,
  useReceiveZonesEventQuery,
  useReceiveZonePriorityUserQuery,
  useSavePriorityMutation,
} = eventApi;
