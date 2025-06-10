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
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path:'*',
        element:<Nopage/>
      },{
        path:'account',
        element:<Account/>
      },
      {
        path:'transfer',
        element:<Users/>
      },
      {
        path:'transactions',
        element:<Transactions/>
      },
      {
        path:'transaction/:id',
        element:<TransactionDetails/>
      }
    ],
  },
]);
export default appRouter;
