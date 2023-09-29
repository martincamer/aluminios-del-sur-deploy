// import useFetch from '../../hooks/useFetch';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export const EditarPerfil = () => {
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = handleSubmit(
    async ({ codigo, nombre, colores, cantidad, categoria }) => {
      axios.put(`${import.meta.env.VITE_API_URL}/perfiles/${params.id}`, {
        data: {
          codigo: codigo,
          nombre: nombre,
          colores: colores,
          cantidad: cantidad,
          categoria: categoria,
        },
      });

      toast.success("El cambio fue realizado satisfactoriamente!", {
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
        navigate("/perfiles");
      }, 1500);
    }
  );

  useEffect(() => {
    async function data() {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/perfiles?populate=*&filters[id]=${
          params.id
        }`
      );

      setValue("codigo", res.data.data[0].attributes.codigo);
      setValue("nombre", res.data.data[0].attributes.nombre);
      setValue("colores", res.data.data[0].attributes.colores);
      setValue("cantidad", res.data.data[0].attributes.cantidad);
      setValue("categoria", res.data.data[0].attributes.categoria);

      // setDatosPerfil(res.data.data);
    }

    data();
  }, []);

  return (
    <div className="py-[150px] px-4">
      <div className="absolute top-28 left-10">
        <Link to={"/home"} className="underline text-primary font-semibold">
          Volver al inicio
        </Link>
      </div>
      <ToastContainer />

      <form
        onSubmit={onSubmit}
        className="bg-primary p-10 rounded-lg w-1/2 mx-auto shadow-lg shadow-black/20 space-y-6"
      >
        <div className="flex justify-center">
          <h3 className="text-white text-xl">Editar Perfil</h3>
        </div>

        {/* {error && (
					<div className="bg-red-500 text-white p-4 rounded-lg text-center font-bold">
						¡Todos los campos son obligatorios!
					</div>
				)} */}

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 w-full">
            {errors.codigo && (
              <span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
                el codigo es requerido
              </span>
            )}
            <label className="font-semibold text-normal text-white">
              Codigo:
            </label>
            <input
              {...register("codigo", { required: true })}
              type="text"
              className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
              placeholder="Escribir Codigo"
              // value={codigo}
              // onChange={e => setCodigo(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            {errors.nombre && (
              <span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
                el nombre es requerido
              </span>
            )}
            <label className="font-semibold text-normal text-white">
              Nombre:
            </label>
            <input
              {...register("nombre", { required: true })}
              // value={nombre}
              // onChange={e => setNombre(e.target.value)}
              type="text"
              className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
              placeholder="Escribir nombre"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            {errors.colores && (
              <span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
                El color es necesario
              </span>
            )}
            <label className="font-semibold text-normal text-white">
              Selecciona el color:
            </label>
            <select
              {...register("colores", { required: true })}
              className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
              placeholder="Escribir categoria"
            >
              <option value="" disabled>
                SELECCIONAR
              </option>
              <option value={"brillante tocho aluar"}>
                brillante tocho aluar
              </option>
              <option value={"brillante recuperado"}>
                brillante recuperado
              </option>
              <option value={"blanco ibera"}>blanco ibera</option>
              <option value={"negro"}>negro</option>
              <option value={"bronce"}>bronce</option>
            </select>
          </div>
          <div className="flex flex-col gap-3 w-full">
            {errors.cantidad && (
              <span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
                la cantidad de barras es requerido
              </span>
            )}
            <label className="font-semibold text-normal text-white">
              Cantidad de barras:
            </label>
            <input
              {...register("cantidad", { required: true })}
              // value={cantidad}
              // onChange={e => setCantidad(e.target.value)}
              type="number"
              min="0"
              pattern="^[0-9]+"
              className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
              placeholder="Escribir cantidad de barras"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            {errors.categoria && (
              <span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
                la categoria del perfil es requerido
              </span>
            )}
            <label className="font-semibold text-normal text-white">
              Categoria:
            </label>
            <select
              {...register("categoria", { required: true })}
              // value={categoria}
              // onChange={e => setCategoria(e.target.value)}
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
          className="bg-green-600 text-white rounded-xl py-3 px-6 cursor-pointer outline-none text-center w-full"
          value={"EDITAR PERFIL"}
        />
      </form>
    </div>
  );
};
