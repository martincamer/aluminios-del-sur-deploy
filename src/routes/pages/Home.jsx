import { useEffect, useState } from "react";
import { SideBar } from "../../components/SideBar";
import { ToastContainer } from "react-toastify";
import { BsFillCalendarDateFill } from "react-icons/bs";
import axios from "axios";

export const Home = () => {
  const [usuario, setUsuario] = useState([]);
  const [perfil, setPerfil] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/usuarios`);
      setUsuario(res.data.data);
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadData() {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/perfiles?pagination[start]=0&pagination[limit]=1000`
      );
      setPerfil(res.data.data);
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadData() {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/clientes?pagination[start]=0&pagination[limit]=1000`
      );
      setClientes(res.data.data);
    }

    loadData();
  }, []);

  const totalBarras = () => {
    return perfil.reduce((sum, b) => {
      return sum + Number(b.attributes.cantidad);
    }, 0);
  };

  const totalKgHerrero = () => {
    return perfil.reduce((sum, p) => {
      return (
        sum +
        Number(p.attributes.categoria == "herrero" && p.attributes.cantidad)
      );
    }, 0);
  };

  const totalKgModena = () => {
    return perfil.reduce((sum, p) => {
      return (
        sum +
        Number(p.attributes.categoria == "modena" && p.attributes.cantidad)
      );
    }, 0);
  };
  const totalKgModenaA30 = () => {
    return perfil.reduce((sum, p) => {
      return (
        sum +
        Number(p.attributes.categoria == "modena a-30" && p.attributes.cantidad)
      );
    }, 0);
  };
  const totalPerfilesVendidos = () => {
    return clientes.reduce((sum, p) => {
      return sum + Number(p.attributes.barras_compradas);
    }, 0);
  };

  let mesActual = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
    new Date()
  );

  return (
    <div className="flex">
      <SideBar />
      <ToastContainer />
      <div className="flex w-full items-center gap-20 max-md:py-[150px] max-md:px-6 flex-col">
        <div>
          <p className="text-3xl font-bold text-black">
            Usuario Logeado:{" "}
            <span className="capitalize text-primary font-extrabold">
              @{usuario.map((u) => u.attributes.email)}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-5 items-center bg-gray-200 py-10 px-2 rounded-lg shadow-lg shadow-black/30 w-[400px]">
          <div>
            <h4 className="uppercase font-bold text-primary text-lg text-center flex items-center flex-col gap-2">
              estadísticas del mes{" "}
              <span className="text-green-600 text-2xl flex flex-row gap-4 items-center justify-center">
                <BsFillCalendarDateFill className="text-orange-500 text-3xl" />{" "}
                {mesActual}
              </span>
            </h4>
          </div>
          <div className="flex flex-col h-full items-center space-y-3">
            <div>
              <p className="uppercase font-semibold text-primary text-base">
                TOTAL DE PERFILES EN STOCK:{" "}
                <span className="text-black font-bold">{totalBarras()}</span>
              </p>
            </div>
            <div>
              <p className="uppercase font-semibold text-primary text-base">
                TOTAL DE PERFILES EN HERRERO:{" "}
                <span className="text-black font-bold">{totalKgHerrero()}</span>
              </p>
            </div>
            <div>
              <p className="uppercase font-semibold text-primary text-base">
                TOTAL DE PERFILES EN MODENA:{" "}
                <span className="text-black font-bold">{totalKgModena()}</span>
              </p>
            </div>
            <div>
              <p className="uppercase font-semibold text-primary text-base">
                TOTAL DE PERFILES EN MODENA A-30:{" "}
                <span className="text-black font-bold">
                  {totalKgModenaA30()}
                </span>
              </p>
            </div>
            <div>
              <p className="uppercase font-semibold text-primary text-base">
                TOTAL DE PERFILES VENDIDOS:{" "}
                <span className="text-black font-bold">
                  {totalPerfilesVendidos()}
                </span>
              </p>
            </div>
            <div>
              <p className="uppercase font-semibold text-primary text-base">
                TOTAL DE CLIENTES PERFILES:{" "}
                <span className="text-black font-bold">{clientes.length}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
