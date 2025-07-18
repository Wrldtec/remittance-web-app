import { apiSlice } from "../api/api.slice";

type GetUserByEmailResponse = {
  email: string;
  relatedId: string | number;
};

export const usersApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    /**
     * @DESC : Get User by Email
     * @Method : GET
     * @Route : /User/getByEmail/{email}
     * @Access :  Private
     * @Headers : { Authorization: Bearer token }
     */
    getUserByEmail: builder.query<
      { data: GetUserByEmailResponse },
      { email: string }
    >({
      query: ({ email }) => ({
        url: `/User/getByEmail/${email}`,
      }),
    }),
    /**
     * @DESC : Update User Password
     * @Method : PUT
     * @Route : /User/UpdatePassword
     * @Access :  Private
     * @Headers : { Authorization: Bearer token }
     */
    updatePassword: builder.mutation({
      query: (credentials) => ({
        url: "/User/UpdatePassword",
        method: "PUT",
        body: credentials,
      }),
    }),

    /**
     * @DESC : Update User's Pin
     * @Method : PUT
     * @Route : /api/v1/TransactionPin
     * @Access :  Private
     * @Headers : { Authorization: Bearer token }
     */
    updatePin: builder.mutation({
      query: (credentials) => ({
        url: "/TransactionPin",
        method: "PUT",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useUpdatePasswordMutation,
  useGetUserByEmailQuery,
  useUpdatePinMutation,
} = usersApiSlice;
