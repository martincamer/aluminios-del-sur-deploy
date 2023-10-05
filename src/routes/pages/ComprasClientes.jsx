import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { SideBar } from "../../components/SideBar";
import { Link } from "react-router-dom";
import axios from "axios";

export const ComprasClientes = () => {
  const [datos, setDatos] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/clientes?pagination[start]=0&pagination[limit]=1000`
        );
        setDatos(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/estadisticas?pagination[start]=0&pagination[limit]=1000`
        );
        setEstadisticas(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, []);
  console.log(estadisticas);

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
    <div className="flex h-full max-h-full min-h-full">
      <SideBar />
      <ToastContainer />
      <div className="p-5 w-full flex flex-col gap-5 overflow-y-scroll scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-200 h-[70vh] mx-2">
        <div>
          <h2 className="text-4xl font-semibold text-primary underline">
            Compras realizadas{" "}
            <span className="font-extrabold">Clientes - Perfiles.</span>
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
          <thead className="w-full">
            <tr>
              <div className="w-full">
                <th className="text-sm border-gray-900 border-2 py-2 px-2 w-1/4">
                  Numero
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-4 w-1/3">
                  Nombre - Cliente
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-4 w-1/4">
                  Zona - Localidad
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-4">
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
                    <th className="text-xs p-2 border-r-[2px] border-black text-white">
                      {i.attributes.nombre} {i.attributes.apellido}
                    </th>
                    <th className="text-xs p-2 text-white border-r-[2px] border-black">
                      {i.attributes.localidad}
                    </th>
                    <th className="border-r-[2px] border-black">
                      <div className="py-2 px-2 flex gap-2 items-center justify-center">
                        <Link
                          to={`/compras-clientes/${i.attributes.apellido}`}
                          className="bg-orange-400 text-white p-2 rounded-lg text-sm cursor-pointer"
                        >
                          Ver compras realizadas
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
    </div>
  );
};
