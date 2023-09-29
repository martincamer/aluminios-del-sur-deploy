import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const CargarPerfil = () => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [colores, setColores] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([codigo, nombre, colores, cantidad, categoria].includes("")) {
      setError(true);
    } else {
      axios.post(`${import.meta.env.VITE_API_URL}/perfiles`, {
        data: {
          codigo: codigo,
          nombre: nombre,
          colores: colores,
          cantidad: cantidad,
          categoria: categoria,
        },
      });

      toast.success("Perfil cargado correctamente!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setColores("");
      // setTimeout(() => {
      // 	navigate('/perfiles');
      // }, 1500);
    }
  };

  return (
    <div className="py-[150px] px-4">
      <ToastContainer />
      <div className="absolute top-28 left-10">
        <Link to={"/home"} className="underline text-primary font-semibold">
          Volver al inicio
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-primary p-10 rounded-lg w-1/2 mx-auto shadow-lg shadow-black/20 space-y-6"
      >
        <div className="flex justify-center">
          <h3 className="text-white text-xl">Nuevo Perfil</h3>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg text-center font-bold">
            ¡Todos los campos son obligatorios!
          </div>
        )}

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 w-full">
            <label className="font-semibold text-normal text-white">
              Codigo:
            </label>
            <input
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              type="text"
              className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
              placeholder="Escribir Codigo"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="font-semibold text-normal text-white">
              Nombre:
            </label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              type="text"
              className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
              placeholder="Escribir nombre"
            />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <label className="font-semibold text-normal text-white">
              Cantidad de barras:
            </label>
            <input
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              type="number"
              className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
              placeholder="Escribir cantidad de barras"
            />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <label className="font-semibold text-normal text-white">
              Color:
            </label>
            <select
              value={colores}
              onChange={(e) => setColores(e.target.value)}
              className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
              placeholder="Escribir categoria"
            >
              <option value="">SELECCIONAR</option>
              <option value={"brillante tocho aluar"}>
                brillante tocho aluar
              </option>
              <option value={"brillante recuperado"}>
                brillante recuperado
              </option>
              <option value={"blanco ibera"}>blanco ibera</option>
              <option value={"negro"}>negro</option>
              <option value={"bronce"}>bronce</option>
              <option value={"natural"}>natural</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <label className="font-semibold text-normal text-white">
              Categoria:
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
              placeholder="Escribir categoria"
            >
              <option value="">SELECCIONAR</option>
              <option value={"modena"}>modena</option>
              <option value={"modena a-30"}>modena a-30</option>
              <option value={"herrero"}>herrero</option>
            </select>
          </div>
        </div>
        <input
          type="submit"
          className="bg-green-600 text-white rounded-xl py-3 px-6 cursor-pointer outline-none text-center"
          value={"CARGAR PERFIL"}
        />
      </form>
    </div>
  );
};
