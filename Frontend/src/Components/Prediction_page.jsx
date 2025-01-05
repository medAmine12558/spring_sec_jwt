import React, { useEffect, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
        console.log(res.data)
       
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8 text-purple-900">
          Sélectionnez votre photo ici
        </h2>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <input
            type="file"
            id="photo-input"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />

          <label
            htmlFor="photo-input"
            className={`relative block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
              ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'}
              ${photo ? 'h-96' : 'h-64'}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="Preview"
                className="w-full h-full object-contain rounded"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="p-4 rounded-full bg-purple-100">
                  {isDragging ? (
                    <ImageIcon className="w-10 h-10 text-purple-600" />
                  ) : (
                    <Upload className="w-10 h-10 text-purple-600" />
                  )}
                </div>
                <div className="text-gray-600">
                  <p className="font-medium mb-2">
                    {isDragging ? 'Déposez votre photo ici' : 'Cliquez ou glissez votre photo ici'}
                  </p>
                  <p className="text-sm text-gray-500">PNG, JPG (max. 10MB)</p>
                </div>
              </div>
            )}
          </label>

          {photo && (
            <button
              onClick={() => setPhoto(null)}
              className="mt-4 text-sm text-purple-600 hover:text-purple-800"
            >
              Supprimer la photo
            </button>
          )}
          <br />
            <br />
            <TextField id="evenement" label="Evenement" variant="filled" style={{width:'500px'}} onClick={(e)=>{setEvenement(e.target.value)}}/>
            <br />
            <br />
            <Button variant="contained" onClick={()=>{handelSubmit()}}>Envoyer</Button>
        </div>
      </div>
    </div>
  );
};