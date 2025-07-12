import React from "react";
import AvtarByName from "./AvtarByName";
import { Button } from "./ui/button";
import { BookUser, Send } from "lucide-react";
import { Link } from "react-router";

const UserCard = ({user}) => {
   
    
  return (
  <div className="md:min-h-20 min-h-15 border flex justify-between items-center md:rounded-lg hover:bg-gray-100 border-blue-400 shadow w-full px-4">
            <div className="flex items-center md:gap-3 gap-1">
                    <AvtarByName name={user.firstName}/>
                    <div className="flex flex-col">
                            <span className="md:text-xl text-lg font-bold text-blue-500">{user.firstName} {user.lastName}</span>
                            <span className="md:text-sm text-xs font-bold text-gray-400">{user.email}</span>
                    </div>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="secondary" className='text-md hidden md:flex '> Contact <BookUser /></Button>
                <Link to={`/send-money/${user._id}`}>
                <Button className='text-md cursor-pointer'> Send <Send/></Button>
                </Link>
            </div>
  </div>
  
);
};

export default UserCard;
