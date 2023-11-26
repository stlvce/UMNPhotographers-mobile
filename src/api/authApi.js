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
  }),
  overrideExisting: true,
});

export const {
  useAuthLoginMutation,
  useAuthRegisterMutation,
  useAuthLogoutMutation,
} = authApi;
