import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Homepage from "../pages/Homepage";
import Nopage from "../components/Nopage";
import Account from "../pages/Account";
import Users from "@/pages/Users";
import Transactions from "@/pages/Transactions";
import TransactionDetails from "@/components/TransactionDetails";
import SendMoney from "@/components/SendMoey";
import TransactionReceipt from "@/components/TransactionReciept";
import { AuthonticatedUser, ProtectedRoute } from "./ProtectedRoute";
import Profile from "@/pages/Profile";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "Signup",
        element: (
        <AuthonticatedUser>
        <Signup />
        </AuthonticatedUser>),
      },
      {
        path: "login",
        element:( 
      <AuthonticatedUser>
          <Login />
          </AuthonticatedUser>
      
      ),
      },
      {
        path:'*',
        element:<Nopage/>
      },{
        path:'account',
        element:(<ProtectedRoute><Account/></ProtectedRoute>)
      },
      {
        path:'transfer',
        element:(<ProtectedRoute><Users/></ProtectedRoute>)
      },
      {
        path:'profile',
        element:(<ProtectedRoute><Profile/></ProtectedRoute>)
      },
      {
        path:'send-money/:id',
        element:(<ProtectedRoute><SendMoney/></ProtectedRoute>)
      },
      {
        path:'transactions',
        element:(<ProtectedRoute><Transactions/></ProtectedRoute>)
      },
      {
        path:'transaction/:id',
        element:<ProtectedRoute><TransactionReceipt/></ProtectedRoute>
      },
    
    ],
  },
]);
export default appRouter;
