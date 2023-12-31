import api from ".";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Connection: "keep-alive",
          "Keep-Alive": "timeout=60",
          Cookie: "",
        },
      }),
      transformResponse: async (response, meta) => {
        const cookie = meta.response.headers.map["set-cookie"]
          ?.split(" ")[0]
          .replace(";", "")
          .replace("SESSION=", "");

        if (cookie) {
          await AsyncStorage.setItem("SESSION", cookie);
        }

        return response;
      },
    }),
    pnTokenUpdate: builder.mutation({
      query: (token) => {
        return {
          url: "/auth/token/update",
          method: "POST",
          body: { token: token },
          headers: {
            "Content-Type": "application/json",
            Connection: "keep-alive",
            "Keep-Alive": "timeout=60",
          },
        };
      },
    }),
    authRegister: builder.mutation({
      query: (formData) => {
        const body = {
          firstname: formData.firstname,
          surname: formData.surname,
          middleName: formData.middleName,
          birthdate: formData.birthdate,
          phone: "7" + formData.phone,
          contacts: {
            vk: formData.vk,
            tg: formData.tg,
          },
          email: formData.email,
          password: formData.password,
          portfolio: formData.portfolio,
        };

        return {
          url: "/auth/register",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        };
      },
    }),
    authLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
      }),
    }),
    authPing: builder.query({
      query: () => ({
        url: "/ping",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useAuthLoginMutation,
  useAuthRegisterMutation,
  useAuthLogoutMutation,
  usePnTokenUpdateMutation,
  useAuthPingQuery,
} = authApi;
