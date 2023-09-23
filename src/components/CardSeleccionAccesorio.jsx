export const CardSeleccionAccesorio = ({
	a,
	handleModal,
	handlePerfilSeleccionadoId,
}) => {
	return (
		<div
			key={a?.id}
			className="flex flex-col justify-center  gap-2 bg-primary p-2 w-[200px] text-white capitalize rounded-lg h-[210px]"
		>
			<span>codigo: {a?.attributes.codigo}</span>
			<span>color: {a?.attributes.color}</span>
			<span>nombre: {a?.attributes.nombre}</span>
			<span>categoria: {a?.attributes.categoria}</span>

			<div
				onClick={() => {
					handleModal(), handlePerfilSeleccionadoId(a.id);
				}}
				className="bg-black p-1 rounded-lg cursor-pointer hover:bg-black/80"
			>
				Seleccionar Cantidad
			</div>
		</div>
	);
};
