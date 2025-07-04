export default function QuienesSomos() {
    return (
        <section className="bg-white py-16 px-4 text-gray-800">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Quiénes Somos?</h2>
                <p className="text-lg mb-4">
                    En <strong>Pure Proteína PR</strong>, creemos que la nutrición va más allá de vender suplementos.
                    Para nosotros, cada persona que llega a nuestra tienda se convierte en parte de una familia que se apoya, se escucha y se cuida.
                </p>
                <p className="text-lg mb-4">
                    Sabemos que cada cuerpo, cada meta y cada historia son únicos. Por eso, nuestro compromiso es ofrecerte un trato personalizado, cercano y real.
                </p>
                <p className="text-lg mb-4">
                    Trabajamos con productos de máxima calidad, solo con marcas y fórmulas que cumplen lo que prometen.
                    Nos aseguramos de que lo que consumes sea seguro, eficaz y adaptado a lo que necesitas.
                </p>
                <p className='text-lg mb-4'>
                    Aquí no solo encontrarás asesoría profesional, sino también la cercanía de un equipo que está para ti: para resolver tus dudas, motivarte y recordarte que nunca estás solo en tu proceso.
                </p>
                <p className='text-lg mb-4'>
                    Hoy te invitamos a dar ese paso. A formar parte de una comunidad donde lo más importante eres tú, tu salud y tu progreso.
                </p>
                <p className="text-lg font-semibold mt-6">
                    Bienvenido a <span className="text-red-600 font-bold">#PureFamily</span>. Do it now / Hazlo ahora.
                </p>
            </div>
            {/* Galería de imágenes de la tienda */}
                <div className="mt-10">
                    <h3 className="text-2xl font-bold mb-4 text-center">Nuestra tienda</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <img src="/imgs/tienda/tienda1.jpeg" alt="Interior tienda 1" className="rounded-lg shadow-md object-cover w-full h-64" />
                        <img src="/imgs/tienda/tienda2.jpeg" alt="Interior tienda 2" className="rounded-lg shadow-md object-cover w-full h-64" />
                        <img src="/imgs/tienda/tienda3.jpeg" alt="Interior tienda 3" className="rounded-lg shadow-md object-cover w-full h-64" />
                        <img src="/imgs/tienda/tienda3.jpeg" alt="Interior tienda 3" className="rounded-lg shadow-md object-cover w-full h-64" />
                    </div>
                </div>
        </section>
    );
}
