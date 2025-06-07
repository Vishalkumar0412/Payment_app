import MainLayout from "@/layout/MainLayout";
import Auth from "@/pages/Auth";
import { createBrowserRouter } from "react-router";
import Homepage from "./Homepage";

export const appRouter=createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            {
                path:'/',
                element:(
                    <Homepage/>
                )
            },
            {
                path:'auth',
                element:<Auth/>
            }
        ]
    }
])