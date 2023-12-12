import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://photographersekb.ru:8080/api",
  }),
  endpoints: (builder) => ({}),
});

export default api;
