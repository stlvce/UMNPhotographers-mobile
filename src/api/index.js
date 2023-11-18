import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      if (getState().auth.sessionId) {
        headers.set("cookie", `SESSION=${getState().auth.sessionId}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});

export default api;
