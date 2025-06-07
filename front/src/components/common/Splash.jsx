import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.img
          src="/logo2.png"
          alt="Logo"
          className="w-32 h-32 rounded-full mb-6 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />

        <motion.h1
          className="text-3xl font-bold tracking-widest"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          ShopVerse
        </motion.h1>

        <motion.p
          className="mt-2 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Your one-stop eCommerce destination
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
