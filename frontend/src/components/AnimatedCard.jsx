import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedCard = ({ children, className = '', delay = 0, ...props }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -5, 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
      }}
      className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;