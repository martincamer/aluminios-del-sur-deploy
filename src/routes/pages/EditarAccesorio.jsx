// import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const EditarAccesorio = () => {
	const params = useParams();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const onSubmit = handleSubmit(
		async ({ codigo, nombre, color, cantidad, categoria, precio }) => {
			axios.put(`${import.meta.env.VITE_API_URL}/accesorios/${params.id}`, {
				data: {
					codigo: codigo,
					nombre: nombre,
					color: color,
					cantidad: cantidad,
					categoria: categoria,
					precio: precio,
				},
			});

			toast.success('El cambio fue realizado satisfactoriamente!', {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});

			setTimeout(() => {
				navigate('/accesorios');
			}, 1500);
		}
	);

	useEffect(() => {
		async function data() {
			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}/accesorios?populate=*&filters[id]=${
					params.id
				}`
			);

			setValue('codigo', res.data.data[0].attributes.codigo);
			setValue('nombre', res.data.data[0].attributes.nombre);
			setValue('color', res.data.data[0].attributes.color);
			setValue('cantidad', res.data.data[0].attributes.cantidad);
			setValue('categoria', res.data.data[0].attributes.categoria);
			setValue('precio', res.data.data[0].attributes.precio);

			// setDatosPerfil(res.data.data);
		}

		data();
	}, []);

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

			<ToastContainer />

			<form
				onSubmit={onSubmit}
				className="bg-primary p-10 rounded-lg w-1/2 mx-auto shadow-lg shadow-black/20 space-y-6"
			>
				<div className="flex justify-center">
					<h3 className="text-white text-xl">Editar Perfil</h3>
				</div>

				{/* {error && (
					<div className="bg-red-500 text-white p-4 rounded-lg text-center font-bold">
						¡Todos los campos son obligatorios!
					</div>
				)} */}

				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-3 w-full">
						{errors.codigo && (
							<span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
								el codigo es requerido
							</span>
						)}
						<label className="font-semibold text-normal text-white">
							Codigo:
						</label>
						<input
							{...register('codigo', { required: true })}
							type="text"
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							placeholder="Escribir Codigo"
						/>
					</div>
					<div className="flex flex-col gap-3 w-full">
						{errors.nombre && (
							<span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
								el nombre es requerido
							</span>
						)}
						<label className="font-semibold text-normal text-white">
							Nombre:
						</label>
						<input
							{...register('nombre', { required: true })}
							type="text"
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							placeholder="Escribir nombre"
						/>
					</div>
					<div className="flex flex-col gap-3 w-full">
						{errors.color && (
							<span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
								el color es requerido
							</span>
						)}
						<label className="font-semibold text-normal text-white">
							Color:
						</label>
						<input
							{...register('color', { required: true })}
							type="text"
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							placeholder="Escribir color"
						/>
					</div>
					<div className="flex flex-col gap-3 w-full">
						{errors.cantidad && (
							<span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
								la cantidad es requerida
							</span>
						)}
						<label className="font-semibold text-normal text-white">
							Cantidad Total de Paquetes - Accesorios:
						</label>
						<input
							{...register('cantidad', { required: true })}
							type="number"
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							placeholder="Escribir cantidad de tornillos, etc"
						/>
					</div>
					<div className="flex flex-col gap-3 w-full">
						{errors.precio && (
							<span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
								el precio es requerido
							</span>
						)}
						<label className="font-semibold text-normal text-white">
							Precio total:
						</label>
						<input
							{...register('precio', { required: true })}
							step="0.01"
							type="number"
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							placeholder="Escribir cantidad de paquetes"
						/>
					</div>
					<div className="flex flex-col gap-3 w-full">
						{errors.categoria && (
							<span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
								la categoria es requerida
							</span>
						)}
						<label className="font-semibold text-normal text-white">
							Categoria:
						</label>
						<select
							{...register('categoria', { required: true })}
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
					className="bg-green-600 text-white rounded-xl py-3 px-6 cursor-pointer outline-none text-center w-full"
					value={'EDITAR PERFIL'}
				/>
			</form>
		</div>
	);
};
