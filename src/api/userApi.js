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
        const { contacts, ...data } = response;
        return {
          ...data,
          phone: data.phone.slice(1),
          ...contacts,
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
          phone: "7" + formData.phone,
          contacts: {
            vk: formData.vk,
            tg: formData.tg,
          },
          portfolio: formData.portfolio,
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
    }),
    updateCredential: builder.mutation({
      query: (newPassword, { getState }) => {
        // TODO: прикрепить старую почту
        console.log(getState);
        const body = {
          /*email: getState.user.user,*/
          password: newPassword,
        };

        return {
          url: "/photographer/credential",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useUserInfoQuery } = userApi;
