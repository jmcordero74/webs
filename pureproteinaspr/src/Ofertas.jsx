import React, { useState } from 'react';
import productos from './data/productos';

export default function Productos() {
    const [paginaActual, setPaginaActual] = useState(1);
    const [precioMin, setPrecioMin] = useState(0);
    const [precioMax, setPrecioMax] = useState(100);
    const [orden, setOrden] = useState('asc');
    const [productoSeleccionado, setProductoSeleccionado] = useState(null); // para el modal

    const productosPorPagina = 6;

    // 1. Filtrar por rango
    const filtrados = productos.filter(
        (p) =>
            p.precio >= precioMin &&
            p.precio <= precioMax &&
            p.precioAntiguo !== undefined
    );

    // 2. Ordenar
    const ordenados = filtrados.sort((a, b) =>
        orden === 'asc' ? a.precio - b.precio : b.precio - a.precio
    );

    // 3. Paginación
    const totalPaginas = Math.ceil(ordenados.length / productosPorPagina);
    const inicio = (paginaActual - 1) * productosPorPagina;
    const paginados = ordenados.slice(inicio, inicio + productosPorPagina);

    // 4. Cambiar página
    const cambiarPagina = (nueva) => {
        if (nueva >= 1 && nueva <= totalPaginas) setPaginaActual(nueva);
    };

    return (
        <section className="max-w-7xl mx-auto py-12 px-4">
            <h3 className="text-2xl font-semibold mb-6">Productos Destacados</h3>

            {/* Filtros */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
                <div>
                    <label className="mr-2 font-semibold">Precio mín:</label>
                    <input
                        type="number"
                        value={precioMin}
                        onChange={(e) => setPrecioMin(Number(e.target.value))}
                        className="border rounded px-2 py-1 w-20"
                    />
                </div>
                <div>
                    <label className="mr-2 font-semibold">Precio máx:</label>
                    <input
                        type="number"
                        value={precioMax}
                        onChange={(e) => setPrecioMax(Number(e.target.value))}
                        className="border rounded px-2 py-1 w-20"
                    />
                </div>
                <div>
                    <label className="mr-2 font-semibold">Orden:</label>
                    <select
                        value={orden}
                        onChange={(e) => setOrden(e.target.value)}
                        className="border rounded px-2 py-1"
                    >
                        <option value="asc">Precio: menor a mayor</option>
                        <option value="desc">Precio: mayor a menor</option>
                    </select>
                </div>
            </div>

            {/* Productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginados.map((item) => (
                    <div
                        key={item.id}
                        className="group bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="overflow-hidden h-40 cursor-pointer" onClick={() => setProductoSeleccionado(item)}>
                            <img
                                src={item.imagen}
                                alt={item.nombre}
                                className="w-full h-full object-cover transition-transform duration-500"
                            />
                        </div>
                        <div className="p-4">
                            <h4 className="text-lg font-bold mb-2 group-hover:text-red-600 transition-colors duration-300">{item.nombre}</h4>
                            <p className="text-sm text-gray-600 mb-2">{item.descripcion}</p>

                            {/* Precio y botón en la misma línea */}
                            <div className="flex justify-between items-center">
                                <p className={`font-semibold text-base ${item.precioAntiguo ? 'text-green-600' : 'text-gray-800'}`}>
                                    € {item.precio.toFixed(2)}
                                </p>

                                {item.precioAntiguo && (
                                    <p className="text-sm text-black line-through ml-4">
                                        € {item.precioAntiguo.toFixed(2)}
                                    </p>
                                )}

                                <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-full ml-auto">
                                    Comprar
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-center items-center gap-4 mt-8">
                <button
                    onClick={() => cambiarPagina(paginaActual - 1)}
                    className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
                    disabled={paginaActual === 1}
                >
                    Anterior
                </button>
                <span className="font-semibold">
                    Página {paginaActual} de {totalPaginas}
                </span>
                <button
                    onClick={() => cambiarPagina(paginaActual + 1)}
                    className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
                    disabled={paginaActual === totalPaginas}
                >
                    Siguiente
                </button>
            </div>

            {/* Modal */}
            {productoSeleccionado && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setProductoSeleccionado(null)}
                >
                    <div
                        className="bg-white rounded-lg p-6 max-w-md w-full relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setProductoSeleccionado(null)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
                            aria-label="Cerrar modal"
                        >
                            ×
                        </button>
                        <img
                            src={productoSeleccionado.imagen}
                            alt={productoSeleccionado.nombre}
                            className="w-full h-64 object-cover rounded mb-4"
                        />
                        <h2 className="text-2xl font-bold mb-2">{productoSeleccionado.nombre}</h2>
                        <p className="mb-4 text-gray-700">{productoSeleccionado.descripcion}</p>

                        <div className="flex items-center mb-4">
                            <span className={`font-semibold text-xl ${productoSeleccionado.precioAntiguo ? 'text-green-600' : 'text-red-600'}`}>
                                € {productoSeleccionado.precio.toFixed(2)}
                            </span>
                            {productoSeleccionado.precioAntiguo && (
                                <span className="text-black line-through ml-4 text-base">
                                    € {productoSeleccionado.precioAntiguo.toFixed(2)}
                                </span>
                            )}
                            <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-full ml-auto">
                                Comprar
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
}
