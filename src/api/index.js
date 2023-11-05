import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  // tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://158.160.32.142:8080/api",
    // baseUrl: process.env.REACT_APP_API_USER_URL,
    prepareHeaders: (headers, { getState }) => {
      console.log(getState().auth.sessionId);
    },
  }),
  endpoints: (builder) => ({}),
});

export default api;
