import { useEffect, useState } from "react";
import { SideBar } from "../../components/SideBar";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export const CategoriaAccesorios = () => {
  const [datos, setDatos] = useState([]);
  const [search, setSearch] = useState("");

  const params = useParams();
  console.log(params);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/accesorios?pagination[start]=0&pagination[limit]=1000`
        );
        setDatos(res.data.data);
        // console.log(res.data.data);
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
      axios.delete(`${import.meta.env.VITE_API_URL}/accesorios/${id}`);
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
      <SideBar />
      <ToastContainer />
      <div className="px-6 flex flex-col gap-8">
        <div className="flex flex-wrap gap-5 px-6">
          <Link
            to={"/accesorios/tornillos"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            TORNILLOS
          </Link>
          <Link
            to={"/accesorios/bisagras"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            BISAGRAS
          </Link>
          <Link
            to={"/accesorios/burletes"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            BURLETES
          </Link>
          <Link
            to={"/accesorios/cierres"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            CIERRES
          </Link>
          <Link
            to={"/accesorios/escuadras"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            ESCUADRAS
          </Link>
          <Link
            to={"/accesorios/fallebas"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            FALLEBAS
          </Link>
          <Link
            to={"/accesorios/felpas"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            FELPAS
          </Link>
          <Link
            to={"/accesorios/mecanismos"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            MECANISMOS
          </Link>
          <Link
            to={"/accesorios/pasadores"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            PASADORES
          </Link>
          <Link
            to={"/accesorios/picaportes"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            PICAPORTES
          </Link>
          <Link
            to={"/accesorios/plasticos"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            PLASTICOS
          </Link>
          <Link
            to={"/accesorios/rodamientos"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            RODAMIENTOS
          </Link>
          <Link
            to={"/accesorios/selladores"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            SELLADORES
          </Link>
          <Link
            to={"/accesorios/placas"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            PLACAS
          </Link>
          <Link
            to={"/accesorios"}
            className="font-semibold bg-primary text-white p-2 rounded-lg"
          >
            TODOS LOS ACCESORIOS
          </Link>
          <input
            value={search}
            onChange={searcher}
            type="text"
            className="rounded-lg border-[1px] border-gray-300 px-2 py-2 w-1/2 text-black placeholder:text-gray-400 outline-none shadow-md shadow-black/10"
            placeholder="Buscar accesorio..."
          />
        </div>
        <div className="w-full grid grid-cols-4 gap-5 h-[60vh] overflow-y-scroll scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-200 px-6">
          {resultado.length ? (
            resultado?.map(
              (accesorio) =>
                accesorio.attributes.categoria === params.categoria && (
                  <div
                    key={accesorio.id}
                    className="bg-gray-200 p-5 rounded-lg shadow-black/20 shadow-lg space-y-2 h-[300px] max-h-full flex flex-col justify-center "
                  >
                    <p className="capitalize">
                      <span className="font-bold text-black capitalize">
                        CODIGO:
                      </span>{" "}
                      {accesorio.attributes.codigo}
                    </p>
                    <p className="capitalize">
                      <span className="font-bold text-black">NOMBRE:</span>{" "}
                      {accesorio.attributes.nombre}
                    </p>
                    <p className="capitalize">
                      <span className="font-bold text-black">COLOR:</span>{" "}
                      {accesorio.attributes.color}
                    </p>
                    <p>
                      <span className="font-bold text-black">
                        CANTIDAD DE TORNILLOS:
                      </span>{" "}
                      {accesorio.attributes.cantidad}
                    </p>
                    <p>
                      <span className="font-bold text-black">
                        CANTIDAD DE PAQUETES:
                      </span>{" "}
                      {accesorio.attributes.cantidad_paquetes}
                    </p>
                    <p className="capitalize">
                      <span className="font-bold text-black">CATEGORIA:</span>{" "}
                      {accesorio.attributes.categoria}
                    </p>
                    <div className="flex justify-between gap-2">
                      <Link
                        to={`/editar-accesorio/${accesorio.id}`}
                        className="bg-primary text-white p-2 rounded-lg text-sm cursor-pointer w-full text-center"
                      >
                        Editar
                      </Link>
                      <input
                        onClick={() => handleDelete(accesorio.id)}
                        type="submit"
                        value={"Borrar"}
                        className="bg-red-500 text-white p-2 rounded-lg text-sm cursor-pointer w-full text-center"
                      />
                    </div>
                  </div>
                )
            )
          ) : (
            <div className="w-full flex justify-center">
              <span className="text-red-500 font-bold text-lg w-full">
                No se encuentra ningun accesorio con ese nombre.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
