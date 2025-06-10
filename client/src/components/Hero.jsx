import React from "react";
import { motion } from "motion/react";
import { LogIn } from "lucide-react";
import Loading from "./Loading";
import { useNavigate } from "react-router";

const Hero = () => {
    const loading =false;
    const navigate=useNavigate()
    if (loading){
        return <Loading/>
    }
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-tl gap-5 from-blue-200 to-gray-100">
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            staggerChildren: 0.1,
          }}
          className="text-6xl mb-8 font-bold bg-gradient-to-br from-blue-900 to-blue-600 bg-clip-text text-transparent"
        >
          ZapPay..
        </motion.h1>
      </div>
      <div className="w-1/2">
        <motion.h1
          className="text-6xl font text-blue-950 text-center font-bold text-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            staggerChildren: 0.1,
          }}
        >
          Pay Securely With Our plateform
        </motion.h1>
      </div>
      <div className="w-1/2">
        <p className="text-xl font-semibold italic text-gray-600 text-center ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim illo
          voluptate atque voluptates sunt pariatur quas accusantium mollitia,
          beatae quos.
        </p>
      </div>
      <div>
        <motion.button
          className="px-6 py-2 bg-blue-600 flex gap-2 text-white rounded-md text-nowrap"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log("hover started!")}
          onClick={()=>navigate('/login')}
        >
            
          Login
          <LogIn/>
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;
