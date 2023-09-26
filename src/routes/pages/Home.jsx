import { useEffect, useState } from "react";
import { SideBar } from "../../components/SideBar";
import { ToastContainer } from "react-toastify";
import axios from "axios";

export const Home = () => {
  const [usuario, setUsuario] = useState([]);
  const [perfil, setPerfil] = useState([]);
  const [perfilCargado, setPerfilCargado] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/usuarios`);
      console.log(res.data.data);
      setUsuario(res.data.data);
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadData() {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/perfiles`);
      console.log(res.data.data);
      setPerfil(res.data.data);
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadData() {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/perfils`);
      console.log(res.data.data);
      setPerfilCargado(res.data.data);
    }

    loadData();
  }, []);
  useEffect(() => {
    async function loadData() {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/clientes`);
      console.log(res.data.data);
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
    return perfilCargado.reduce((sum, p) => {
      return sum + Number(p.attributes.barras);
    }, 0);
  };

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

        <div className="flex flex-col gap-5 items-center bg-gray-200 py-4 px-2 rounded-lg shadow-lg shadow-black/30 w-[400px] h-[300px]">
          <div>
            <h4 className="uppercase font-bold text-primary text-lg">
              estadísticas del mes {new Date().toLocaleDateString()}
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
