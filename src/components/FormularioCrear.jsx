export const FormularioCrear = ({
	handleSubmit,
	error,
	handleModal,
	codigo,
	color,
	categoria,
	cantidad,
	kilos,
	slug,
	setCodigo,
	setColor,
	setCategoria,
	setCantidad,
	setKilos,
	setSlug,
}) => {
	return (
		<div className="absolute top-[40%] left-[35%] flex flex-col gap-2 bg-secondary py-4 px-2 rounded-lg transition-all ease-in-out duration-500">
			<div
				onClick={() => handleModal()}
				className="text-black font-bold text-[19px] px-4 flex justify-end cursor-pointer"
			>
				X
			</div>

			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-3"
			>
				{error && (
					<div className="bg-red-500 text-white p-4 rounded-lg text-center font-bold">
						¡Todos los campos son obligatorios!
					</div>
				)}

				<div>
					<label
						className="text-black font-bold text-sm"
						htmlFor=""
					>
						Codigo:{' '}
					</label>
					<input
						value={codigo}
						onChange={e => setCodigo(e.target.value)}
						// {...register('codigo', { required: true })}
						// value={cantidad}
						type="text"
						className="text-sm text-primary font-bold capitalize"
					/>
				</div>
				<div>
					<label
						className="text-black font-bold text-sm"
						htmlFor=""
					>
						Color:{' '}
					</label>
					<input
						value={color}
						onChange={e => setColor(e.target.value)}
						// {...register('color', { required: true })}
						// value={cantidad}
						// onChange={e => setCantidad(e.target.value)}
						type="text"
						className="text-sm text-primary font-bold capitalize"
					/>
				</div>
				<div>
					<label
						className="text-black font-bold text-sm"
						htmlFor=""
					>
						Categoria:{' '}
					</label>
					<input
						value={categoria}
						onChange={e => setCategoria(e.target.value)}
						// {...register('categoria', { required: true })}
						// value={cantidad}
						// onChange={e => setCantidad(e.target.value)}
						type="text"
						className="text-sm text-primary font-bold capitalize"
					/>
				</div>
				<div>
					<label
						className="text-black font-bold text-sm"
						htmlFor=""
					>
						ID:{' '}
					</label>
					<input
						value={slug}
						onChange={e => setSlug(e.target.value)}
						// {...register('slug', { required: true })}
						// value={cantidad}
						// onChange={e => setCantidad(e.target.value)}
						type="number"
						className="text-sm text-primary font-bold capitalize"
					/>
				</div>
				<div>
					<input
						value={cantidad}
						onChange={e => setCantidad(e.target.value)}
						// {...register('cantidad', { required: true })}
						// value={cantidad}
						// onChange={e => setCantidad(e.target.value)}
						type="number"
						placeholder="Cantidad de barras"
						className="text-sm rounded-lg p-2 text-black placeholder:text-black/50 outline-none w-full"
					/>
				</div>

				<div>
					<input
						value={kilos}
						onChange={e => setKilos(e.target.value)}
						// {...register('kilos', { required: true })}
						// value={kilos}
						// onChange={e => setKilos(e.target.value)}
						type="number"
						placeholder="Cantidad de kilos"
						className="text-sm rounded-lg p-2 text-black placeholder:text-black/50 outline-none w-full"
					/>
				</div>

				<div>
					<input
						type="submit"
						className="bg-black p-2 rounded-lg text-center outline-none cursor-pointer w-full"
						value={'Crear Cantidad'}
					/>
				</div>
			</form>
		</div>
	);
};
