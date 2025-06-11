import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";
// import dotenv from 'dotenv'
// dotenv.config({})
const USER_API = `${import.meta.env.VITE_BACK_END_URL}/api/v1/users/`

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:USER_API,
        credentials:'include'
    }),
    endpoints: (builder) => ({
        signupUser: builder.mutation({
            query: (inputData) => ({
                url:"signup",
                method:"POST",
                body:inputData
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url:"signin",
                method:"POST",
                body:inputData
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url:"signout",
                method:"POST"
            }),
            async onQueryStarted(_, {__, dispatch}) {
                try { 
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loadUser: builder.query({
            query: () => ({
                url:"",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        getFilteredUsers:builder.query({
          query:(filter="")=>({
            url:`bulk?filter=${filter}`,
            method:"GET"
          })
        })
       
    })
});
export const {
  useLoadUserQuery,
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetFilteredUsersQuery


}=authApi;