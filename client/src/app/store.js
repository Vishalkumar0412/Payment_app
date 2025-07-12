import {configureStore} from "@reduxjs/toolkit" 
import rootRedcuer from "./rootReducer.js"
import { authApi } from "@/services/api/authApi";
import { transactionApi } from "@/services/api/txnApi.js";


export const appStore = configureStore({
    reducer: rootRedcuer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware,transactionApi.middleware),
    
});

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();