export const CardSeleccionPerfil = ({
  p,
  handleModal,
  handlePerfilSeleccionadoId,
  setSeleccionar,
}) => {
  return (
    <div
      key={p.id}
      className="flex flex-col justify-center  gap-2 bg-primary p-2 w-full text-white capitalize rounded-lg min-h-auto max-h-[155px] shadow-md shadow-black/40"
    >
      <span className="max-md:text-xs">codigo: {p.attributes.codigo}</span>
      <span className="max-md:text-xs">color: {p.attributes.colores}</span>
      <span className="max-md:text-xs">
        categoria: {p.attributes.categoria}
      </span>

      <div
        onClick={() => {
          handleModal(), handlePerfilSeleccionadoId(p.id);
        }}
        className="bg-black p-1 rounded-lg cursor-pointer hover:bg-black/80 max-md:text-xs text-center"
      >
        Seleccionar Cantidad
      </div>
    </div>
  );
};
