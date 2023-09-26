import { Link } from "react-router-dom";
import { SideBar } from "../../components/SideBar";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export const ClientesAccesorio = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/clientes-accesorios`
        );
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
      axios.delete(`${import.meta.env.VITE_API_URL}/clientes-accesorios/${id}`);
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

  return (
    <div className="flex h-full max-h-full min-h-full">
      <SideBar />
      <ToastContainer />
      <div className="p-5 w-full flex">
        <table className="w-full">
          <thead>
            <tr>
              <div className="w-full">
                <th className="text-sm border-gray-900 border-2 py-2 px-6">
                  Nombre - Cliente
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-6">
                  Total a Pagar
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-6">
                  Total Accesorios Comprados
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-6">
                  Zona - Localidad
                </th>
                <th className="text-sm border-gray-900 border-2 py-2 px-6">
                  Campos de edición
                </th>

                {datos.map((i) => (
                  <tr
                    key={i.id}
                    className="bg-primary border-2 border-gray-900"
                  >
                    <th className="text-xs p-2 text-white">
                      {i.attributes.nombre} {i.attributes.apellido}
                    </th>
                    <th className="text-xs p-2 text-white">
                      ${i.attributes.total_pagar.toLocaleString("arg")}
                    </th>
                    <th className="text-xs p-2 text-white">
                      {i.attributes.total_accesorios}
                    </th>

                    <th className="text-xs p-2 text-white">
                      {i.attributes.localidad}
                    </th>
                    <div className="py-2 px-2 flex gap-2 items-center justify-center">
                      <input
                        onClick={() => handleDelete(i.id)}
                        type="submit"
                        value={"Eliminar Cliente"}
                        className="bg-red-500 text-white p-2 rounded-lg text-sm cursor-pointer"
                      />
                      <Link
                        to={`/facturar-accesorio/${i.id}`}
                        className="bg-orange-400 text-white p-2 rounded-lg text-sm cursor-pointer"
                      >
                        Facturar Accesorio
                      </Link>
                    </div>
                  </tr>
                ))}
              </div>
            </tr>
          </thead>
        </table>
        <div className="w-1/6 py-4">
          <Link
            className="bg-primary text-white rounded-lg px-4 py-4"
            to={"/nuevo-cliente-accesorio"}
          >
            Nuevo Cliente
          </Link>
        </div>
      </div>
    </div>
  );
};
