import React, { useEffect, useState } from 'react';
import { SideBar } from '../../components/SideBar';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export const EditarEstadoCliente = () => {
	const [estadoCliente, setEstadoCliente] = useState([]);
	const [pago, setPago] = useState(false);
	const [error, setError] = useState(false);
	// const [cantidad, setCantidad] = useState(0);

	const navigate = useNavigate();

	const params = useParams();

	console.log(params);

	useEffect(() => {
		async function loadData() {
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_API_URL}/clientes/${params.id}`
				);
				setEstadoCliente(res.data.data);

				setValue('nombre', res.data.data.attributes.nombre);
				setValue('pago_confirmado', res.data.data.attributes.pago_confirmado);
				setValue('fecha_pago', res.data.data.attributes.fecha_pago);
				setValue('entrega', res.data.data.attributes.entrega);
				// setValue('cantidad_entrega', res.data.data.attributes.cantidad_entrega);
			} catch (error) {
				console.log(error);
			}
		}
		loadData();
	}, []);

	console.log(estadoCliente);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const onSubmit = handleSubmit(
		async ({
			entrega,
			pago_confirmado,
			total_pagar,
			fecha_pago,
			// cantidad_entrega,
		}) => {
			if (entrega > estadoCliente.attributes.total_pagar) {
				setError(true);
			} else {
				setError(false);
				axios.put(`${import.meta.env.VITE_API_URL}/clientes/${params.id}`, {
					data: {
						total_pagar: (total_pagar =
							estadoCliente.attributes.total_pagar - entrega),
						// cantidad_entrega: cantidad_entrega,
						entrega: entrega,
						pago_confirmado: (pago_confirmado = pago),
						fecha_pago: fecha_pago,
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
					navigate('/estado-clientes');
				}, 1500);
			}
		}
	);

	// function totalEntregaCantidad() {
	// 	return Array.isArray(datos).reduce((sum, s) => {
	// 		return sum + Number(s.attributes.cantidad_entrega);
	// 	}, 0);
	// }
	// // const totalEntrega = () => {
	// // 	return datos.reduce((sum, e) => {
	// // 		return sum + Number(e.attributes.entrega);
	// // 	}, 0);
	// // };
	// console.log(totalEntregaCantidad());

	return (
		<div className="flex h-full max-h-full min-h-full">
			<SideBar />
			<ToastContainer />
			<div className="p-5 w-full flex flex-col gap-12">
				<div>
					<h2 className="text-4xl font-semibold text-primary underline">
						Editar el estado del Cliente{' '}
						<span className="font-extrabold">
							{estadoCliente?.attributes?.nombre}.
						</span>
					</h2>
				</div>
				<div className="w-full flex justify-center">
					<form
						className="bg-gray-300 rounded-lg shadow-lg shadow-black/20 p-4 w-1/3 flex flex-col gap-4"
						onSubmit={onSubmit}
					>
						{error && (
							<span className="text-sm bg-red-500 text-center text-white p-2 rounded-lg shadow-md shadow-black/10">
								Selecciona una cantidad menor a $
								{estadoCliente?.attributes?.total_pagar.toLocaleString('arg')}
							</span>
						)}
						{/* <div className="flex flex-col gap-3 w-full">
							{errors.nombre && (
								<span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
									el nombre es requerido
								</span>
							)}
							<label className="font-semibold text-normal text-black uppercase">
								Nombre:
							</label>
							<input
								{...register('nombre', { required: true })}
								type="text"
								className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
								placeholder="Escribir nombre"
							/>
						</div> */}
						<div className="flex flex-col gap-3 w-full">
							{errors.entrega && (
								<span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
									la entrega es necesaria
								</span>
							)}
							<label className="font-semibold text-normal text-black uppercase">
								Entrega del cliente:
							</label>
							<input
								{...register('entrega', { required: true })}
								type="number"
								step="0.001"
								className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
								placeholder="Entrega total"
							/>
						</div>
						<div className="flex flex-col gap-3 w-full">
							{errors.fecha && (
								<span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
									la fecha es requerida
								</span>
							)}
							<label className="font-semibold text-normal text-black uppercase">
								Fecha de la entrega del cliente
							</label>
							<input
								{...register('fecha_pago', { required: true })}
								type="date"
								className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
							/>
						</div>
						<div className="flex flex-col gap-3 w-full">
							<label className="font-semibold text-normal text-black uppercase">
								Confirmar Pago:
							</label>
							<input
								onClick={() => setPago(!pago)}
								{...register('pago_confirmado', { required: true })}
								type="button"
								value={pago ? 'Pago Relizado' : 'Pendiente'}
								className={`${
									pago ? 'bg-green-500' : 'bg-red-500'
								} px-6 py-3 rounded-lg outline-none text-white placeholder:text-black/60 w-auto cursor-pointer`}
								placeholder="Entrega total"
							/>
						</div>
						<div className="flex flex-col gap-3 w-full">
							<input
								type="submit"
								value={'Enviar Datos'}
								className="px-6 py-3 rounded-lg bg-primary text-white hover:scale-[1.02] uppercase hover:shadow-md hover:shadow-black/20 transition-all ease-in-out cursor-pointer outline-none placeholder:text-black/60 w-auto"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
