import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";
// import dotenv from 'dotenv'
// dotenv.config({})
const TRANSACTION_API = `${import.meta.env.VITE_BACK_END_URL}/api/v1/transactions/`

export const transactionApi = createApi({
    reducerPath:"transactionApi",
    baseQuery:fetchBaseQuery({
        baseUrl:TRANSACTION_API,
        credentials:'include'
    }),
    endpoints: (builder) => ({
        sendMoney: builder.mutation({
            query: (inputData) => ({
                url:"transfer",
                method:"POST",
                body:inputData
                
            }),
          
        }),
        fetchTxn: builder.query({
            query: (txnId) => ({
                url:`?txnId=${txnId}`,
                method:"GET",
            }),        
            
        }),
        getHistory:builder.query({
            query:()=>({
                url:'history',
                method:"GET",

            })
        }),
        getPaginatedTxns: builder.query({
            query:({page,limit=5})=>({
                url:`paginated?page=${page}&limit=${limit}`,
                method:"GET"
            })

        })
      
       
    })
});
export const {
 
    useFetchTxnQuery,
    useSendMoneyMutation,
    useGetHistoryQuery,useGetPaginatedTxnsQuery


}=transactionApi;