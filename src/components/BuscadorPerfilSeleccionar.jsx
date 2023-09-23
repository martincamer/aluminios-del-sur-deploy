export const BuscadorPerfilSeleccionar = ({ search, searcher }) => {
	return (
		<input
			value={search}
			onChange={searcher}
			type="text"
			placeholder="buscar perfil..."
			className="border-[1px] border-gray-300 rounded-lg px-5 py-2 w-full outline-none max-md:text-sm"
		/>
	);
};
