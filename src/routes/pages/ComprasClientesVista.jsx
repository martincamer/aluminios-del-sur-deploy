import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SideBar } from "../../components/SideBar";
import { ToastContainer, toast } from "react-toastify";
import { AiFillCloseCircle } from "react-icons/ai";

export const ComprasClientesVista = () => {
  const [cliente, setCliente] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);

  const params = useParams();
  console.log(params);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/clientes?populate=*&filters[apellido]=${params.apellido}`
        );
        setCliente(res.data.data);
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
          }/estadisticas?populate=*&filters[apellido]=${params.apellido}`
        );
        setEstadisticas(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, []);
  console.log(estadisticas);
  console.log(cliente);
  //   console.log(datos);

  const fecha_actual = estadisticas[0]?.attributes.createdAt;
  const fechaCreada = new Date(fecha_actual);
  const fechaFormateada = fechaCreada.toLocaleDateString("es-BO", {
    timeZone: "UTC",
  });

  const handleDelete = (id) => {
    try {
      axios.delete(`${import.meta.env.VITE_API_URL}/estadisticas/${id}`);

      toast.error("Eliminado correctamente!", {
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
    <section className="flex flex-row w-full max-w-full">
      <SideBar />
      <ToastContainer />
      <div className="w-[1220px] mx-auto max-md:w-full flex flex-col gap-10">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-4xl font-bold">
            Cliente{" "}
            <span className="underline font-extrabold">
              {cliente[0]?.attributes.nombre} {cliente[0]?.attributes.apellido}
            </span>
          </h1>
          <div>
            <p className="text-primary font-semibold text-xl">
              Perfil creado el día:{" "}
              <span className="text-black font-extrabold">
                {new Date(cliente[0]?.attributes.createdAt).toLocaleDateString(
                  "arg"
                )}
              </span>
            </p>
          </div>
          <div>
            <p className="text-primary font-semibold text-xl">
              Localidad-Zona{" "}
              <span className="text-black font-extrabold">
                {cliente[0]?.attributes.localidad}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {estadisticas.length ? (
            estadisticas.map((i) => (
              <>
                <div>
                  <p className="font-semibold">
                    Fecha de la compra al cliente:{" "}
                    <span className="font-bold text-primary bg-gray-200 py-2 px-2 shadow-lg shadow-black/10 rounded">
                      {/* {fechaActual.toLocaleDateString("arg-EG", opciones)} */}
                      {fechaFormateada}
                    </span>{" "}
                  </p>
                </div>
                <table key={i.id} className="w-full relative">
                  <thead className="flex gap-4">
                    <tr>
                      <div className="w-full">
                        <th className="text-sm border-gray-900 border-2 py-2 px-[3px]">
                          Numero
                        </th>
                        <th className="text-sm border-gray-900 border-2 py-2 px-[3px]">
                          Fecha de la compra
                        </th>
                        <th className="text-sm border-gray-900 border-2 py-2 px-[3px]">
                          Total de kilos comprados
                        </th>
                        <th className="text-sm border-gray-900 border-2 py-2 px-[3px]">
                          Total Facturado
                        </th>
                        <tr className="bg-primary border-2 border-gray-900">
                          <th className="text-xs p-2 border-r-[2px] border-black text-white">
                            {i?.id}
                          </th>
                          <th className="text-xs p-2 border-r-[2px] border-black text-white">
                            {fechaFormateada}
                          </th>
                          <th className="text-xs p-2 border-r-[2px] border-black text-white">
                            {i?.attributes.total_kilos}
                          </th>
                          <th className="text-xs p-2 border-r-[2px] border-black text-white">
                            $
                            {i?.attributes.total_precio_final.toLocaleString(
                              "arg"
                            )}
                          </th>
                        </tr>
                      </div>
                    </tr>
                    <tr>
                      <div className="w-full">
                        <th className="text-sm border-gray-900 border-2 py-2 px-[3px]">
                          codigo
                        </th>
                        <th className="text-sm border-gray-900 border-2 py-2 px-[3px]">
                          color{" "}
                        </th>
                        <th className="text-sm border-gray-900 border-2 py-2 px-[3px]">
                          barras{" "}
                        </th>
                        <th className="text-sm border-gray-900 border-2 py-2 px-[3px]">
                          kg
                        </th>
                        {i.attributes.datos_perfiles.map((p) => (
                          <tr
                            key={p.kg}
                            className="bg-primary border-2 border-gray-900"
                          >
                            <th className="text-xs p-2 border-r-[2px] border-black text-white uppercase">
                              {p.codigo}
                            </th>
                            <th className="text-xs p-2 border-r-[2px] border-black text-white">
                              {p.color}
                            </th>
                            <th className="text-xs p-2 border-r-[2px] border-black text-white">
                              {p.barras}
                            </th>
                            <th className="text-xs p-2 border-r-[2px] border-black text-white">
                              {p.kg} kg
                            </th>
                          </tr>
                        ))}
                      </div>
                    </tr>
                  </thead>
                  <div
                    onClick={() => handleDelete(i.id)}
                    className="absolute top-0 right-40 bg-red-500 py-2 px-6 rounded text-white font-bold uppercase cursor-pointer flex gap-5 hover:translate-x-1 hover:shadow-md hover:shadow-black/20 transition-all ease-in-out"
                  >
                    Eliminar <AiFillCloseCircle className="text-2xl none" />
                  </div>
                </table>
              </>
            ))
          ) : (
            <div>
              <span className="text-xl font-semibold text-red-500">
                No hay nada facturado por ahora.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
