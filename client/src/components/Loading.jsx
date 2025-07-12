import React from 'react'
import { motion } from "framer-motion";



const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-tl from-white to-blue-300">
            <motion.div 
                className="flex space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {[1, 2, 3].map((index) => (
                    <motion.div
                        key={index}
                        className="w-4 h-4 bg-blue-500 rounded-full"
                        animate={{
                            y: [-10, 0, -10],
                            backgroundColor: ["#3B82F6", "#60A5FA", "#3B82F6"],
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: index * 0.2,
                        }}
                    />
                ))}
            </motion.div>
        </div>
    )
}

export default Loading