import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const NuevoCliente = () => {
	const [nombre, setNombre] = useState('');
	const [apellido, setApellido] = useState('');
	const [localidad, setLocalidad] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [total_pagar, setTotalPagar] = useState(0);
	const [barras, setBarras] = useState(0);
	const [kilos, setKilos] = useState(0);
	const [error, setError] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();

		if ([nombre, apellido, localidad].includes('')) {
			setError(true);
		} else {
			axios.post(`${import.meta.env.VITE_API_URL}/clientes`, {
				data: {
					nombre: nombre,
					apellido: apellido,
					localidad: localidad,
					total_pagar: total_pagar,
					barras: barras,
					kilos: kilos,
					descripcion: descripcion,
				},
			});

			navigate('/clientes');
		}
	};

	return (
		<div className="py-[150px] px-4">
			<div className="absolute top-28 left-10">
				<Link
					to={'/home'}
					className="underline text-primary font-semibold"
				>
					Volver al inicio
				</Link>
			</div>
			<form
				onSubmit={handleSubmit}
				className="bg-primary p-10 rounded-lg w-1/2 mx-auto shadow-lg shadow-black/20 space-y-6"
			>
				<div className="flex justify-center">
					<h3 className="text-white text-xl">Nuevo Cliente</h3>
				</div>

				{error && (
					<div className="bg-red-500 text-white p-4 rounded-lg text-center font-bold">
						¡Todos los campos son obligatorios!
					</div>
				)}

				<div className="flex gap-2 ">
					<div className="flex flex-col gap-3 w-full">
						<label className="font-semibold text-normal text-white">
							Nombre:
						</label>
						<input
							value={nombre}
							onChange={e => setNombre(e.target.value)}
							type="text"
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							placeholder="Escribir nombre"
						/>
					</div>
					<div className="flex flex-col gap-3 w-full">
						<label className="font-semibold text-normal text-white">
							Apellido:
						</label>
						<input
							value={apellido}
							onChange={e => setApellido(e.target.value)}
							type="text"
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							placeholder="Escribir apellido"
						/>
					</div>
				</div>
				<div className="flex gap-2 ">
					<div className="flex flex-col gap-3 w-full">
						<label className="font-semibold text-normal text-white">
							Total a pagar:
						</label>
						<input
							value={total_pagar}
							onChange={e => setTotalPagar(e.target.value)}
							type="number"
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							placeholder="Escribir la cantidad a pagar"
						/>
					</div>
					<div className="flex flex-col gap-3 w-full">
						<label className="font-semibold text-normal text-white">
							Barras en total:
						</label>
						<input
							value={barras}
							onChange={e => setBarras(e.target.value)}
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							placeholder="Escribir algo sobre el total de barras..."
						/>
					</div>
				</div>
				<div className="flex gap-2 ">
					<div className="flex flex-col gap-3 w-full">
						<label className="font-semibold text-normal text-white">
							Localidad:
						</label>
						<input
							value={localidad}
							onChange={e => setLocalidad(e.target.value)}
							type="text"
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							placeholder="Escribir localidad"
						/>
					</div>
					<div className="flex flex-col gap-3 w-full">
						<label className="font-semibold text-normal text-white">
							Total de kilos:
						</label>
						<input
							type="number"
							value={kilos}
							onChange={e => setKilos(e.target.value)}
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							placeholder="Escribir algo sobre el total de kilos..."
						/>
					</div>
				</div>
				<div>
					<div className="flex flex-col gap-3 w-full">
						<label className="font-semibold text-normal text-white">
							Descripcion:
						</label>
						<textarea
							value={descripcion}
							onChange={e => setDescripcion(e.target.value)}
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							placeholder="Escribir algo sobre el..."
						/>
					</div>
				</div>
				<input
					type="submit"
					className="bg-green-600 text-white rounded-xl py-3 px-6 cursor-pointer outline-none"
					value={'CARGAR CLIENTE NUEVO'}
				/>
			</form>
		</div>
	);
};
