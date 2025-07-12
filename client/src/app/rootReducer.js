import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '@/services/authSlice'
import { authApi } from "@/services/api/authApi";
import { transactionApi } from "@/services/api/txnApi";


const rootRedcuer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [transactionApi.reducerPath]:transactionApi.reducer,
    auth:authReducer, 
});
export default rootRedcuer;