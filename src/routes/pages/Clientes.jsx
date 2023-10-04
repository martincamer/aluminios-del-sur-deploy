import { Link } from "react-router-dom";
import { SideBar } from "../../components/SideBar";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export const Clientes = () => {
  const [datos, setDatos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/clientes`);
        setDatos(res.data.data);
        // console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, []);

  const handleDelete = (id) => {
    try {
      axios.delete(`${import.meta.env.VITE_API_URL}/clientes/${id}`);

      toast.error("Cliente eliminado correctamente!", {
        position: "top-right",
        autoClose: 2000,
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

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  let resultado = [];

  if (!search) {
    resultado = datos;
  } else {
    resultado = datos.filter(
      (dato) =>
        dato.attributes.apellido.toLowerCase().includes(search.toLowerCase()) ||
        dato.attributes.nombre.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div className="flex h-full max-h-full min-h-full relative">
      <SideBar />
      <ToastContainer />
      <div className="p-5 w-full flex flex-col gap-4 overflow-y-scroll scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-200 h-[70vh] mx-2">
        <div>
          <h2 className="text-4xl font-semibold text-primary underline">
            Clientes Perfiles -{" "}
            <span className="font-extrabold">Facturación</span>
          </h2>
        </div>
        <input
          value={search}
          onChange={searcher}
          type="text"
          className="rounded-lg border-[1px]  border-gray-300 px-2 py-2 w-1/2 text-black placeholder:text-gray-400 outline-none shadow-md shadow-black/10"
          placeholder="Buscar cliente..."
        />
        <table className="w-full">
          <thead>
            <tr>
              <div className="w-full">
                <th className="text-sm border-gray-900 border-2 py-2 px-[3px]">
                  Numero
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-6">
                  Nombre - Cliente
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-6">
                  Total a Pagar
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-6">
                  Total de Barras
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-6">
                  Total de Kilos
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-6">
                  Zona - Localidad
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-6">
                  Campos de edición
                </th>

                {resultado.map((i) => (
                  <tr
                    key={i.id}
                    className="bg-primary border-2 border-gray-900"
                  >
                    <th className="text-xs p-2 border-r-[2px] border-black text-white">
                      {i.id}
                    </th>
                    <th className="text-xs p-2 text-white border-r-[2px] border-black">
                      {i.attributes.nombre} {i.attributes.apellido}
                    </th>
                    <th className="text-xs p-2 text-white border-r-[2px] border-black">
                      ${i.attributes.total_pagar.toLocaleString("arg")}
                    </th>
                    <th className="text-xs p-2 text-white border-r-[2px] border-black">
                      {i.attributes.barras}
                    </th>
                    <th className="text-xs p-2 text-white border-r-[2px] border-black">
                      {/* {i.attributes.total_kilos_herrero +
												i.attributes.total_kilos_modena +
												i.attributes.total_kilos_modena_a30} */}{" "}
                      {i.attributes.kilos}
                    </th>
                    <th className="text-xs p-2 text-white border-r-[2px] border-black">
                      {i.attributes.localidad}
                    </th>
                    <th className="text-xs p-2 text-white">
                      <div className="py-2 px-2 flex gap-2 items-center justify-center">
                        <input
                          onClick={() => handleDelete(i.id)}
                          type="submit"
                          value={"Eliminar Cliente"}
                          className="bg-red-500 text-white p-2 rounded-lg text-sm cursor-pointer"
                        />
                        <Link
                          to={`/facturar-cliente/${i.id}`}
                          className="bg-orange-400 text-white p-2 rounded-lg text-sm cursor-pointer"
                        >
                          Facturar Perfiles
                        </Link>
                        <Link
                          to={`/facturar-cliente-presupuesto/${i.id}`}
                          className="bg-green-500 text-white p-2 rounded-lg text-sm cursor-pointer"
                        >
                          Presupuesto
                        </Link>
                        <Link
                          to={`/editar-cliente-perfiles/${i.id}`}
                          className="bg-sky-500 text-white p-2 rounded-lg text-sm cursor-pointer"
                        >
                          Editar Cliente
                        </Link>
                      </div>
                    </th>
                  </tr>
                ))}
              </div>
            </tr>
          </thead>
        </table>
      </div>
      <div className="fixed top-[50%] right-10 py-4">
        <Link
          className="bg-green-600 text-white rounded-lg px-4 py-4 shadow-lg shadow-black/50"
          to={"/nuevo-cliente"}
        >
          Nuevo Cliente
        </Link>
      </div>
    </div>
  );
};
