import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/Router";
// import { Toaster } from "./components/ui/sonner";
// import  Toaster  from "./components/ui/sonner";

const App = () => {
  return (
    <main>
      <RouterProvider router={appRouter}/>
       
   </main>
  )
};

export default App;
