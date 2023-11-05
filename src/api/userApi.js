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
      },
    }),
  }),
  overrideExisting: true,
});

export const { useUserInfoQuery } = userApi;
