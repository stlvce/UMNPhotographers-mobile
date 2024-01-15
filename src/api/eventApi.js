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
    receiveUserEventList: builder.query({
      query: () => ({
        url: "/event/list/photographer?page=0&size=50",
      }),
      providesTags: ["UserEventList"],
    }),
    eventRegister: builder.mutation({
      query: (eventId) => ({
        url: `/event/${eventId}/register`,
        method: "POST",
      }),
      invalidatesTags: ["UserEventList"],
    }),
    // Зоны мероприятия
    receiveZonesEvent: builder.query({
      query: (eventId) => ({
        url: `/event/${eventId}/zone?page=0&size=20`,
      }),
    }),
    receiveActivitiesDatesEvent: builder.query({
      query: (eventId) => ({
        url: `/event/${eventId}/activities?page=0&size=100&sort=startTime%2Casc`,
      }),
      transformResponse: (response) => {
        const datesList = response.list.map(
          (item) => item.startTime.split("T")[0],
        );
        return Array.from(new Set(datesList));
      },
    }),
    // Приоритеты фотографа на зону
    receiveZonePriorityUser: builder.query({
      query: (eventId) => ({
        url: `/event/${eventId}/zone_priority`,
      }),
    }),
    savePriority: builder.mutation({
      query: ([eventId, zonePriority]) => ({
        url: `/event/${eventId}/zone_priority/upsert`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: zonePriority,
      }),
    }),
    // Свободное время фотографа
    receiveFreeTime: builder.query({
      query: (eventId) => ({
        url: `/event/${eventId}/freetime`,
      }),
      providesTags: ["FreeTime"],
    }),
    upsertFreeTime: builder.mutation({
      query: ([eventId, formData]) => ({
        url: `/event/${eventId}/freetime/upsert`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      }),
      invalidatesTags: ["FreeTime"],
    }),
    deleteFreeTime: builder.mutation({
      query: ([eventId, freetimeId]) => ({
        url: `/event/${eventId}/freetime/delete/${freetimeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FreeTime"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useReceiveEventListQuery,
  useReceiveUserEventListQuery,
  useEventRegisterMutation,
  useReceiveZonesEventQuery,
  useReceiveZonePriorityUserQuery,
  useSavePriorityMutation,
  useReceiveFreeTimeQuery,
  useUpsertFreeTimeMutation,
  useDeleteFreeTimeMutation,
  useReceiveActivitiesDatesEventQuery,
} = eventApi;
