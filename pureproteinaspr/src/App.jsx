import React, { useState, useEffect } from 'react';
import logo1 from '/imgs/logorecortado.jpeg';
import whatsapp from '/imgs/ico-wa.png';
import carritoImg from '/imgs/ico-cart.png';
import Contacto from './Contacto';
import Productos from './Productos';
import Ofertas from './Ofertas';
import QuienesSomos from './QuienesSomos';

export default function App() {
  const [pantalla, setPantalla] = useState('inicio');
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [actual, setActual] = useState(0);


  const imagenes = [
    "/imgs/tienda/tienda1.jpeg",
    "/imgs/tienda/tienda2.jpeg",
    "/imgs/tienda/tienda3.jpeg",
    "/imgs/tienda/tienda4.jpeg",
  ];

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % imagenes.length);
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(intervalo); // Limpiar al desmontar
  }, [imagenes.length]);


  const siguiente = () => setActual((actual + 1) % imagenes.length);
  const anterior = () => setActual((actual - 1 + imagenes.length) % imagenes.length);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + item.precio, 0);

  const abrirWhatsAppConPedido = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    let mensaje = "Hola, quiero hacer este pedido:\n\n";
    const resumen = carrito.reduce((acc, item) => {
      if (!acc[item.nombre]) acc[item.nombre] = { cantidad: 0, precio: 0 };
      acc[item.nombre].cantidad += 1;
      acc[item.nombre].precio += item.precio;
      return acc;
    }, {});

    for (const nombre in resumen) {
      const item = resumen[nombre];
      mensaje += `- ${nombre} x${item.cantidad} = €${item.precio.toFixed(2)}\n`;
    }

    mensaje += `\nTotal: €${totalCarrito.toFixed(2)}\n\n¡Gracias!`;

    const url = `https://wa.me/34611661109?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-black text-white px-4 py-4 shadow-md relative">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src={logo1} alt="Logo" className="h-16" />

          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setMenuAbierto(!menuAbierto)}>
              ☰
            </button>
            <button onClick={() => setMostrarCarrito(!mostrarCarrito)} className="relative">
              <img src={carritoImg} alt="Carrito" className="h-6" />
              {carrito.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {carrito.length}
                </span>
              )}
            </button>
          </div>

          {/* Menú de navegación */}
          <nav className={`absolute md:static top-full left-0 w-full md:w-auto bg-black md:bg-transparent z-50 md:flex items-center space-y-2 md:space-y-0 md:space-x-6 text-white font-semibold p-4 md:p-0 transition-all duration-300 ${menuAbierto ? 'block' : 'hidden'}`}>
            {["inicio", "productos", "ofertas", "¿Quienes Somos?", "contacto"].map((pant) => (
              <a
                key={pant}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPantalla(pant);
                  setMenuAbierto(false);
                }}
                className={`block md:inline ${pantalla === pant ? 'text-red-300' : 'hover:text-red-600'}`}
              >
                {pant.charAt(0).toUpperCase() + pant.slice(1)}
              </a>
            ))}

            {/* Carrito también visible en versión escritorio */}
            <div className="hidden md:block">
              <button onClick={() => setMostrarCarrito(!mostrarCarrito)} className="relative">
                <img src={carritoImg} alt="Carrito" className="h-7" />
                {carrito.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {carrito.length}
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {pantalla === 'inicio' && (
          <section className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto text-center px-4">

              <div >
                <div className="relative">
                  <img
                    src={imagenes[actual]}
                    alt={`Foto tienda ${actual + 1}`}
                    className="w-full h-72 object-cover rounded-xl shadow-lg transition duration-500"
                  />
                  <button
                    onClick={() => setActual((actual - 1 + imagenes.length) % imagenes.length)}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-80"
                    aria-label="Anterior"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setActual((actual + 1) % imagenes.length)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-80"
                    aria-label="Siguiente"
                  >
                    ›
                  </button>
                </div>

                {/* Indicadores */}
                <div className="flex justify-center gap-2 mt-4">
                  {imagenes.map((_, i) => (
                    <button
                      key={i}
                      className={`w-3 h-3 rounded-full ${i === actual ? 'bg-red-600' : 'bg-gray-300'}`}
                      onClick={() => setActual(i)}
                    />
                  ))}
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">Bienvenidos a PureProteínas</h2>
              <p className="text-lg mb-6">
                En Pure Proteína PR creemos que la nutrición deportiva es mucho más que vender suplementos:
                es cuidarte como parte de una familia que te apoya y escucha.
                Cada persona es única, por eso te ofrecemos trato personalizado, cercanía y productos de máxima calidad, seguros y efectivos para tus metas.
                Aquí encontrarás asesoría real y un equipo siempre contigo, motivándote a dar ese paso hacia tu mejor versión.
              </p>
              <p className="text-lg mb-6 font-bold">
                Bienvenido a #PureFamily. Do it now / Hazlo ahora.
              </p>

              {/* Botón catálogo */}
              <button
                className="mt-12 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full"
                onClick={() => setPantalla('productos')}
              >
                Ver catálogo
              </button>
            </div>
          </section>
        )}

        {pantalla === 'contacto' && <Contacto />}
        {pantalla === 'productos' && <Productos añadirAlCarrito={agregarAlCarrito} />}
        {pantalla === 'ofertas' && <Ofertas />}
        {pantalla === '¿Quienes Somos?' && <QuienesSomos />}
      </main>

      {mostrarCarrito && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setMostrarCarrito(false)}
        >
          <div
            className="bg-white p-6 rounded-lg w-11/12 max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-2 right-2 text-xl" onClick={() => setMostrarCarrito(false)}>
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Tu carrito</h2>

            {carrito.length === 0 ? (
              <p className="text-gray-600">No hay productos aún.</p>
            ) : (
              <ul className="divide-y divide-gray-300 mb-4 max-h-60 overflow-y-auto">
                {Object.entries(
                  carrito.reduce((acc, item) => {
                    acc[item.nombre] = acc[item.nombre] || { ...item, cantidad: 0 };
                    acc[item.nombre].cantidad += 1;
                    return acc;
                  }, {})
                ).map(([nombre, item], idx) => (
                  <li key={idx} className="py-2 flex justify-between items-center text-sm">
                    <span>{nombre}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setCarrito((prev) => {
                            const index = prev.findIndex((p) => p.nombre === nombre);
                            if (index !== -1) {
                              const nueva = [...prev];
                              nueva.splice(index, 1);
                              return nueva;
                            }
                            return prev;
                          })
                        }
                        className="px-2 py-0.5 bg-gray-200 rounded-full text-lg font-semibold"
                      >
                        −
                      </button>
                      <span>{item.cantidad}</span>
                      <button
                        onClick={() =>
                          setCarrito((prev) => [...prev, { nombre: item.nombre, precio: item.precio }])
                        }
                        className="px-2 py-0.5 bg-gray-200 rounded-full text-lg font-semibold"
                      >
                        +
                      </button>
                      <span className="font-semibold">€ {(item.precio * item.cantidad).toFixed(2)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>€ {totalCarrito.toFixed(2)}</span>
            </div>
            <p className="text-xs mt-2 text-center">
              Actualmente los pedidos se realizan a través de whatsapp, si pulsa aquí cargará el carrito en el chat de whatsapp.
            </p>
            <button
              className="bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded-full mt-4"
              onClick={abrirWhatsAppConPedido}
            >
              Pedir por WhatsApp
            </button>
          </div>
        </div>
      )}


      <button
        className="fixed bottom-4 right-4 p-2 bg-green-500 rounded-full shadow-lg hover:scale-105 transition"
        onClick={() => window.open('https://wa.me/34611661109', '_blank')}
      >
        <img src={whatsapp} alt="WhatsApp" className="h-10 md:h-16" />
      </button>

      <footer className="bg-black text-white text-center py-6 px-4 mt-10 text-sm">
        <p className="mb-2">© {new Date().getFullYear()} PureProteínas. Desarrollado por José María Cordero.</p>
        <p>
          ¿Te gusta lo que ves? <a href="mailto:jmcorderoperez@gmail.com" className="text-red-500 underline">Contáctame</a>
        </p>
      </footer>
    </div>
  );
}
