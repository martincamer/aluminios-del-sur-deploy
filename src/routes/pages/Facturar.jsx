import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { CardSeleccionPerfil } from "../../components/CardSeleccionPerfil";
import { BuscadorPerfilSeleccionar } from "../../components/BuscadorPerfilSeleccionar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfPerfil } from "../../components/PdfPerfil";
import axios from "axios";
import "jspdf-autotable";

export const Facturar = () => {
  const [seleccionar, setSeleccionar] = useState(false);
  const [perfil, setPerfil] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState([]);
  const [obtenerId, setObtenerId] = useState(null);
  const [modal, setModal] = useState(false);
  const [editarModal, setEditarModal] = useState(false);
  const [perfilSeleccionado, setPerfilSeleccionado] = useState([]);
  const [clienteId, setClienteId] = useState([]);
  const [perfilId, setPerfilId] = useState([]);
  const [editarPerfil, setEditarPerfil] = useState([]);

  const params = useParams();

  //buscar perfil
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  let resultado = [];

  if (!search) {
    resultado = perfil;
  } else {
    resultado = perfil.filter(
      (dato) =>
        dato.attributes.codigo.toLowerCase().includes(search) ||
        dato.attributes.nombre.toLowerCase().includes(search.toLowerCase())
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    // getValues,
  } = useForm();

  //Obtener api metodo get clientes
  useEffect(() => {
    async function data() {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/clientes?populate=*&filters[id]=${
          params.id
        }`
      );

      setValue(
        "precio_herrero",
        res.data.data[0].attributes.precio_herrero || 0
      );
      setValue("precio_modena", res.data.data[0].attributes.precio_modena || 0);
      setValue(
        "precio_modena_a30",
        res.data.data[0].attributes.precio_modena_a30 || 0
      );
      setValue(
        "cliente",
        res.data.data[0].attributes.nombre || "No se encontro el cliente"
      );
      setValue(
        "fecha_pago",
        res.data.data[0].attributes.fecha_pago || "2017-06-01"
      );
      setClienteId(res.data.data);
    }

    data();
  }, [obtenerId]);

  useEffect(() => {
    async function load() {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/perfils?populate=*&filters[cliente]=${
          clienteId[0]?.attributes.nombre
        }`
      );
      setPerfilId(res.data.data);
    }

    load();
  }, [clienteId]);

  //Obtener get perfiles
  useEffect(() => {
    async function load() {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/perfiles?pagination[start]=0&pagination[limit]=1000`
      );
      setPerfil(res.data.data);
    }

    load();
  }, []);

  //obtener get id especifica
  useEffect(() => {
    async function load() {
      if (!obtenerId) return;

      try {
        const respuesta = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/perfiles?populate=*&filters[id]=${obtenerId}`
        );
        setPerfilSeleccionado(respuesta.data.data);

        setValue("codigo", respuesta.data.data[0].attributes.codigo);
        setValue("color", respuesta.data.data[0].attributes.colores);
        setValue("categoria", respuesta.data.data[0].attributes.categoria);
        setValue("slug", respuesta.data.data[0].id);
      } catch (error) {
        console.log(error);
      }
    }
    load();
  }, [obtenerId]);

  useEffect(() => {
    async function load() {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/perfils?populate=*&filters[id]=${obtenerId}`
      );
      setEditarPerfil(res.data.data);

      setValue("codigo", res.data.data[0].attributes.codigo);
      setValue("color", res.data.data[0].attributes.color);
      setValue("categoria", res.data.data[0].attributes.categoria);
      setValue("barras", res.data.data[0].attributes.barras);
      setValue("kg", res.data.data[0].attributes.kg);
      setValue("slug", res.data.data[0].id);
    }

    load();
  }, [obtenerId]);

  const handleModal = () => {
    setModal(!modal);
  };

  const handlePerfilSeleccionadoId = (id) => {
    setObtenerId(id);
  };

  //Actualizar put clientes enviar datos

  const onSubmit = handleSubmit(
    async ({
      barras,
      kilos,
      total_pagar,
      total_kilos_herrero,
      total_kilos_modena,
      total_kilos_modena_a30,
      precio_herrero,
      precio_modena,
      precio_modena_a30,
      fecha_pago,
      barras_compradas,
    }) => {
      axios.put(`${import.meta.env.VITE_API_URL}/clientes/${params.id}`, {
        data: {
          total_kilos_herrero: total_kilos_herrero,
          total_kilos_modena: total_kilos_modena,
          total_kilos_modena_a30: total_kilos_modena_a30,
          precio_herrero: precio_herrero,
          precio_modena: precio_modena,
          kilos: (kilos =
            total_kilos_herrero + total_kilos_modena + total_kilos_modena_a30),
          total_pagar: (total_pagar =
            total_kilos_herrero * precio_herrero +
            total_kilos_modena * precio_modena +
            total_kilos_modena_a30 * precio_modena_a30),
          precio_modena_a30: precio_modena_a30,
          barras: totalBarras(),
          barras_compradas: totalBarrasCompradas() + totalBarras(),
          fecha_pago: fecha_pago,
        },
      });

      toast.success("Enviado correctamente ahora podes facturar!", {
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
    }
  );

  const onCreatePerfilSeleccionado = handleSubmit(
    async ({
      codigo,
      color,
      categoria,
      barras,
      kg,
      slug,
      cliente,
      cantidad,
    }) => {
      if (barras > perfilSeleccionado[0]?.attributes?.cantidad) {
        setTimeout(() => {
          setError(false);
        }, 1400);
        setError(true);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/perfils`, {
          data: {
            codigo: codigo,
            color: color,
            categoria: categoria,
            barras: barras,
            kg: kg,
            slug: slug,
            cliente: cliente,
          },
        });
        await axios.put(
          `${import.meta.env.VITE_API_URL}/perfiles/${obtenerId}`,
          {
            data: {
              cantidad: perfilSeleccionado[0]?.attributes?.cantidad - barras,
            },
          }
        );
        toast.success("Creado satifactoriamente!", {
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
      }
    }
  );

  // console.log(perfilSeleccionarEditar);

  const onEditPerfilSeleccionado = handleSubmit(
    async ({ codigo, color, categoria, barras, kg, slug, cliente }) => {
      await axios.put(`${import.meta.env.VITE_API_URL}/perfils/${obtenerId}`, {
        data: {
          codigo: codigo,
          color: color,
          categoria: categoria,
          barras: barras,
          kg: kg,
          slug: slug,
          cliente: cliente,
        },
      });

      toast.success("Editado satifactoriamente!", {
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
    }
  );

  const handleDelete = (id) => {
    try {
      axios.delete(`${import.meta.env.VITE_API_URL}/perfils/${id}`);

      toast.error("Eliminado correctamente!", {
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

  const totalBarras = () => {
    return perfilId.reduce((sum, b) => {
      return sum + Number(b.attributes.barras);
    }, 0);
  };
  const totalBarrasCompradas = () => {
    return clienteId.reduce((sum, b) => {
      return sum + Number(b.attributes.barras);
    }, 0);
  };

  // console.log(totalBarrasCompradas());
  // console.log(totalBarrasCompradas() + totalBarras());

  const totalKgHerrero = () => {
    return perfilId.reduce((sum, b) => {
      return (
        sum + Number(b.attributes.categoria == "herrero" && b.attributes.kg)
      );
    }, 0);
  };
  const totalKgModena = () => {
    return perfilId.reduce((sum, b) => {
      return (
        sum + Number(b.attributes.categoria == "modena" && b.attributes.kg)
      );
    }, 0);
  };
  const totalKgModenaA30 = () => {
    return perfilId.reduce((sum, b) => {
      return (
        sum + Number(b.attributes.categoria == "modena a-30" && b.attributes.kg)
      );
    }, 0);
  };

  useEffect(() => {
    setValue("total_kilos_herrero", totalKgHerrero());
    setValue("total_kilos_modena", totalKgModena());
    setValue("total_kilos_modena_a30", totalKgModenaA30());
  }, [totalKgHerrero, totalKgModena, totalKgModenaA30]);

  const clickToatFacturar = () => {
    toast.success("Facturado correctamente!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="py-[150px] px-2 max-md:py-[60px]">
      <ToastContainer />
      <div className="absolute top-28 left-10">
        <Link to={"/clientes"} className="underline text-primary font-semibold">
          Volver al clientes
        </Link>
      </div>
      <div className="bg-primary p-10 rounded-lg w-2/3 max-md:w-full mx-auto shadow-2xl shadow-black/30 space-y-6 relative">
        <div className="flex justify-center">
          <h3 className="text-white text-xl max-md:text-sm text-center">
            Cargar Pago - Facturación Cliente{" "}
            <span className="font-semibold underline">
              {clienteId[0]?.attributes.nombre}{" "}
              {clienteId[0]?.attributes.apellido}
            </span>
          </h3>
        </div>

        <div className="flex gap-3 items-center">
          <label className="font-semibold text-normal text-white max-md:text-sm">
            Cliente:
          </label>
          <div className="px-10 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-50 max-md:text-sm max-md:py-2 max-md:px-3">
            {clienteId[0]?.attributes.nombre}{" "}
            {clienteId[0]?.attributes.apellido}
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <label className="font-semibold text-normal text-white max-md:text-sm">
            Localidad:
          </label>
          <div className="px-10 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-50 max-md:text-sm max-md:py-2 max-md:px-3">
            {clienteId[0]?.attributes.localidad}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Cantidad de barras:
            </label>
            <input
              onClick={() => setSeleccionar(!seleccionar)}
              type="text"
              className="px-0 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-auto max-md:text-sm max-md:py-2 max-md:px-3 max-md:w-[110px]"
              value={"Seleccionar"}
            />
            <div
              className={
                !seleccionar
                  ? "hidden"
                  : `bg-white shadow-lg shadow-black/30 p-10 rounded-xl absolute left-[5%] w-[90%] max-md:w-full max-md:left-0 flex flex-col space-y-5`
              }
            >
              <div
                onClick={() => setSeleccionar(!seleccionar)}
                className="absolute top-0 right-0 p-5 text-2xl font-bold cursor-pointer max-md:text-xl hover:text-primary transition-all ease-in-out"
              >
                X
              </div>

              <div>
                <BuscadorPerfilSeleccionar
                  search={search}
                  searcher={searcher}
                />
              </div>

              <div className="max-md:grid-cols-2 grid grid-cols-3 gap-4 h-[300px] max-md:h-[200px] overflow-y-scroll scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-200 px-6">
                {resultado.length ? (
                  resultado.map((p) => (
                    <CardSeleccionPerfil
                      key={p.id}
                      p={p}
                      handleModal={handleModal}
                      handlePerfilSeleccionadoId={handlePerfilSeleccionadoId}
                      setSeleccionar={setSeleccionar}
                    />
                  ))
                ) : (
                  <div className="w-full flex justify-center">
                    <span className="text-red-500 font-bold text-lg w-full">
                      No se encuentra ningun perfil con ese nombre.
                    </span>
                  </div>
                )}
                {modal && (
                  <div className="absolute top-[50%] left-[30%] flex flex-col gap-2 bg-white shadow-xl drop-shadow-2xl shadow-black/50 py-4 px-2 rounded-lg  duration-500 max-md:left-[5%] max-md:w-[90%] max-md:top-[10px]">
                    <div
                      onClick={() => handleModal()}
                      className="text-black font-bold text-[19px] px-4 flex justify-end cursor-pointer hover:text-primary transition-all ease-in-out"
                    >
                      X
                    </div>
                    <form
                      onSubmit={onCreatePerfilSeleccionado}
                      className="flex flex-col gap-3 max-md:gap-1"
                    >
                      {error ? (
                        <span className="bg-red-500 text-sm text-white p-2 rounded-lg text-center max-md:text-xs">
                          Selecciona una cantidad menor de:{" "}
                          {perfilSeleccionado[0].attributes.cantidad}
                        </span>
                      ) : (
                        ""
                      )}

                      <div>
                        <label
                          className='className="text-sm font-bold text-black capitalize max-md:text-sm'
                          htmlFor=""
                        >
                          Codigo:{" "}
                        </label>
                        <input
                          type="text"
                          {...register("codigo", {
                            required: true,
                          })}
                          className="font-bold text-primary capitalize bg-transparent outline-none max-md:text-sm"
                        />
                      </div>
                      <div>
                        <label
                          className='className="text-sm font-bold text-black capitalize max-md:text-sm'
                          htmlFor=""
                        >
                          Color:{" "}
                        </label>
                        <input
                          type="text"
                          {...register("color", {
                            required: true,
                          })}
                          className="font-bold text-primary capitalize bg-transparent outline-none max-md:text-sm"
                        />
                      </div>
                      <div>
                        <label
                          className='className="text-sm font-bold text-black capitalize max-md:text-sm'
                          htmlFor=""
                        >
                          categoria:{" "}
                        </label>
                        <input
                          type="text"
                          {...register("categoria", {
                            required: true,
                          })}
                          className="font-bold text-primary capitalize bg-transparent outline-none max-md:text-sm max-md:w-[60px]"
                        />
                      </div>
                      <div>
                        <label
                          className='className="text-sm font-bold text-black capitalize max-md:text-sm'
                          htmlFor=""
                        >
                          Cliente:{" "}
                        </label>
                        <input
                          type="text"
                          {...register("cliente", {
                            required: true,
                          })}
                          className="font-bold text-primary capitalize bg-transparent outline-none max-md:text-sm"
                        />
                      </div>
                      <div>
                        <label
                          className='className="text-sm font-bold text-black capitalize max-md:text-sm'
                          htmlFor=""
                        >
                          ID:{" "}
                        </label>
                        <input
                          type="number"
                          {...register("slug", {
                            required: true,
                          })}
                          className="font-bold text-primary capitalize bg-transparent outline-none max-md:text-sm"
                        />
                      </div>

                      <input
                        {...register("barras", {
                          required: true,
                        })}
                        // value={cantidad}
                        // onChange={e => setCantidad(e.target.value)}
                        type="number"
                        placeholder="Cantidad de barras"
                        className="text-sm rounded-lg p-2 text-black placeholder:text-gray-900 outline-none bg-gray-200 shadow-md shadow-black/20 max-md:mb-2"
                      />

                      <input
                        {...register("kg", { required: true })}
                        // value={kilos}
                        // onChange={e => setKilos(e.target.value)}
                        type="number"
                        // inputmode="decimal"
                        step="0.001"
                        placeholder="Cantidad de kilos"
                        className="text-sm rounded-lg p-2 text-black placeholder:text-gray-900 outline-none bg-gray-200 shadow-md shadow-black/20 max-md:mb-2"
                      />

                      <input
                        type="submit"
                        className="bg-black text-white p-2 rounded-lg text-center outline-none cursor-pointer text-sm"
                        value={"Enviar Perfil"}
                      />
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>

          {editarModal && (
            <div className="absolute top-[20%] left-[30%] flex flex-col gap-2 bg-white shadow-xl drop-shadow-2xl shadow-black/50 py-4 px-2 rounded-lg  duration-500 max-md:left-[5%] max-md:w-[90%] max-md:top-[10px]">
              <div
                onClick={() => setEditarModal(!editarModal)}
                className="text-black font-bold text-[19px] px-4 flex justify-end cursor-pointer hover:text-primary transition-all ease-in-out"
              >
                X
              </div>
              <form
                onSubmit={onEditPerfilSeleccionado}
                className="flex flex-col gap-3 max-md:gap-1"
              >
                {error ? (
                  <span className="bg-red-500 text-sm text-white p-2 rounded-lg text-center max-md:text-xs">
                    Selecciona una cantidad menor de:{" "}
                    {perfilSeleccionado[0].attributes.cantidad}
                  </span>
                ) : (
                  ""
                )}

                <div>
                  <label
                    className='className="text-sm font-bold text-black capitalize max-md:text-sm'
                    htmlFor=""
                  >
                    Codigo:{" "}
                  </label>
                  <input
                    type="text"
                    {...register("codigo", {
                      required: true,
                    })}
                    className="font-bold text-primary capitalize bg-transparent outline-none max-md:text-sm"
                  />
                </div>
                <div>
                  <label
                    className='className="text-sm font-bold text-black capitalize max-md:text-sm'
                    htmlFor=""
                  >
                    Color:{" "}
                  </label>
                  <input
                    type="text"
                    {...register("color", {
                      required: true,
                    })}
                    className="font-bold text-primary capitalize bg-transparent outline-none max-md:text-sm"
                  />
                </div>
                <div>
                  <label
                    className='className="text-sm font-bold text-black capitalize max-md:text-sm'
                    htmlFor=""
                  >
                    categoria:{" "}
                  </label>
                  <input
                    type="text"
                    {...register("categoria", {
                      required: true,
                    })}
                    className="font-bold text-primary capitalize bg-transparent outline-none max-md:text-sm max-md:w-[60px]"
                  />
                </div>
                <div>
                  <label
                    className='className="text-sm font-bold text-black capitalize max-md:text-sm'
                    htmlFor=""
                  >
                    Cliente:{" "}
                  </label>
                  <input
                    type="text"
                    {...register("cliente", {
                      required: true,
                    })}
                    className="font-bold text-primary capitalize bg-transparent outline-none max-md:text-sm"
                  />
                </div>
                <div>
                  <label
                    className='className="text-sm font-bold text-black capitalize max-md:text-sm'
                    htmlFor=""
                  >
                    ID:{" "}
                  </label>
                  <input
                    type="number"
                    {...register("slug", {
                      required: true,
                    })}
                    className="font-bold text-primary capitalize bg-transparent outline-none max-md:text-sm"
                  />
                </div>

                <input
                  {...register("barras", {
                    required: true,
                  })}
                  type="number"
                  placeholder="Cantidad de barras"
                  className="text-sm rounded-lg p-2 text-black placeholder:text-gray-900 outline-none bg-gray-200 shadow-md shadow-black/20 max-md:mb-2"
                />

                <input
                  {...register("kg", { required: true })}
                  step="0.001"
                  type="number"
                  placeholder="Cantidad de kilos"
                  className="text-sm rounded-lg p-2 text-black placeholder:text-gray-900 outline-none bg-gray-200 shadow-md shadow-black/20 max-md:mb-2"
                />

                <input
                  type="submit"
                  className="bg-black text-white p-2 rounded-lg text-center outline-none cursor-pointer text-sm"
                  value={"Editar Perfil"}
                />
              </form>
            </div>
          )}

          <div className="bg-white p-4 rounded-lg grid grid-cols-3 max-md:grid-cols-1 justify-items-center gap-2 overflow-y-scroll h-[200px]">
            {perfilId.map((p) => (
              <div
                key={p.id}
                className="bg-primary rounded-lg flex justify-between p-4 gap-4 h-[132px] w-full shadow-md shadow-black/30"
              >
                <div className="grid grid-cols-2 max-md:grid-cols-2 items-center justify-center justify-items-center gap-2 w-full">
                  <span className="capitalize text-black bg-white px-1 py-1 justify-center rounded-full text-xs font-semibold w-full flex items-center max-md:text-xs">
                    {p.attributes.barras} brs
                  </span>
                  <span className="capitalizetext-black capitalize gap-[2px] bg-white px-1 py-1 justify-center rounded-full text-xs font-bold w-full flex items-center max-md:text-xs">
                    <span className="text-primary">Cod:</span>{" "}
                    {p.attributes.codigo}
                  </span>
                  <span className="capitalize text-black bg-white px-1 py-1 justify-center rounded-full text-xs font-semibold w-full flex items-center max-md:text-xs">
                    {p.attributes.kg} kg
                  </span>
                  <span className="capitalize text-black bg-white px-1 py-1 justify-center rounded-full text-xs font-semibold w-full flex items-center max-md:text-xs">
                    {p.attributes.color}
                  </span>
                  <span className="capitalize text-black bg-white px-1 py-1 justify-center rounded-full text-xs font-semibold w-full flex items-center max-md:text-xs">
                    {p.attributes.categoria}
                  </span>
                </div>

                <div className="flex flex-col justify-center items-center gap-2">
                  <input
                    className="bg-red-500 px-3 py-2 text-white rounded-full w-[40px] h-[40px] text-sm text-center outline-none cursor-pointer max-md:text-xs"
                    value={"X"}
                    onClick={() => handleDelete(p.id)}
                  />
                  <input
                    className="bg-green-500 px-3 py-2 text-white rounded-full w-[40px] h-[40px] text-sm text-center outline-none cursor-pointer max-md:text-xs"
                    value={"E"}
                    onClick={() => {
                      {
                        handlePerfilSeleccionadoId(p.id),
                          setEditarModal(!editarModal);
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEPARADO */}

        <form onSubmit={onSubmit} className="flex flex-col space-y-6">
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Total de kilos herrero:
            </label>
            <input
              {...register("total_kilos_herrero", { required: true })}
              type="text"
              className="px-0 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-auto max-md:text-sm max-md:w-[100px]"
            />

            {/* <div>{totalKgHerrero()}</div> */}
          </div>
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Total de kilos modena:
            </label>
            <input
              {...register("total_kilos_modena", { required: true })}
              type="text"
              className="px-0 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-auto max-md:text-sm max-md:w-[100px]"
            />
            {/* <div>{totalKgModena()}</div> */}
          </div>
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Total de kilos modena a-30:
            </label>
            <input
              {...register("total_kilos_modena_a30", { required: true })}
              type="text"
              className="px-0 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-auto max-md:text-sm max-md:w-[100px]"
            />
            {/* <div>{totalKgModena()}</div> */}
          </div>
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Total de barra perfiles:
            </label>
            <div className="px-0 text-center rounded-full bg-white w-[200px] py-3 max-md:text-sm max-md:w-[100px]">
              {/* {totalBarras()} */}
              {(clienteId[0]?.attributes.nombre ===
                perfilId[0]?.attributes?.cliente &&
                totalBarras()) ||
                0}
            </div>
          </div>

          <div className="flex gap-3 items-center">
            {errors.precio_herrero && (
              <span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
                la fecha es requerida
              </span>
            )}
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Precio de kilo herrero:
            </label>
            <input
              step="0.01"
              onChange={"precio_herrero"}
              {...register("precio_herrero", { required: true })}
              type="number"
              className="px-0 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-auto max-md:text-sm max-md:w-[100px]"
            />
          </div>
          <div className="flex gap-3 items-center">
            {errors.precio_modena && (
              <span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
                la fecha es requerida
              </span>
            )}
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Precio de kilo modena:
            </label>
            <input
              step="0.01"
              {...register("precio_modena", { required: true })}
              type="number"
              className="px-0 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-auto max-md:text-sm max-md:w-[100px]"
            />
          </div>
          <div className="flex gap-3 items-center">
            {errors.precio_modena_a30 && (
              <span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
                la fecha es requerida
              </span>
            )}
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Precio de kilo modena a-30:
            </label>
            <input
              step="0.01"
              {...register("precio_modena_a30", { required: true })}
              type="number"
              className="px-0 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-auto max-md:text-sm max-md:w-[100px]"
            />
          </div>
          <div className="flex gap-3 items-center">
            {errors.fecha && (
              <span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
                la fecha es requerida
              </span>
            )}
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Seleccionar Fecha:
            </label>
            <input
              {...register("fecha_pago", { required: true })}
              type="date"
              className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
            />
          </div>
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Total a pagar:
            </label>

            <div className="text-white bg-green-600 py-2 px-5 rounded-xl text-xl max-md:text-base font-bold">
              ${clienteId[0]?.attributes.total_pagar.toLocaleString("arg")}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-3 w-full">
              <input
                type="submit"
                className="px-0 py-3 text-center rounded-xl bg-orange-500 cursor-pointer text-white  outline-none placeholder:text-black/50 w-full hover:bg-orange-600 transition-all ease-in-out max-md:text-xs"
                value={"ENVIAR"}
              />
            </div>

            <div className="px-0 py-3 text-center rounded-xl bg-green-600 cursor-pointer text-white  outline-none placeholder:text-black/50 w-full hover:bg-green-700 transition-all ease-in-out max-md:text-xs">
              <PDFDownloadLink
                onClick={() => clickToatFacturar()}
                document={<PdfPerfil clienteId={clienteId} perfil={perfilId} />}
                fileName={`${clienteId[0]?.attributes.nombre}_${clienteId[0]?.attributes.apellido}`}
              >
                FACTURAR
              </PDFDownloadLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
