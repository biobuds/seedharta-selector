import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

const Index = () => {
  const [selectedStore, setSelectedStore] = useState(null);

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

  const handleCopyToClipboard = () => {
    const text = `Nombre: Claudio Arias
Banco: Scotiabank
Cuenta Corriente: 1976772503
RUT: 12.345.678-9
Email: tiendavalpo07@gmail.com`;
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Datos copiados al portapapeles');
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
      <style jsx>{`
        @keyframes glowText {
          0% { text-shadow: 0 0 5px rgba(255,255,255,0.5); }
          50% { text-shadow: 0 0 20px rgba(255,255,255,0.8); }
          100% { text-shadow: 0 0 5px rgba(255,255,255,0.5); }
        }
        .glow-text {
          animation: glowText 3s infinite;
        }
        .store-button, .social-button {
          text-decoration: none;
          color: #fff;
          padding: 12px 24px;
          margin: 8px;
          display: inline-block;
          border-radius: 30px;
          font-weight: bold;
          text-transform: uppercase;
          background-color: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
          font-size: 1rem;
        }
        .store-button:hover, .social-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }
        .store-button:active, .social-button:active {
          transform: translateY(1px);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
        }
        @keyframes floatLogo {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-20px); }
        }
        #background-logo {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 60%;
          height: 60%;
          background-image: url('https://i.imgur.com/gDXPs0n.png');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.1;
          z-index: -1;
          animation: floatLogo 6s ease-in-out infinite;
          transition: opacity 0.3s ease;
        }
        #background-logo:hover {
          opacity: 0.15;
        }
      `}</style>

      <div id="background-logo"></div>

      {!selectedStore ? (
        <div className="text-center relative z-10 w-full max-w-md">
          <h1 className="text-5xl mb-8 font-bold glow-text">SeedHarta</h1>
          <h2 className="text-3xl mb-8 font-bold glow-text">Selecciona Tu Tienda</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="store-button w-full sm:w-48" onClick={() => handleStoreSelect('vina')}>Seedharta Viña</button>
            <button className="store-button w-full sm:w-48" onClick={() => handleStoreSelect('valpo')}>Seedharta Valpo</button>
          </div>
        </div>
      ) : (
        <div className="text-center w-full max-w-md p-4 relative z-10">
          <h2 className="text-4xl mb-6 font-bold glow-text">Detalles de Pago y Contacto - {selectedStore === 'vina' ? 'Viña' : 'Valpo'}</h2>
          <div className="mb-6 text-left bg-black bg-opacity-50 p-6 rounded-lg">
            <h3 className="text-2xl mb-4 font-semibold">Datos de Transferencia Bancaria:</h3>
            <p className="text-lg whitespace-pre-line">
              Nombre:             Claudio Arias
              Banco:              Scotiabank
              Cuenta Corriente:   1976772503
              RUT:                12.345.678-9
              Email:              tiendavalpo07@gmail.com
            </p>
            <button className="social-button mt-6 w-full" onClick={handleCopyToClipboard}>
              Copiar datos de transferencia
            </button>
          </div>
          <div className="flex flex-row justify-center items-center space-x-4 mb-6">
            <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="social-button">WHATSAPP</a>
            <a 
              href={selectedStore === 'vina' 
                ? "https://www.facebook.com/seedhartavinadelmar" 
                : "https://www.facebook.com/seedhartavalparaiso"
              } 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-button"
            >
              FACEBOOK
            </a>
            <a 
              href={selectedStore === 'vina' 
                ? "https://www.instagram.com/seedhartavinadelmar/" 
                : "https://www.instagram.com/seedhartagrow/"
              } 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-button"
            >
              INSTAGRAM
            </a>
          </div>
        </div>
      )}

      <button
        className="absolute top-4 right-4 bg-white bg-opacity-10 px-4 py-2 rounded-full hover:bg-opacity-20 transition-all z-20 text-base"
        onClick={() => setSelectedStore(null)}
      >
        Volver a selección
      </button>
    </div>
  );
};

export default Index;
