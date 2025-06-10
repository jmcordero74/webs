import React from 'react';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';

export default function Contacto() {
    return (
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 mt-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Contáctanos en redes sociales</h2>
            <p className="mb-6">Síguenos para estar al día con nuestras novedades y promociones:</p>

            <div className="flex justify-center space-x-6 text-4xl text-red-600 mb-6">
                <a href="https://www.facebook.com/p/Pure-prote%C3%ADnas-Puerto-Real-100078641852707/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FaFacebookSquare className="hover:text-red-800 transition-colors" />
                </a>
                <a href="https://www.instagram.com/pureproteinaspr/?igsh=MW4ya3g2ZGkyM3Vq#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram className="hover:text-red-800 transition-colors" />
                </a>
            </div>

            <div className="text-left text-gray-700">
                <h3 className="text-xl font-semibold mb-2 text-center">Horario de atención</h3>
                <ul className="space-y-1">
                    <li><strong>Lunes a Jueves:</strong> 10:00h - 14:00h / 17:30h - 20:30h</li>
                    <li><strong>Viernes:</strong> 10:00h - 14:00h / 17:30h - 21:30h</li>
                    <li><strong>Sábados:</strong> 9:30h - 13:30h</li>
                </ul>
            </div>

            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Nuestra ubicación</h3>
                <iframe
                    title="Mapa PureProteínas"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3205.97436275842!2d-6.184870723604264!3d36.530612882848835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0dcd3e22c9fe07%3A0x8fa63ba48d223317!2sPure%20Prote%C3%ADnas%20pr!5e0!3m2!1ses!2ses!4v1748283265767!5m2!1ses!2ses"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>


            <div className="mt-6 text-gray-700">
                <h3 className="text-xl font-semibold mb-2">Nuestra ubicación</h3>
                <p>C. Hermanos Rosquete, 11510 Puerto Real, Cádiz</p>
            </div>

        </div>
    );
}

{/*export default function Contacto() { 

    return (
        <section className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto text-center px-4">
                <h2 className="text-4xl font-bold mb-4">Ponte en contacto con nosotros</h2>
                <p className="text-lg mb-6">Horario</p>
                <p className="text-lg mb-1">De Lunes a Jueves de 10:00h a 14:00h / 17:30h a 20:30h</p>
                <p className="text-lg mb-1">Viernes de 10:00h a 14:00h / 17:30h a 21:30h</p>
                <p className="text-lg mb-6">Sábados de 9:30h a 13:30h</p>
            </div>
        </section>
    );
}*/}
