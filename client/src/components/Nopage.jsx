import React from 'react';
import { motion } from 'framer-motion';
import { BiError } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Nopage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center p-8 bg-white rounded-lg shadow-xl"
            >
                <motion.div
                    animate={{ 
                        rotate: [0, 10, -10, 10, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                >
                    <BiError className="text-red-500 text-8xl mx-auto mb-4" />
                </motion.div>
                
                <motion.h1 
                    className="text-6xl font-bold text-gray-800 mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    404
                </motion.h1>
                
                <h2 className="text-2xl text-gray-600 mb-6">Page Not Found</h2>
                <p className="text-gray-500 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                
                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
                    >
                        Go Back Home
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
};

export default Nopage;