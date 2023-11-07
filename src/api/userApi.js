import api from ".";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userInfo: builder.query({
      query: () => ({
        url: "/photographer/info",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response) => {
        console.log(response, "USER INFO");
        return {
          ...response,
          phone: response.phone.slice(1),
          ...response?.contacts,
        };
      },
    }),
    updateUserInfo: builder.mutation({
      query: (formData) => {
        const body = {
          firstname: formData.firstname,
          surname: formData.surname,
          middleName: formData.middleName,
          birthdate: formData.birthdate,
          phone: formData?.phone || "",
          contacts: {
            vk: formData?.vk || "",
            tg: formData?.tg || "",
          },
          portfolio: formData.portfolio || "",
        };
        return {
          url: "/photographer/info",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        };
      },
      transformResponse: (response) => {
        console.log(response, "USER INFO");
        return {
          ...response,
          phone: response.phone.slice(1),
          ...response?.contacts,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useUserInfoQuery, useUpdateUserInfoMutation } = userApi;
