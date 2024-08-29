import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

const Index = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
    document.body.style.fontFamily = 'Arial, sans-serif';
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.fontFamily = '';
    };
  }, []);

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copiado al portapapeles');
    });
  };

  const handleLogoClick = () => {
    const logo = document.getElementById('floating-logo');
    logo.style.animation = 'bounce 0.5s';
    setTimeout(() => {
      logo.style.animation = '';
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        .store-button {
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          padding: 10px 20px;
          margin: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .store-button:hover {
          transform: scale(1.05);
          background-color: rgba(255, 255, 255, 0.2);
        }
        .social-button {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .social-button:hover {
          transform: scale(1.1);
          background-color: rgba(255, 255, 255, 0.2);
        }
        .copy-button {
          background-color: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .copy-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        #floating-logo {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          opacity: 0.3;
          animation: float 3s ease-in-out infinite;
          cursor: pointer;
        }
      `}</style>

      {!selectedStore ? (
        <div className="text-center" style={{ animation: 'fadeIn 1s' }}>
          <h1 className="text-4xl mb-8 font-bold">Selecciona Tu Tienda</h1>
          <div>
            <button className="store-button" onClick={() => handleStoreSelect('vina')}>SeedHarta Viña</button>
            <button className="store-button" onClick={() => handleStoreSelect('valpo')}>SeedHarta Valpo</button>
          </div>
        </div>
      ) : (
        <div className="text-center max-w-md" style={{ animation: 'fadeIn 1s' }}>
          <h2 className="text-3xl mb-6 font-bold">{selectedStore === 'vina' ? 'SeedHarta Viña' : 'SeedHarta Valpo'}</h2>
          <div className="mb-6">
            <p>Nombre: SeedHarta SpA</p>
            <p>Banco: Banco Estado</p>
            <p>Cuenta: 123456789</p>
            <p>RUT: 12.345.678-9</p>
            <p>Email: {selectedStore === 'vina' ? 'vina@seedharta.cl' : 'valpo@seedharta.cl'}</p>
            <button className="copy-button mt-2" onClick={() => handleCopyToClipboard('SeedHarta SpA\nBanco Estado\nCuenta: 123456789\nRUT: 12.345.678-9\nEmail: ' + (selectedStore === 'vina' ? 'vina@seedharta.cl' : 'valpo@seedharta.cl'))}>
              Copiar datos
            </button>
          </div>
          <div className="flex justify-center mb-6">
            <a href="#" className="social-button">WA</a>
            <a href="#" className="social-button">IG</a>
            <a href="#" className="social-button">📍</a>
          </div>
        </div>
      )}

      <button
        className="absolute top-4 right-4 bg-white bg-opacity-10 px-4 py-2 rounded-full hover:bg-opacity-20 transition-all"
        onClick={() => setSelectedStore(null)}
      >
        Selección de tienda
      </button>

      <img
        id="floating-logo"
        src="/placeholder.svg"
        alt="SeedHarta Logo"
        onClick={handleLogoClick}
      />
    </div>
  );
};

export default Index;