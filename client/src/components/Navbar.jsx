import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ArrowRightLeft, BookUserIcon, LogIn, LogOut, Send, SquareUserRound, User, User2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "@/services/api/authApi";
import { toast } from "sonner";
const Navbar = () => {

  const {user}=useSelector((store)=>store.auth)
  const [logoutUser,{data,isSuccess}]=useLogoutUserMutation()
  const navigate=useNavigate()
  const [isScrolled, setIsScrolled] = React.useState(false);
  const logoutHandler=async ()=>{
    await logoutUser();
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message ||"Logout successfully")
      navigate('/login')
    }
  },[isSuccess])

  return (
    <motion.div
      className="fixed w-full z-50 flex items-center justify-between px-10 py-4"
      initial={{ y: 0 }}
      animate={{
        y: 0,
        backgroundColor: isScrolled ? "white" : "transparent",
        boxShadow: isScrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
      <Link to='/'>  <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            staggerChildren: 0.1,
          }}
          
          className="text-3xl font-bold bg-gradient-to-br from-blue-900 to-blue-600 bg-clip-text text-transparent"
        >
          ZapPay..
        </motion.h1></Link>
      </div>

      <div className=" flex justify-center">
        {user ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="" className="text-md bg-gradient-to-br from-blue-700 to-blue-500">
                  Profile
                  <User />
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>{user.firstName} {user.lastName}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link to='/profile' >  
                <DropdownMenuItem><User2 /> Profile</DropdownMenuItem>
                 </Link>  
                <Link to='/account' >  
                <DropdownMenuItem><BookUserIcon /> Account</DropdownMenuItem>
                 </Link>  
                <Link to='/transactions' >  
                <DropdownMenuItem><ArrowRightLeft /> Transanctions</DropdownMenuItem>
                </Link>
                <Link to='/transfer'>
                <DropdownMenuItem><Send /> Send Money</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={logoutHandler}> <LogOut/>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button
            variant="link"
            className="text-xl font-bold font-display text-blue-700"
            onClick={()=>navigate('/login')}

          >
            Login <LogIn/>
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
