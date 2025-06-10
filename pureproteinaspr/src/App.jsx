import React, { useState } from 'react';
import logo1 from '/imgs/logorecortado.jpeg';
import whatsapp from '/imgs/ico-wa.png';
import carritoImg from '/imgs/ico-cart.png';
import Contacto from './Contacto';
import Productos from './Productos';
import Ofertas from './Ofertas';

export default function App() {
  const [pantalla, setPantalla] = useState('inicio');
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

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

    // Agrupar productos por nombre y cantidad
    const resumen = carrito.reduce((acc, item) => {
      if (!acc[item.nombre]) acc[item.nombre] = { cantidad: 0, precio: 0 };
      acc[item.nombre].cantidad += 1; // si tienes cantidad, ajusta aquí
      acc[item.nombre].precio += item.precio;
      return acc;
    }, {});

    // Formatear mensaje
    for (const nombre in resumen) {
      const item = resumen[nombre];
      mensaje += `- ${nombre} x${item.cantidad} = €${item.precio.toFixed(2)}\n`;
    }

    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    mensaje += `\nTotal: €${total.toFixed(2)}\n\n¡Gracias!`;

    const url = `https://wa.me/34611661109?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };


  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-black text-white px-6 py-4 shadow-md relative">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
          <img src={logo1} alt="Logo PureProteínas" className="h-20" />

          <nav className="space-x-6 text-base font-semibold flex items-center">
            <a href="#" onClick={(e) => { e.preventDefault(); setPantalla('inicio'); }}
              className={`transition-colors ${pantalla === 'inicio' ? 'text-red-300' : 'hover:text-red-600 text-white'}`}>
              Inicio
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPantalla('productos'); }}
              className={`transition-colors ${pantalla === 'productos' ? 'text-red-300' : 'hover:text-red-600 text-white'}`}>
              Productos
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPantalla('novedades'); }}
              className={`transition-colors ${pantalla === 'novedades' ? 'text-red-300' : 'hover:text-red-600 text-white'}`}>
              Novedades
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPantalla('top'); }}
              className={`transition-colors ${pantalla === 'top' ? 'text-red-300' : 'hover:text-red-600 text-white'}`}>
              TOP Ventas
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPantalla('ofertas'); }}
              className={`transition-colors ${pantalla === 'ofertas' ? 'text-red-300' : 'hover:text-red-600 text-white'}`}>
              Ofertas
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPantalla('contacto'); }}
              className={`transition-colors ${pantalla === 'contacto' ? 'text-red-300' : 'hover:text-red-600 text-white'}`}>
              Contacto
            </a>

            {/* Carrito */}
            <button
              onClick={() => setMostrarCarrito(!mostrarCarrito)}
              className="relative transition-transform transform hover:scale-110 focus:outline-none ml-2"
              title="Ver carrito"
            >
              <img src={carritoImg} alt="Carrito" className="h-7 inline-block" />
              {carrito.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {carrito.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      <main>
        {pantalla === 'inicio' && (
          <section className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto text-center px-4">
              <h2 className="text-4xl font-bold mb-4">Explora nuestros productos de nutrición deportiva</h2>
              <p className="text-lg mb-6">Encuentra todo lo que necesitas para mantenerte activo y saludable.</p>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition">
                Ver catálogo
              </button>
            </div>
          </section>
        )}

        {pantalla === 'contacto' && <Contacto />}
        {pantalla === 'productos' && <Productos añadirAlCarrito={agregarAlCarrito} />}
        {pantalla === 'ofertas' && <Ofertas />}
      </main>

      {/* Carrito Modal */}
      {mostrarCarrito && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setMostrarCarrito(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMostrarCarrito(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Tu carrito</h2>
            {carrito.length === 0 ? (
              <p className="text-gray-600">No hay productos aún.</p>
            ) : (
              <ul className="divide-y divide-gray-300 mb-4 max-h-60 overflow-y-auto">
                {carrito.map((item, idx) => (
                  <li key={idx} className="py-2 flex justify-between text-sm">
                    <span>{item.nombre}</span>
                    <span className="font-semibold">€ {item.precio.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>€ {totalCarrito.toFixed(2)}</span>
            </div>
            <div className="text-center">
              <span>Actualmente los pedidos se realizan a través de whatsapp, si pulsa aquí cargará el carrito en el chat de whatsapp</span>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-full"
                onClick={(abrirWhatsAppConPedido)}
              >
                Pedir por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className="fixed bottom-6 right-6 text-white p-4 rounded-full text-xl"
        onClick={() => window.open('https://wa.me/34611661109', '_blank')}
      >
        <img src={whatsapp} alt="whatsapp" className="h-20" />
      </button>

      <footer className="bg-black text-white text-center py-6 mt-12">
        <p className="text-sm mb-2">
          © {new Date().getFullYear()} PureProteínas. Desarrollado por José María Cordero.
        </p>
        <p className="text-sm">
          ¿Te gusta lo que ves? Contáctame:{" "}
          <a
            href="mailto:jmcorderoperez@gmail.com"
            className="text-red-500 hover:underline"
          >
            jmcorderoperez@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}
