import React, { useState, useEffect } from 'react';
import productos from './data/productos';

export default function Productos({ añadirAlCarrito }) {
    const [paginaActual, setPaginaActual] = useState(1);
    const [precioMin, setPrecioMin] = useState(0);
    const [precioMax, setPrecioMax] = useState(100);
    const [orden, setOrden] = useState('asc');
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const productosPorPagina = 6;

    const marcasUnicas = [...new Set(productos.map(p => p.marca))];
    const categoriasUnicas = [...new Set(productos.map(p => p.categoria))];

    const filtrados = productos
        .filter(p => p.activo !== false)
        .filter(p => p.precio >= precioMin && p.precio <= precioMax)
        .filter(p => !marcaSeleccionada || p.marca === marcaSeleccionada)
        .filter(p => !categoriaSeleccionada || p.categoria === categoriaSeleccionada)
        .filter(p => p.descuento && p.descuento > 0); // ⬅️ Solo productos con descuento

    const ordenados = filtrados.sort((a, b) =>
        orden === 'asc' ? a.precio - b.precio : b.precio - a.precio
    );

    const totalPaginas = Math.ceil(ordenados.length / productosPorPagina);
    const inicio = (paginaActual - 1) * productosPorPagina;
    const paginados = ordenados.slice(inicio, inicio + productosPorPagina);

    const cambiarPagina = (nueva) => {
        if (nueva >= 1 && nueva <= totalPaginas) setPaginaActual(nueva);
    };

    useEffect(() => {
        setPaginaActual(1);
    }, [precioMin, precioMax, orden, marcaSeleccionada, categoriaSeleccionada]);

    return (
        <section className="max-w-7xl mx-auto py-12 px-4">
            <h3 className="text-2xl font-semibold mb-6">Productos en Oferta</h3>

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

                <div>
                    <label className="mr-2 font-semibold">Marca:</label>
                    <select
                        value={marcaSeleccionada}
                        onChange={(e) => setMarcaSeleccionada(e.target.value)}
                        className="border rounded px-2 py-1"
                    >
                        <option value="">Todas</option>
                        {marcasUnicas.map((marca) => (
                            <option key={marca} value={marca}>
                                {marca}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Categorías */}
            <div className="flex flex-wrap gap-3 mb-8">
                <button
                    onClick={() => setCategoriaSeleccionada('')}
                    className={`px-4 py-2 rounded-full border ${categoriaSeleccionada === '' ? 'bg-red-600 text-white' : 'bg-white text-black'}`}
                >
                    Todas
                </button>
                {categoriasUnicas.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategoriaSeleccionada(cat)}
                        className={`px-4 py-2 rounded-full border ${categoriaSeleccionada === cat ? 'bg-red-600 text-white' : 'bg-white text-black'}`}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            {/* Productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginados.map((item) => {
                    const precioFinal = item.precio * (1 - item.descuento / 100);
                    return (
                        <div
                            key={item.id}
                            className={`group shadow rounded-xl overflow-hidden transition-shadow duration-300 ${!item.stock ? 'bg-gray-200 cursor-not-allowed opacity-50' : 'bg-white hover:shadow-lg'}`}
                        >
                            <div
                                className={`overflow-hidden h-40 ${item.stock ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                onClick={() => item.stock && setProductoSeleccionado(item)}
                            >
                                <img
                                    src={item.imagen}
                                    alt={item.nombre}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <h4 className="text-lg font-bold mb-2 group-hover:text-red-600 transition-colors duration-300">{item.nombre}</h4>
                                <p className="text-sm text-gray-600 mb-2">{item.descripcionCorta}</p>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-base text-green-600">
                                            € {precioFinal.toFixed(2)}
                                        </p>
                                        <div className="text-sm text-gray-500 flex items-center gap-2">
                                            <span className="line-through">€ {item.precio.toFixed(2)}</span>
                                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                                -{item.descuento}%
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        disabled={!item.stock}
                                        onClick={() => item.stock && añadirAlCarrito(item)}
                                        className={`text-sm px-4 py-2 rounded-full ml-auto ${item.stock
                                            ? 'bg-red-600 hover:bg-red-700 text-white'
                                            : 'bg-gray-400 text-white cursor-not-allowed'
                                            }`}
                                    >
                                        {item.stock ? 'Comprar' : 'Sin stock'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
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

            {/* Modal de producto */}
            {productoSeleccionado && (() => {
                const tieneDescuento = productoSeleccionado.descuento && productoSeleccionado.descuento > 0;
                const precioFinal = tieneDescuento
                    ? productoSeleccionado.precio * (1 - productoSeleccionado.descuento / 100)
                    : productoSeleccionado.precio;

                return (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2"
                        onClick={() => setProductoSeleccionado(null)}
                    >
                        <div
                            className="bg-white rounded-lg p-4 md:p-6 max-w-5xl w-full relative max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setProductoSeleccionado(null)}
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-2xl"
                                aria-label="Cerrar modal"
                            >
                                ×
                            </button>

                            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-6">
                                <div className="md:w-1/1">
                                    <img
                                        src={productoSeleccionado.imagen}
                                        alt={productoSeleccionado.nombre}
                                        className="w-full h-64 md:h-96 object-cover rounded mb-4"
                                    />
                                </div>

                                <div className="md:w-1/2 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4">{productoSeleccionado.nombre}</h2>
                                        <p className="text-gray-700 mb-6">{productoSeleccionado.descripcion}</p>
                                    </div>

                                    <h3 className="text-lg font-semibold mb-2">Ingredientes:</h3>
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 max-h-40 overflow-y-auto pr-2">
                                        {productoSeleccionado.ingredientes.map((ing, idx) => (
                                            <li key={idx}>{ing}</li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap items-center justify-end gap-4 mt-4 md:mt-6">
                                        <span className={`font-semibold text-xl ${tieneDescuento ? 'text-green-600' : 'text-red-600'}`}>
                                            € {precioFinal.toFixed(2)}
                                        </span>

                                        <span className={`text-black text-base`}>
                                            (-{productoSeleccionado.descuento}%)
                                        </span>

                                        {tieneDescuento && (
                                            <span className="text-black line-through text-base">
                                                € {productoSeleccionado.precio.toFixed(2)}
                                            </span>
                                        )}

                                        <button
                                            onClick={() => {
                                                añadirAlCarrito(productoSeleccionado);
                                                setProductoSeleccionado(null);
                                            }}
                                            className="bg-red-600 hover:bg-red-700 text-white text-sm px-6 py-2 rounded-full"
                                        >
                                            Comprar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </section>
    );
}
