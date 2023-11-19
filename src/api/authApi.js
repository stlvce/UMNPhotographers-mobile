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
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "ru,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
          Connection: "keep-alive",
          "Content-Type": "application/json",
          "Sec-Fetch-Mode": "cors",
          Cookie: "",
        },
      }),
      transformResponse: async (response, meta) => {
        // При выходе установленные куки остаются на запросе,
        // поэтому set-cookie заново с сервера не приходят из-за этого ошибка
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
          phone: formData.phone,
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

export const { useAuthLoginMutation, useAuthRegisterMutation } = authApi;
