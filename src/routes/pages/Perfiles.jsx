import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SideBar } from "../../components/SideBar";
import { Link } from "react-router-dom";
import axios from "axios";

export const Perfiles = () => {
  const [datos, setDatos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/perfiles?pagination[start]=0&pagination[limit]=1000`
        );
        setDatos(res.data.data);
        console.log(datos);
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, []);

  //buscar perfil

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  let resultado = [];

  if (!search) {
    resultado = datos;
  } else {
    resultado = datos.filter(
      (dato) =>
        dato.attributes.codigo.toLowerCase().includes(search.toLowerCase()) ||
        dato.attributes.nombre.toLowerCase().includes(search.toLowerCase())
    );
  }

  //delete perfil

  const handleDelete = (id) => {
    try {
      axios.delete(`${import.meta.env.VITE_API_URL}/perfiles/${id}`);
      toast.error("Perfil eliminado correctamente!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full max-h-full min-h-full">
      <ToastContainer />
      <SideBar />
      <div className="px-6 flex flex-col gap-8">
        <div className="flex flex-wrap gap-5 px-6">
          <Link
            to={"/perfiles/herrero"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            PERFILES HERRERO
          </Link>
          <Link
            to={"/perfiles/modena"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            PERFILES MODENA
          </Link>
          <Link
            to={"/perfiles/modena-a30"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            PERFILES MODENA A-30
          </Link>
          <input
            value={search}
            onChange={searcher}
            type="text"
            className="rounded-lg border-[1px]  border-gray-300 px-2 py-2 w-1/2 text-black placeholder:text-gray-400 outline-none shadow-md shadow-black/10"
            placeholder="Buscar perfil..."
          />
        </div>
        <div className="w-full grid grid-cols-4 gap-5 h-[60vh] overflow-y-scroll scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-200 px-6">
          {resultado.length ? (
            resultado?.map((perfil) => (
              <div
                key={perfil.id}
                className="bg-gray-200 p-5 rounded-lg shadow-black/20 shadow-lg space-y-2 h-[250px] w-full max-h-full flex flex-col justify-center "
              >
                <p className="capitalize">
                  <span className="font-bold text-black capitalize">
                    CODIGO:
                  </span>{" "}
                  {perfil.attributes.codigo}
                </p>
                <p className="capitalize">
                  <span className="font-bold text-black">NOMBRE:</span>{" "}
                  {perfil.attributes.nombre}
                </p>
                <p className="capitalize">
                  <span className="font-bold text-black">COLOR:</span>{" "}
                  {perfil.attributes.colores}
                </p>
                <p>
                  <span className="font-bold text-black">CANTIDAD BARRAS:</span>{" "}
                  {perfil.attributes.cantidad}
                </p>
                <p className="capitalize">
                  <span className="font-bold text-black">CATEGORIA:</span>{" "}
                  {perfil.attributes.categoria}
                </p>
                <div className="flex justify-between gap-2">
                  <Link
                    to={`/editar-perfil/${perfil.id}`}
                    className="bg-primary text-white p-2 rounded-lg text-sm cursor-pointer w-full text-center"
                  >
                    Editar
                  </Link>
                  <input
                    onClick={() => handleDelete(perfil.id)}
                    type="submit"
                    value={"Borrar"}
                    className="bg-red-500 text-white p-2 rounded-lg text-sm cursor-pointer w-full text-center"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex justify-center">
              <span className="text-red-500 font-bold text-lg w-full">
                No se encuentra ningun perfil con ese nombre.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
