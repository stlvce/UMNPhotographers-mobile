import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
  }),
  tagTypes: ["FreeTime", "UserEventList"],
  endpoints: (builder) => ({}),
});

export default api;
