import React, { useState } from 'react';
import logo1 from '/imgs/logorecortado.jpeg';
import whatsapp from '/imgs/ico-wa.png';
import Contacto from './Contacto';

export default function App() {
  const [pantalla, setPantalla] = useState('inicio');

  return (
    <div className="min-h-screen bg-white text-gray-800">

      <header className="bg-black text-white px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/*<h1 className="text-2xl font-bold">PureProteínas</h1>*/}
          <img src={logo1} alt="Logo PureProteínas" className="h-20" />
          <nav className="space-x-6 text-base font-semibold">
            <a href="#" onClick={(e) => { e.preventDefault(); setPantalla('inicio'); }} className={`transition-colors ${pantalla === 'inicio' ? 'text-red-300' : 'hover:text-red-600 text-white'}`}> Inicio </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPantalla('productos'); }} className={`transition-colors ${pantalla === 'productos' ? 'text-red-300' : 'hover:text-red-600 text-white'}`} > Productos </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPantalla('novedades'); }} className={`transition-colors ${pantalla === 'novedades' ? 'text-red-300' : 'hover:text-red-600 text-white'}`} > Novedades </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPantalla('top'); }} className={`transition-colors ${pantalla === 'top' ? 'text-red-300' : 'hover:text-red-600 text-white'}`} > TOP Ventas </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPantalla('ofertas'); }} className={`transition-colors ${pantalla === 'ofertas' ? 'text-red-300' : 'hover:text-red-600 text-white'}`} > Ofertas </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPantalla('contacto'); }} className={`transition-colors ${pantalla === 'contacto' ? 'text-red-300' : 'hover:text-red-600 text-white'}`} > Contacto </a>
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
      </main>

      <button
        className="fixed bottom-6 right-6 text-white p-4 rounded-full  text-xl"
        onClick={() => alert('¡Hola! ¿En qué podemos ayudarte?')}>
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




      {/*<section className="max-w-7xl mx-auto py-12 px-4">
        <h3 className="text-2xl font-semibold mb-6">Productos Destacados</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white shadow rounded-xl overflow-hidden">
              <div className="bg-gray-200 h-40"></div>
              <div className="p-4">
                <h4 className="text-lg font-bold mb-2">Producto {item}</h4>
                <p className="text-sm text-gray-600 mb-2">Descripción breve del producto {item}.</p>
                <button className="mt-2 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-full">
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>*/}
    </div>
  );
}
