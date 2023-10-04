import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const EditarCliente = () => {
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = handleSubmit(async ({ nombre, apellido, localidad }) => {
    axios.put(`${import.meta.env.VITE_API_URL}/clientes/${params.id}`, {
      data: {
        nombre: nombre,
        apellido: apellido,
        localidad: localidad,
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
      navigate("/clientes");
    }, 1500);
  });

  useEffect(() => {
    async function data() {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/clientes?populate=*&filters[id]=${
          params.id
        }`
      );

      setValue("nombre", res.data.data[0].attributes.nombre.trim());
      setValue("apellido", res.data.data[0].attributes.apellido.trim());
      setValue("localidad", res.data.data[0].attributes.localidad.trim());
      // setDatosPerfil(res.data.data);
    }

    data();
  }, []);

  return (
    <div className="py-[150px] px-4">
      <ToastContainer />
      <div className="absolute top-28 left-10">
        <Link to={"/home"} className="underline text-primary font-semibold">
          Volver al inicio
        </Link>
      </div>
      <form
        onSubmit={onSubmit}
        className="bg-primary p-10 rounded-lg w-1/3 mx-auto shadow-lg shadow-black/20 space-y-6"
      >
        <div className="flex justify-center">
          <h3 className="text-white text-xl">Editar el Cliente</h3>
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
            {...register("nombre", {
              required: true,
              minLength: 1,
            })}
            type="text"
            className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
            placeholder="Escribir nombre"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          {errors.apellido && (
            <span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
              el apellido es requerido
            </span>
          )}
          <label className="font-semibold text-normal text-white">
            Apellido:
          </label>
          <input
            {...register("apellido", { required: true })}
            type="text"
            className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
            placeholder="Escribir apellido"
          />
        </div>

        <div className="flex gap-2 ">
          <div className="flex flex-col gap-3 w-full">
            {errors.localidad && (
              <span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
                La localidad es requerida
              </span>
            )}
            <label className="font-semibold text-normal text-white">
              Localidad:
            </label>
            <input
              {...register("localidad", { required: true })}
              type="text"
              className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
              placeholder="Escribir localidad"
            />
          </div>
        </div>
        <input
          type="submit"
          className="bg-green-600 text-white rounded-xl py-3 px-6 cursor-pointer outline-none"
          value={"EDITAR CLIENTE NUEVO"}
        />
      </form>
    </div>
  );
};
