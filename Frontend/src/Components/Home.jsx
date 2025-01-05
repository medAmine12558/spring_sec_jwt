import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{backgroundColor:'skyblue',width:'100%'}}>
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <div className="text-purple-800 text-2xl font-bold">Detection Emotion</div>
        <div className="flex gap-4">
          <button className="text-purple-800" onClick={()=>{navigate('/Signup')}}>Se connecter</button>
          <button className="bg-purple-800 text-white px-4 py-2 rounded" onClick={()=>{navigate('/Signin')}}>S'inscrire</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto mt-20 px-4">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Testez notre AI qui detecte les Emotions
            <span className="relative">
              <div className="absolute -right-4 top-0 h-full w-full">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-yellow-400 h-4 w-full -z-10 rounded-full"></div>
              </div>
            </span>
            .
          </h1>
          
          <h2 className="text-3xl mb-12">
            Simple, efficace, et
            <span className="relative">
              <p style={{display:'inline'}}> </p>abordable
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-400"></div>
            </span>
            !
          </h2>

          <div className="flex justify-center gap-4 mb-8">
            <button className="bg-purple-800 text-white px-6 py-3 rounded">
              Lancez-vous - C'est gratuit
            </button>
          </div>

          <div className="text-purple-800 text-xl mt-8 italic">
            profitez de notre AI avec <br />
            0$/mois
          </div>
        </div>
      </main>
    </div>
  );
};
