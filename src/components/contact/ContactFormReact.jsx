import { useState, useEffect } from 'react';
import { SITE_KEY, SECRET_KEY, ENDPOINT } from 'astro:env/client';

export default function ContactFormReact({ addressee }) {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		message: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [message, setMessage] = useState({ text: '', type: '' });

	useEffect(() => {
		// Cleanup
		return () => {
			console.log('Limpiando recursos');
		};
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsSubmitting(true);
		setMessage({ text: '', type: '' });

		try {
			// Obtener token de reCAPTCHA
			const token = await grecaptcha.execute(SITE_KEY, { action: 'submit' });

			const data = {
				secret_key: SECRET_KEY,
				addressee,
				asunto: 'Nuevo mensaje desde el formulario de contacto',
				token,
				...formData,
			};

			// Enviar formulario
			const response = await fetch(ENDPOINT, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw errorData;
			}

			// Éxito
			setMessage({
				text: '¡Mensaje enviado correctamente! Te responderemos pronto.',
				type: 'success',
			});

			// Limpiar formulario
			setFormData({
				name: '',
				phone: '',
				email: '',
				message: '',
			});
		} catch (error) {
			// Error
			let errorMessage =
				'Ocurrió un error al enviar el mensaje. Por favor, intenta nuevamente.';

			if (error && error.errors) {
				const formErrors = error.errors;
				for (const field in formErrors) {
					if (Object.prototype.hasOwnProperty.call(formErrors, field)) {
						errorMessage = formErrors[field];
						break;
					}
				}
			} else if (error && error.message) {
				errorMessage = error.message;
			}

			setMessage({
				text: errorMessage,
				type: 'error',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="bg-white shadow-xl p-6 lg:p-8 w-full max-w-md relative">
			<h3 className="text-lg sm:text-xl text-center font-semibold bg-linear-to-r from-button-deg-1 to-button-deg-2 text-white px-2 sm:px-4 py-2 sm:py-3 mb-6">
				Contáctanos
			</h3>

			<form className="space-y-4" onSubmit={handleSubmit} noValidate>
				<div>
					<input
						type="text"
						name="name"
						placeholder="Nombre y Apellido"
						value={formData.name}
						onChange={handleChange}
						required
						className="w-full border-b-2 border-verde-claro py-2 focus:outline-none focus:border-verde-deg-1"
					/>
				</div>

				<div>
					<input
						type="email"
						name="email"
						placeholder="E-mail"
						value={formData.email}
						onChange={handleChange}
						required
						className="w-full border-b-2 border-verde-claro py-2 focus:outline-none focus:border-verde-deg-1"
					/>
				</div>

				<div>
					<input
						type="tel"
						name="phone"
						placeholder="Teléfono"
						value={formData.phone}
						onChange={handleChange}
						required
						className="w-full border-b-2 border-verde-claro py-2 focus:outline-none focus:border-verde-deg-1"
					/>
				</div>

				<div>
					<textarea
						rows="3"
						name="message"
						placeholder="Mensaje"
						value={formData.message}
						onChange={handleChange}
						required
						className="w-full border-b-2 border-verde-claro py-2 focus:outline-none focus:border-verde-deg-1 resize-none"
					></textarea>
				</div>

				{/* Mensaje visible */}
				{message.text && (
					<div
						className={`mt-2 text-sm text-center font-medium ${
							message.type === 'success'
								? 'text-green-600'
								: 'text-red-600'
						}`}
					>
						{message.text}
					</div>
				)}

				{/* Mensaje oculto para HTML / SEO */}
				{message.text && (
					<p className="hidden" aria-hidden="true">
						{message.text}
					</p>
				)}

				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full bg-linear-to-r from-crema-deg-1 from-0% to-verde-deg-2 hover:to-verde-deg-1 cursor-pointer text-white py-3 font-semibold transition-colors mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{isSubmitting ? 'Enviando...' : 'Enviar'}
				</button>
			</form>
		</div>
	);
}
