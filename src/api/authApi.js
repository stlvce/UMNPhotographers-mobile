import api from ".";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authApi = api.injectEndpoints({
  // reducerPath: "authApi",
  // tagTypes: ["Auth"],
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "http://158.160.32.142:8080/api/auth/",
  //   prepareHeaders: (headers, { getState }) => {
  //     console.log(getState().auth.sessionId);
  //   },
  // }),
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: async (response, meta, arg) => {
        await AsyncStorage.setItem(
          "SESSION",
          meta.response.headers.map["set-cookie"]
            .split(" ")[0]
            .replace(";", "")
            .replace("SESSION=", "")
        );
        return response;
      },
    }),
    authRegister: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
      }),
    }),
    authLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useAuthLoginMutation, useAuthRegisterMutation } = authApi;
