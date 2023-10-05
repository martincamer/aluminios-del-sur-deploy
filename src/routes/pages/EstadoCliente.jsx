import React, { useEffect, useState } from "react";
import { SideBar } from "../../components/SideBar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export const EstadoCliente = () => {
  const [datos, setDatos] = useState([]);
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

  const onSubmit = (
    id,
    total_pagar,
    entrega,
    fecha_pago,
    pago_confirmado,
    kilos,
    barras
  ) => {
    try {
      axios.put(`${import.meta.env.VITE_API_URL}/clientes/${id}`, {
        data: {
          total_pagar: 0,
          entrega: 0,
          kilos: 0,
          barras: 0,
          fecha_pago: null,
          pago_confirmado: false,
        },
      });

      toast.error("Reseteado correctamente!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        location.reload();
      }, 1000);
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
    <div className="flex h-full max-h-full min-h-full">
      <SideBar />
      <ToastContainer />
      <div className="p-5 w-full flex flex-col gap-5 overflow-y-scroll scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-200 h-[70vh] mx-2">
        <div>
          <h2 className="text-4xl font-semibold text-primary underline">
            Estado de los{" "}
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
          <thead>
            <tr>
              <div className="w-full">
                <th className="text-sm border-gray-900 border-2 py-2 px-2">
                  Numero
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-4">
                  Nombre - Cliente
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-4">
                  Total a Pagar
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-4">
                  Entrego
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-4">
                  Deuda
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-4">
                  Zona - Localidad
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-4">
                  Fecha de Entrega
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-4">
                  Campos de edición
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-4">
                  Pago Confirmado - No confirmado
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
                    <th className="text-xs p-2 border-r-[2px] border-black text-white">
                      ${i.attributes.total_pagar?.toLocaleString("arg") || 0}
                    </th>
                    <th className="text-xs p-2 border-r-[2px] border-black text-white">
                      ${i.attributes.entrega?.toLocaleString("arg") || 0}
                    </th>
                    <th className="text-xs p-2 border-r-[2px] border-black text-white">
                      ${i.attributes.total_pagar?.toLocaleString("arg") || 0}
                    </th>
                    <th className="text-xs p-2 border-r-[2px] border-black text-white">
                      {i.attributes.localidad}
                    </th>
                    <th className="text-xs p-2 text-white border-r-[2px] border-black">
                      {i.attributes.fecha_pago || "Ninguna"}
                    </th>
                    <th className="border-r-[2px] border-black">
                      <div className="py-2 px-2 flex gap-2 items-center justify-center">
                        <Link
                          to={`/estado-clientes/${i.id}`}
                          className="bg-orange-400 text-white p-2 rounded-lg text-sm cursor-pointer"
                        >
                          Confirmar Pago
                        </Link>
                        <button
                          type="submit"
                          onClick={() => onSubmit(i.id)}
                          className="bg-red-400 text-white p-2 rounded-lg text-sm cursor-pointer"
                        >
                          Resetear
                        </button>
                      </div>
                    </th>
                    <th className="text-xs p-2 text-white">
                      <div className="py-2 px-2 flex gap-2 items-center justify-center">
                        {i.attributes.pago_confirmado ? (
                          <p className="bg-green-500 text-white p-2 rounded-lg text-sm cursor-pointer">
                            Estado Pago Realizado
                          </p>
                        ) : (
                          <p
                            className={`${
                              i.attributes.total_pagar === 0
                                ? "bg-orange-500"
                                : "bg-red-500"
                            } text-white p-2 rounded-lg text-sm cursor-pointer`}
                          >
                            {i.attributes.total_pagar === 0
                              ? "No hay facturado"
                              : "Estado Pendiente"}
                          </p>
                        )}
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
