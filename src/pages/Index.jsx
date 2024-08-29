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
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes oscillate {
          0% { transform: translate(-50%, -50%) rotateY(10deg) rotateZ(0deg); }
          50% { transform: translate(-50%, -50%) rotateY(-10deg) rotateZ(3deg); }
          100% { transform: translate(-50%, -50%) rotateY(10deg) rotateZ(-3deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        .store-button {
          text-decoration: none;
          color: #fff;
          padding: 12px 25px;
          margin: 10px;
          display: inline-block;
          border-radius: 25px;
          font-weight: bold;
          text-transform: uppercase;
          background-color: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          font-size: 1rem;
          width: 100%;
          max-width: 300px;
        }
        .store-button:hover {
          transform: scale(1.05);
          background-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.6);
        }
        .social-button {
          text-decoration: none;
          color: #fff;
          padding: 10px 20px;
          margin: 10px;
          display: inline-block;
          border-radius: 25px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background-color: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }
        .social-button:hover {
          transform: scale(1.05);
          background-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }
        #floating-logo {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 250px;
          height: 250px;
          background-image: url('https://i.imgur.com/gDXPs0n.png');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.15;
          animation: oscillate 5s ease-in-out infinite alternate;
          cursor: pointer;
        }
      `}</style>

      {!selectedStore ? (
        <div className="text-center" style={{ animation: 'fadeIn 1.5s forwards' }}>
          <h1 className="text-4xl mb-8 font-bold text-shadow">Selecciona Tu Tienda</h1>
          <div>
            <button className="store-button" onClick={() => handleStoreSelect('vina')}>SeedHarta Viña</button>
            <button className="store-button" onClick={() => handleStoreSelect('valpo')}>SeedHarta Valpo</button>
          </div>
        </div>
      ) : (
        <div className="text-center max-w-md bg-opacity-10 bg-white p-8 rounded-lg shadow-lg" style={{ animation: 'fadeIn 1.5s forwards' }}>
          <h2 className="text-3xl mb-6 font-bold">{selectedStore === 'vina' ? 'SeedHarta Viña' : 'SeedHarta Valpo'}</h2>
          <div className="mb-6 text-left">
            <h3 className="text-xl mb-4 font-semibold">Detalles de Pago y Contacto</h3>
            <p><strong>Nombre:</strong> Claudio Arias</p>
            <p><strong>Banco:</strong> Scotiabank</p>
            <p><strong>Cuenta Corriente:</strong> 1976772503</p>
            <p><strong>RUT:</strong> 12.345.678-9</p>
            <p><strong>Email:</strong> tiendavalpo07@gmail.com</p>
            <button className="social-button mt-4 w-full" onClick={handleCopyToClipboard}>
              Copiar datos de transferencia
            </button>
          </div>
          <div className="flex justify-center mb-6">
            <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="social-button">WhatsApp</a>
            <a href="https://instagram.com/tu-pagina" target="_blank" rel="noopener noreferrer" className="social-button">Instagram</a>
          </div>
        </div>
      )}

      <button
        className="absolute top-4 right-4 bg-white bg-opacity-10 px-4 py-2 rounded-full hover:bg-opacity-20 transition-all"
        onClick={() => setSelectedStore(null)}
      >
        Selección de tienda
      </button>

      <div
        id="floating-logo"
        onClick={handleLogoClick}
      ></div>
    </div>
  );
};

export default Index;
