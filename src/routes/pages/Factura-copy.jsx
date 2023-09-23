import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { CardSeleccionPerfil } from '../../components/CardSeleccionPerfil';
import { BuscadorPerfilSeleccionar } from '../../components/BuscadorPerfilSeleccionar';

export const Facturar = () => {
	const [seleccionar, setSeleccionar] = useState(false);
	const [perfil, setPerfil] = useState([]);
	const [datos, setDatos] = useState([]);
	const [perfilCargado, setPerfilCargado] = useState([]);
	const [cantidad, setCantidad] = useState(0);
	const [kilos, setKilos] = useState(0);
	const [error, setError] = useState(false);
	const [search, setSearch] = useState([]);
	const [obtenerId, setObtenerId] = useState(null);
	const [modal, setModal] = useState(false);
	const [perfilSeleccionado, setPerfilSeleccionado] = useState([]);

	const params = useParams();

	//buscar perfil

	const searcher = e => {
		setSearch(e.target.value);
	};

	let resultado = [];

	if (!search) {
		resultado = perfil;
	} else {
		resultado = perfil.filter(dato =>
			dato.attributes.codigo.toLowerCase().includes(search)
		);
	}

	//Obtener api metodo get clientes
	useEffect(() => {
		async function data() {
			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}/clientes?populate=*&filters[id]=${
					params.id
				}`
			);

			setValue(
				'total_kilos_herrero',
				res.data.data[0].attributes.total_kilos_herrero
			);
			setValue(
				'total_kilos_modena',
				res.data.data[0].attributes.total_kilos_modena
			);
			setValue('precio_herrero', res.data.data[0].attributes.precio_herrero);
			setValue('precio_modena', res.data.data[0].attributes.precio_modena);
			setDatos(res.data.data);
		}

		data();
	}, []);

	//Obtener get perfiles
	useEffect(() => {
		async function load() {
			const res = await axios.get(`${import.meta.env.VITE_API_URL}/perfiles`);
			setPerfil(res.data.data);
		}

		load();
	}, []);

	//obtener get id especifica
	useEffect(() => {
		async function load() {
			if (!obtenerId) return;

			try {
				const respuesta = await axios.get(
					`${
						import.meta.env.VITE_API_URL
					}/perfiles?populate=*&filters[id]=${obtenerId}`
				);
				setPerfilSeleccionado(respuesta.data.data);
			} catch (error) {
				console.log(error);
			}
		}
		load();
	}, [obtenerId]);

	//agregar un perfil seleccionado

	const addToPerfil = (id, codigo, colores) => {
		const newItem = [{ id, codigo, colores, cantidad, kilos }];

		const cantidadTotal = perfilSeleccionado?.map(c => c.attributes.cantidad);

		if (cantidad > cantidadTotal[0]) {
			setError(true);
			setTimeout(() => {
				setError(false);
			}, 2000);
		} else {
			handleModal(false);
			setSeleccionar(false);
			setPerfilCargado([...perfilCargado, newItem]);
		}
	};

	//reseterar un perfil seleccionado

	const addToResetPerfil = id => {
		const newPerfil = perfilCargado.filter(item => {
			return item[0].id !== id;
		});
		setPerfilCargado(newPerfil);
	};

	const totalBarras = () => {
		return perfilCargado.reduce((sum, c) => {
			return sum + Number(c[0].cantidad);
		}, 0);
	};

	totalBarras(perfilCargado);

	const handleModal = () => {
		setModal(!modal);
	};

	const handlePerfilSeleccionadoId = id => {
		setObtenerId(id);
	};

	//Actualizar put clientes enviar datos
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const onSubmit = handleSubmit(
		async ({
			barras,
			kilos,
			total_pagar,
			total_kilos_herrero,
			total_kilos_modena,
			precio_herrero,
			precio_modena,
		}) => {
			axios.put(`${import.meta.env.VITE_API_URL}/clientes/${params.id}`, {
				data: {
					total_kilos_herrero: total_kilos_herrero,
					total_kilos_modena: total_kilos_modena,
					precio_herrero: precio_herrero,
					precio_modena: precio_modena,
					kilos: (kilos = total_kilos_herrero + total_kilos_modena),
					total_pagar: (total_pagar =
						total_kilos_herrero * precio_herrero +
						total_kilos_modena * precio_modena),
					barras: totalBarras(),
				},
			});

			location.reload();
		}
	);

	return (
		<div className="py-[150px] px-4">
			<div className="absolute top-28 left-10">
				<Link
					to={'/clientes'}
					className="underline text-primary font-semibold"
				>
					Volver al clientes
				</Link>
			</div>
			<form
				onSubmit={onSubmit}
				className="bg-primary p-10 rounded-lg w-1/2 mx-auto shadow-lg shadow-black/20 space-y-6"
			>
				<div className="flex justify-center">
					<h3 className="text-white text-xl">
						Cargar Pago - Facturación Cliente{' '}
						<span className="font-semibold underline">{'Leonardo Impal'}</span>
					</h3>
				</div>

				<div className="flex gap-3 items-center">
					<label className="font-semibold text-normal text-white">
						Cliente:
					</label>
					<div className="px-10 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-50">
						{datos[0]?.attributes.nombre} {datos[0]?.attributes.apellido}
					</div>
				</div>

				<div className="flex gap-3 items-center">
					<label className="font-semibold text-normal text-white">
						Localidad:
					</label>
					<div className="px-10 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-50">
						{datos[0]?.attributes.localidad}
					</div>
				</div>

				<div className="flex flex-col gap-5">
					<div className="flex gap-3 items-center relative">
						<label className="font-semibold text-normal text-white">
							Cantidad de barras:
						</label>
						<input
							onClick={() => setSeleccionar(!seleccionar)}
							type="text"
							className="px-0 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-auto"
							value={'Seleccionar'}
						/>
						<div
							className={
								!seleccionar
									? 'hidden'
									: `bg-white shadow-lg shadow-black/30 p-10 rounded-xl absolute w-full flex flex-col space-y-5`
							}
						>
							<div
								onClick={() => setSeleccionar(!seleccionar)}
								className="absolute top-0 right-0 p-5 text-2xl font-bold cursor-pointer"
							>
								X
							</div>

							<div>
								<BuscadorPerfilSeleccionar
									search={search}
									searcher={searcher}
								/>
							</div>

							<div className="flex flex-wrap gap-4 overflow-y-scroll h-[300px]">
								{resultado.map(p => (
									<CardSeleccionPerfil
										key={p.id}
										p={p}
										handleModal={handleModal}
										handlePerfilSeleccionadoId={handlePerfilSeleccionadoId}
									/>
								))}
								{modal && (
									<div className="absolute top-[40%] left-[35%] flex flex-col gap-2 bg-secondary py-4 px-2 rounded-lg transition-all ease-in-out duration-500">
										<div
											onClick={() => handleModal()}
											className="text-black font-bold text-[19px] px-4 flex justify-end cursor-pointer"
										>
											X
										</div>

										{error ? (
											<span className="bg-red-500 text-xs p-1 rounded-lg text-center">
												No tienes suficiente stock
											</span>
										) : (
											''
										)}

										<div>
											<p className="text-primary font-semibold capitalize">
												<span className="text-black font-bold capitalize">
													Codigo:{' '}
												</span>
												{perfilSeleccionado[0]?.attributes.codigo}
											</p>
										</div>
										<div>
											<p className="text-primary font-semibold capitalize">
												<span className="text-black font-bold capitalize">
													Colores:{' '}
												</span>
												{perfilSeleccionado[0]?.attributes.colores}
											</p>
										</div>
										<div>
											<p className="text-primary font-semibold capitalize">
												<span className="text-black font-bold capitalize">
													Categoria:{' '}
												</span>{' '}
												{perfilSeleccionado[0]?.attributes.categoria}
											</p>
										</div>

										<form className="flex flex-col gap-3">
											<input
												value={cantidad}
												onChange={e => setCantidad(e.target.value)}
												type="number"
												placeholder="Cantidad de barras"
												className="text-sm rounded-lg p-2 text-black placeholder:text-black/50 outline-none"
											/>

											<input
												value={kilos}
												onChange={e => setKilos(e.target.value)}
												type="number"
												placeholder="Cantidad de kilos"
												className="text-sm rounded-lg p-2 text-black placeholder:text-black/50 outline-none"
											/>

											<input
												className="bg-black text-white p-2 rounded-lg text-center outline-none cursor-pointer text-sm"
												value={'Enviar Perfil'}
												onClick={() =>
													addToPerfil(
														perfilSeleccionado[0]?.id,
														perfilSeleccionado[0]?.attributes.codigo,
														perfilSeleccionado[0]?.attributes.colores,
														cantidad,
														kilos
													)
												}
											/>
										</form>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="bg-white p-4 rounded-lg flex flex-wrap items-center justify-center gap-3">
						{perfilCargado.map(p => (
							<div
								key={p[0].id}
								className="bg-primary rounded-full flex p-2 gap-1"
							>
								<span className="capitalize text-primary bg-white p-2 rounded-full">
									{p[0].cantidad} brs
								</span>
								<span className="capitalizetext-primary bg-white p-2 rounded-full">
									cod: {p[0].codigo}
								</span>
								<span className="capitalize text-primary bg-white p-2 rounded-full">
									{p[0].kilos} kg
								</span>
								<span className="capitalize text-primary bg-white p-2 rounded-full">
									{p[0].colores}
								</span>

								<input
									className="bg-red-500 px-3 py-2 text-white rounded-full w-[50px] text-sm text-center outline-none cursor-pointer"
									value={'X'}
									onClick={() => addToResetPerfil(p[0].id)}
								/>
							</div>
						))}
					</div>
				</div>

				<div className="flex gap-3 items-center">
					<label className="font-semibold text-normal text-white">
						Total de kilos herrero:
					</label>
					<input
						{...register('total_kilos_herrero', { required: true })}
						type="text"
						className="px-0 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-auto"
					/>
				</div>
				<div className="flex gap-3 items-center">
					<label className="font-semibold text-normal text-white">
						Total de kilos modena:
					</label>
					<input
						{...register('total_kilos_modena', { required: true })}
						type="text"
						className="px-0 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-auto"
					/>
				</div>
				<div className="flex gap-3 items-center">
					<label className="font-semibold text-normal text-white">
						Total de barra perfiles:
					</label>
					<div className="px-0 text-center rounded-full bg-white w-[200px] py-3">
						{totalBarras()}
					</div>
				</div>

				<div className="flex gap-3 items-center">
					<label className="font-semibold text-normal text-white">
						Precio de kilo herrero:
					</label>
					<input
						{...register('precio_herrero', { required: true })}
						type="number"
						className="px-0 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-auto"
					/>
				</div>
				<div className="flex gap-3 items-center">
					<label className="font-semibold text-normal text-white">
						Precio de kilo modena:
					</label>
					<input
						{...register('precio_modena', { required: true })}
						type="number"
						className="px-0 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-auto"
					/>
				</div>
				<div className="flex gap-3 items-center">
					<label className="font-semibold text-normal text-white">
						Total a pagar:
					</label>

					<div className="text-white bg-green-600 py-2 px-5 rounded-xl text-xl">
						$ {datos[0]?.attributes.total_pagar.toLocaleString('arg')}
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<div className="flex gap-3">
						<input
							type="submit"
							className="px-0 py-3 text-center rounded-xl bg-orange-500 cursor-pointer text-white  outline-none placeholder:text-black/50 w-full"
							value={'ENVIAR'}
						/>
					</div>
					<div className="flex gap-3">
						<input
							type="submit"
							className="px-0 py-3 text-center rounded-xl bg-green-600 cursor-pointer text-white  outline-none placeholder:text-black/50 w-full"
							// value={'FACTURAR'}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
