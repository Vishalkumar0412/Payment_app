import React from "react";
import { motion } from "motion/react";
import { LogIn, UserCircle2 } from "lucide-react";
import Loading from "./Loading";
import { useNavigate } from "react-router";
import { useLoadUserQuery } from "@/services/api/authApi";

const Hero = () => {
    const {
    data,
    isLoading,
    isSuccess,
    error,
  } = useLoadUserQuery();

  const isLoggedIn = isSuccess && data?.user;
  const navigate=useNavigate()
  if (isLoading) return <Loading />;
   
  return (
    <div className="h-screen flex flex-col items-center md:justify-center justify-evenly py-10 bg-gradient-to-tl md:gap-5  from-blue-200 to-gray-100">
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.3,
            staggerChildren: 0.1,
          }}
          className="md:text-6xl text-5xl md:mb-8 mb-2 font-bold bg-gradient-to-br from-blue-900 to-blue-600 bg-clip-text text-transparent"
        >
          ZapPay..
        </motion.h1>
      </div>
      <div className="md:w-1/2 px-7">
        <motion.h1
          className="md:text-6xl text-5xl  font text-blue-950 text-center font-bold text-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            staggerChildren: 0.1,
          }}
        >
          Pay Securely With Our plateform
        </motion.h1>
      </div>
      <div className="md:w-1/2 px-5">
        <p className="md:text-xl text-md font-semibold italic text-gray-600 text-center ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim illo
          voluptate atque voluptates sunt pariatur quas accusantium mollitia,
          beatae quos.
        </p>
      </div>
      <div>
        {
          isLoggedIn ?
          
          (<motion.button
          className="px-6 py-2 bg-blue-600 flex gap-2 text-white rounded-md text-nowrap"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log("hover started!")}
          onClick={()=>navigate('/account')}
        >
            
          Your Account
           <UserCircle2 />
        </motion.button>)
          
          : (<motion.button
          className="px-6 py-2 bg-blue-600 flex gap-2 text-white rounded-md text-nowrap"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log("hover started!")}
          onClick={()=>navigate('/login')}
        >
            
          Login
          <LogIn/>
        </motion.button>)
        }
      </div>
    </div>
  );
};

export default Hero;
