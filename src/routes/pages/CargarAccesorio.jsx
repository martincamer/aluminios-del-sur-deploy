import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const CargarAccesorio = () => {
	const [codigo, setCodigo] = useState('');
	const [nombre, setNombre] = useState('');
	const [color, setColor] = useState('');
	const [cantidad, setCantidad] = useState(0);
	const [precio, setPrecio] = useState(0);
	const [categoria, setCategoria] = useState('');
	const [error, setError] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();

		if ([codigo, nombre, color, cantidad, categoria, precio].includes('')) {
			setError(true);
		} else {
			axios.post(`${import.meta.env.VITE_API_URL}/accesorios`, {
				data: {
					codigo: codigo,
					nombre: nombre,
					color: color,
					cantidad: cantidad,
					precio: precio,
					categoria: categoria,
				},
			});

			navigate('/accesorios');
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
					<h3 className="text-white text-xl">Nuevo Accesorio</h3>
				</div>

				{error && (
					<div className="bg-red-500 text-white p-4 rounded-lg text-center font-bold">
						¡Todos los campos son obligatorios!
					</div>
				)}

				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-3 w-full">
						<label className="font-semibold text-normal text-white">
							Codigo:
						</label>
						<input
							value={codigo}
							onChange={e => setCodigo(e.target.value)}
							type="text"
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							placeholder="Escribir Codigo"
						/>
					</div>
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
							Color:
						</label>
						<select
							value={color}
							onChange={e => setColor(e.target.value)}
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							placeholder="Escribir categoria"
						>
							<option value="">SELECCIONAR</option>
							<option value={'blanco brillante'}>blanco brillante</option>
							<option value={'blanco ibera'}>blanco ibera</option>
							<option value={'negro'}>negro</option>
							<option value={'plateado'}>plateado</option>
							<option value={'ninguno'}>ninguno</option>
						</select>
					</div>
					<div className="flex flex-col gap-3 w-full">
						<label className="font-semibold text-normal text-white">
							Cantidad:
						</label>
						<input
							value={cantidad}
							onChange={e => setCantidad(e.target.value)}
							type="number"
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							placeholder="Escribir cantidad de paquetes,etc"
						/>
					</div>
					<div className="flex flex-col gap-3 w-full">
						<label className="font-semibold text-normal text-white">
							Precio:
						</label>
						<input
							value={precio}
							onChange={e => setPrecio(e.target.value)}
							type="number"
							step="0.01"
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							placeholder="Escribir el precio del paquete, etc"
						/>
					</div>
					<div className="flex flex-col gap-3 w-full">
						<label className="font-semibold text-normal text-white">
							Categoria:
						</label>
						<select
							value={categoria}
							onChange={e => setCategoria(e.target.value)}
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							placeholder="Escribir categoria"
						>
							<option value="">SELECCIONAR</option>
							<option value={'tornillos'}>tornillos</option>
							<option value={'bisagras'}>bisagras</option>
							<option value={'burletes'}>burletes</option>
							<option value={'cierres'}>cierres</option>
							<option value={'escuadras'}>escuadras</option>
							<option value={'fallebas'}>fallebas</option>
							<option value={'felpas'}>felpas</option>
							<option value={'mecanismos'}>mecanismos</option>
							<option value={'pasadores'}>pasadores</option>
							<option value={'picaportes'}>picaportes</option>
							<option value={'plasticos'}>plasticos</option>
							<option value={'rodamientos'}>rodamientos</option>
							<option value={'selladores'}>selladores</option>
							<option value={'placas'}>placas</option>
						</select>
					</div>
				</div>
				<input
					type="submit"
					className="bg-green-600 text-white rounded-xl py-3 px-6 cursor-pointer outline-none text-center"
					value={'CARGAR PERFIL'}
				/>
			</form>
		</div>
	);
};
