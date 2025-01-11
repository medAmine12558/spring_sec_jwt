import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-blue-500">
    {/* Navigation */}
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex items-center justify-between p-6 max-w-7xl mx-auto"
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="text-white text-3xl font-bold flex items-center gap-2"
      >
        <Sparkles className="w-8 h-8" />
        Detection Emotion
      </motion.div>
      
      <div className="flex gap-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-white hover:text-purple-100 font-semibold transition-colors"
          onClick={() => navigate('/Signin')}
        >
          Se connecter
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
          onClick={() => navigate('/Signup')}
        >
          S'inscrire
        </motion.button>
      </div>
    </motion.nav>

    {/* Hero Section */}
    <main className="max-w-7xl mx-auto mt-24 px-6">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-6xl font-bold mb-6 leading-tight text-white">
            Testez notre AI qui
            <br />
            <span className="relative inline-block">
              detecte les Emotions
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute -bottom-2 left-0 h-4 bg-yellow-300 opacity-50 -z-10 rounded-full"
              ></motion.div>
            </span>
          </h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl mb-16 text-white/90"
        >
          Simple, efficace, et
          <span className="relative mx-2">
            abordable
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-0 left-0 w-full h-1 bg-blue-300"
            ></motion.div>
          </span>
          !
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#4C1D95' }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Lancez-vous - C'est gratuit
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-white text-2xl mt-12 font-light"
        >
          profitez de notre AI pour seulement
          <div className="font-bold text-4xl mt-2">
            0€ / mois
          </div>
        </motion.div>
      </div>
    </main>

    {/* Decorative elements */}
    <motion.div
      animate={{ 
        y: [0, -10, 0],
      }}
      transition={{ 
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }}
      className="absolute top-40 right-20 w-20 h-20 bg-white/10 rounded-full blur-xl"
    />
    <motion.div
      animate={{ 
        y: [0, 10, 0],
      }}
      transition={{ 
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut"
      }}
      className="absolute bottom-40 left-20 w-32 h-32 bg-blue-300/20 rounded-full blur-xl"
    />
  </div>
  );
};
