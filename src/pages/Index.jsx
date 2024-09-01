import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

const Index = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const logoRef = useRef(null);

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
    const text = `Claudio Arias
12.006.081-3 
Cuenta Corriente 
1976772503 
Banco Scotiabank 
tiendavalpo07@gmail.com`;
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Datos copiados al portapapeles');
    });
  };

  const [oscillationSpeed, setOscillationSpeed] = useState(1);

  useEffect(() => {
    const animateLogo = () => {
      if (logoRef.current) {
        const time = Date.now() * 0.001 * oscillationSpeed;
        const yOffset = Math.sin(time) * 5; // 5px max displacement
        logoRef.current.style.transform = `translate(-50%, -50%) translateY(${yOffset}px)`;
      }
      requestAnimationFrame(animateLogo);
    };
    const animationFrame = requestAnimationFrame(animateLogo);
    return () => cancelAnimationFrame(animationFrame);
  }, [oscillationSpeed]);

  const handleLogoInteraction = (e) => {
    if (!logoRef.current) return;
    
    const logo = logoRef.current;
    const rect = logo.getBoundingClientRect();
    const y = e.clientY - rect.top;
    
    // Adjust oscillation speed based on mouse position
    const newSpeed = 1 + Math.abs((y / rect.height - 0.5) * 2);
    setOscillationSpeed(newSpeed);
  };

  const resetLogoPosition = () => {
    setOscillationSpeed(1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .store-button, .social-button {
          text-decoration: none;
          color: #fff;
          padding: 10px 20px;
          margin: 5px;
          display: inline-block;
          border-radius: 25px;
          font-weight: bold;
          text-transform: uppercase;
          background-color: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
          transition: all 0.2s ease;
          font-size: 0.9rem;
        }
        .store-button {
          width: 100%;
        }
        .store-button:hover, .social-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
        }
        .store-button:active, .social-button:active {
          transform: scale(0.98);
          background-color: rgba(255, 255, 255, 0.3);
        }
        #floating-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          background-image: url('https://i.imgur.com/gDXPs0n.png');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.15;
          transition: transform 0.3s ease-out;
          cursor: pointer;
          z-index: -1;
        }
        @media (min-width: 640px) {
          .store-button, .social-button {
            font-size: 1rem;
            padding: 12px 25px;
          }
          #floating-logo {
            width: 300px;
            height: 300px;
          }
        }
      `}</style>

      <div
        id="floating-logo"
        ref={logoRef}
        onMouseMove={handleLogoInteraction}
        onMouseLeave={resetLogoPosition}
      ></div>

      {!selectedStore ? (
        <div className="text-center relative z-10 w-full max-w-md" style={{ animation: 'fadeIn 1.5s forwards' }}>
          <h1 className="text-3xl sm:text-4xl mb-6 sm:mb-8 font-bold text-shadow">Selecciona Tu Tienda</h1>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="store-button w-full sm:w-48" onClick={() => handleStoreSelect('vina')}>Seedharta Viña</button>
            <button className="store-button w-full sm:w-48" onClick={() => handleStoreSelect('valpo')}>Seedharta Valpo</button>
          </div>
        </div>
      ) : (
        <div className="text-center w-full max-w-md p-4 relative z-10" style={{ animation: 'fadeIn 1.5s forwards' }}>
          <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6 font-bold">{selectedStore === 'vina' ? 'Seedharta Viña' : 'Seedharta Valpo'}</h2>
          <div className="mb-6 text-left">
            <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 font-semibold">Detalles de Pago y Contacto</h3>
            <p className="text-sm sm:text-base whitespace-pre-line">
              Nombre: Claudio Arias<br />
              Rut: 12.006.081-3<br />
              Cuenta: Corriente<br />
              N.Cuenta: 1976772503<br />
              Banco: Scotiabank<br />
              email: tiendavalpo07@gmail.com
            </p>
            <button className="social-button mt-4 w-full" onClick={handleCopyToClipboard}>
              Copiar datos de transferencia
            </button>
          </div>
          <div className="flex flex-row justify-center items-center space-x-4 mb-6 flex-wrap">
            <a href={selectedStore === 'vina' 
                ? "https://wa.me/56964316344"
                : "https://wa.me/56993198230"
              } target="_blank" rel="noopener noreferrer" className="social-button">WhatsApp</a>
            <a 
              href={selectedStore === 'vina' 
                ? "https://www.instagram.com/seedhartavinadelmar/" 
                : "https://www.instagram.com/seedhartagrow/"
              } 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-button"
            >
              Instagram
            </a>
            <a
              href={selectedStore === 'vina'
                ? "https://www.google.com/maps/place/Seedharta+Growshop/data=!4m7!3m6!1s0x9689dde2e7264711:0x29800d8e2932ed2!8m2!3d-33.0230586!4d-71.5588417!16s%2Fg%2F11c6q16mb5!19sChIJEUcm5-LdiZYR0i6T4tgAmAI?authuser=0&hl=es-419&rclk=1"
                : "https://www.google.com/maps/place/Seedharta+Growshop/@-33.0470596,-71.6060127,17z/data=!3m1!4b1!4m6!3m5!1s0x9689e1c16b64872b:0x96d2bf256bf85bc3!8m2!3d-33.0470596!4d-71.6060127!16s%2Fg%2F11h64v92pm?authuser=0&hl=es-419&entry=ttu&g_ep=EgoyMDI0MDgyNi4wIKXMDSoASAFQAw%3D%3D"}
              target="_blank"
              rel="noopener noreferrer"
              className="social-button"
            >
              Ubicación
            </a>
          </div>
        </div>
      )}

      <button
        className="absolute top-4 right-4 bg-white bg-opacity-10 px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-opacity-20 transition-all z-20 text-sm sm:text-base"
        onClick={() => setSelectedStore(null)}
      >
        Selección de tienda
      </button>
    </div>
  );
};

export default Index;
