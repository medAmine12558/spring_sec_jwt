import React, { useEffect, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';
import {  Camera, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


export function Predection_Page(){
  const [photo, setPhoto] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [evenement,setEvenement] = useState(null);

  function handleFile (file){
    setPhoto(file)
  };
  useEffect(()=>{
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('evenement',evenement)
    axios.post("http://localhost:5000/predict",formData,{headers:{'Content-Type':'multipart/form-data'}}).then(res=>
        console.log(res.data.prediction)
       
    ).catch(e=>{
        console.log("erreur")
    })
  },[photo])

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
    
  };
  function handelSubmit(){
    
    }

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-violet-900 tracking-tight">
          Sélectionnez votre photo
        </h2>

        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-90"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <input
            type="file"
            id="photo-input"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />

          <label
            htmlFor="photo-input"
            className={`relative block border-3 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
              ${isDragging ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-violet-400'}
              ${photo ? 'h-96' : 'h-72'}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <AnimatePresence mode="wait">
              {photo ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative h-full"
                >
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-lg"
                    onClick={(e) => {
                      e.preventDefault();
                      setPhoto(null);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full space-y-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg"
                  >
                    {isDragging ? (
                      <Camera className="w-12 h-12 text-white" />
                    ) : (
                      <Upload className="w-12 h-12 text-white" />
                    )}
                  </motion.div>
                  <div className="text-gray-600">
                    <p className="text-xl font-semibold mb-3">
                      {isDragging ? 'Déposez votre photo ici' : 'Cliquez ou glissez votre photo ici'}
                    </p>
                    <p className="text-sm text-gray-500">PNG, JPG (max. 10MB)</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </label>

          <div className="mt-8 space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Nom de l'événement"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                onChange={(e) => setEvenement(e.target.value)}
                value={evenement}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={handelSubmit}
            >
              Envoyer
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>);
};