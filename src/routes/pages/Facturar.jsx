import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { CardSeleccionPerfil } from "../../components/CardSeleccionPerfil";
import { BuscadorPerfilSeleccionar } from "../../components/BuscadorPerfilSeleccionar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfPerfil } from "../../components/PdfPerfil";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import axios from "axios";
import "jspdf-autotable";

export const Facturar = () => {
  const [seleccionar, setSeleccionar] = useState(false);
  const [perfil, setPerfil] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState([]);
  const [obtenerId, setObtenerId] = useState(null);
  const [obtenerPerfilId, setObtenerPerfilId] = useState(null);
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
        "precio_natural",
        res.data.data[0].attributes.precio_natural || 0
      );
      setValue(
        "cliente",
        res.data.data[0].attributes.nombre || "No se encontro el cliente"
      );
      setValue(
        "fecha_pago",
        res.data.data[0].attributes.fecha_pago || "2023-01-01"
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
        }/perfils?populate=*&filters[id]=${obtenerPerfilId}`
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
  }, [obtenerPerfilId]);

  const handleModal = () => {
    setModal(!modal);
  };

  const handlePerfilSeleccionadoId = (id) => {
    setObtenerId(id);
  };

  const handlePerfilSeleccionado = (id) => {
    setObtenerPerfilId(id);
  };

  //Actualizar put clientes enviar datos
  console.log(perfilId);

  const onSubmit = handleSubmit(
    async ({
      barras,
      kilos,
      total_pagar,
      total_kilos_herrero,
      total_kilos_modena,
      total_kilos_modena_a30,
      total_kilos_natural,
      precio_herrero,
      precio_modena,
      precio_modena_a30,
      precio_natural,
      fecha_pago,
      barras_compradas,
      nombre,
      total_kilos,
      apellido,
      total_precio_final,
      datos_perfiles,
      total_barras,
      slug,
    }) => {
      axios.put(`${import.meta.env.VITE_API_URL}/clientes/${params.id}`, {
        data: {
          total_kilos_herrero: total_kilos_herrero,
          total_kilos_modena: total_kilos_modena,
          total_kilos_modena_a30: total_kilos_modena_a30,
          total_kilos_natural: total_kilos_natural,
          precio_herrero: precio_herrero,
          precio_modena: precio_modena,
          precio_modena_a30: precio_modena_a30,
          precio_natural: precio_natural,
          kilos: (kilos =
            total_kilos_herrero +
            total_kilos_modena +
            total_kilos_modena_a30 +
            total_kilos_natural),
          total_pagar: (total_pagar =
            total_kilos_herrero * precio_herrero +
            total_kilos_modena * precio_modena +
            total_kilos_modena_a30 * precio_modena_a30 +
            total_kilos_natural * precio_natural),
          barras: totalBarras(),
          barras_compradas: totalBarrasCompradas() + totalBarras(),
          fecha_pago: fecha_pago,
        },
      });

      axios.post(`${import.meta.env.VITE_API_URL}/estadisticas`, {
        data: {
          nombre: clienteId[0]?.attributes.nombre,
          total_kilos:
            total_kilos_herrero + total_kilos_modena + total_kilos_modena_a30,
          apellido: clienteId[0]?.attributes.apellido,
          total_precio_final:
            total_kilos_herrero * precio_herrero +
            total_kilos_modena * precio_modena +
            total_kilos_modena_a30 * precio_modena_a30,
          slug: clienteId[0].id,
          datos_perfiles: perfilId.map(function (e) {
            return {
              codigo: e.attributes.codigo,
              barras: e.attributes.barras,
              cliente: e.attributes.cliente,
              color: e.attributes.color,
              kg: e.attributes.kg,
              slug: e.attributes.slug,
            };
          }),
          total_barras: totalBarras(),
          // pdf: <PdfPerfil clienteId={clienteId} perfil={perfilId} />,
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

  const onEditPerfilSeleccionado = handleSubmit(
    async ({ codigo, color, categoria, barras, kg, slug, cliente }) => {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/perfils/${obtenerPerfilId}`,
        {
          data: {
            codigo: codigo,
            color: color,
            categoria: categoria,
            barras: barras,
            kg: kg,
            slug: slug,
            cliente: cliente,
          },
        }
      );

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

  const totalKgNatural = () => {
    return perfilId.reduce((sum, b) => {
      return (
        sum + Number(b.attributes.categoria == "natural" && b.attributes.kg)
      );
    }, 0);
  };

  useEffect(() => {
    setValue("total_kilos_herrero", totalKgHerrero());
    setValue("total_kilos_modena", totalKgModena());
    setValue("total_kilos_modena_a30", totalKgModenaA30());
    setValue("total_kilos_natural", totalKgNatural());
  }, [totalKgHerrero, totalKgModena, totalKgModenaA30, totalKgNatural]);

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
          <div className="px-10 py-3 text-center shadow-lg shadow-black/20 font-semibold bg-white outline-none placeholder:text-black/50 w-50 max-md:text-sm max-md:py-2 max-md:px-3">
            {clienteId[0]?.attributes.nombre}{" "}
            {clienteId[0]?.attributes.apellido}
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <label className="font-semibold text-normal text-white max-md:text-sm">
            Localidad:
          </label>
          <div className="px-10 py-3 text-center shadow-lg shadow-black/20 font-semibold bg-white outline-none placeholder:text-black/50 w-50 max-md:text-sm max-md:py-2 max-md:px-3">
            {clienteId[0]?.attributes.localidad}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Selecciona perfil a facturar:
            </label>
            <input
              onClick={() => setSeleccionar(!seleccionar)}
              type="text"
              className="px-0 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-auto max-md:text-sm max-md:py-2 max-md:px-3 max-md:w-[110px] font-semibold cursor-pointer hover:bg-slate-950 hover:text-white hover:translate-x-2 transition-all ease-in-out"
              value={"Seleccionar"}
            />
            <div
              className={
                !seleccionar
                  ? "hidden"
                  : `bg-white shadow-2xl shadow-black/40 p-10 absolute left-3 w-[98%] max-md:w-full flex flex-col space-y-5`
              }
            >
              <div
                onClick={() => setSeleccionar(!seleccionar)}
                className="absolute top-0 right-0 p-3 text-[36px] font-bold cursor-pointer hover:text-primary transition-all ease-in-out"
              >
                <AiFillCloseCircle className="text-black-600" />
              </div>

              <div>
                <BuscadorPerfilSeleccionar
                  search={search}
                  searcher={searcher}
                />
              </div>

              <div className="h-[300px] max-md:h-[200px] overflow-y-scroll scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-200">
                <table className="w-full">
                  <thead className="w-full">
                    <tr className="w-full">
                      <div className="w-full">
                        {resultado.length ? (
                          <>
                            <th className="text-sm border-gray-900 border-2 py-2 px-[3px]">
                              codigo
                            </th>
                            <th className="text-sm border-gray-900 border-2 py-2 px-[3px]">
                              colores
                            </th>
                            <th className="text-sm border-gray-900 border-2 py-2 px-[3px]">
                              categoria
                            </th>
                            <th className="text-sm border-gray-900 border-2 py-2 px-[3px]">
                              Barras en stock
                            </th>
                            <th className="text-sm border-gray-900 border-2 py-2 px-[3px]">
                              Peso neto barra
                            </th>
                            <th className="text-sm border-gray-900 border-2 py-2 px-[3px]">
                              Detalle
                            </th>
                            <th className="text-sm border-gray-900 border-2 py-2 px-[3px]">
                              ID
                            </th>
                            <th className="text-sm border-gray-900 border-2 py-2 px-[3px]">
                              Adjuntar perfil
                            </th>
                          </>
                        ) : (
                          ""
                        )}

                        {resultado.length ? (
                          resultado.map((i) => (
                            <tr
                              key={i.id}
                              className="bg-primary border-2 border-gray-900 w-full"
                            >
                              <th className="text-[13px] p-2 border-r-[2px] border-black text-white">
                                {i.attributes.codigo}
                              </th>
                              <th className="text-[13px] p-2 border-r-[2px] border-black text-white">
                                {i.attributes.colores}
                              </th>
                              <th className="text-[13px] p-2 border-r-[2px] border-black text-white">
                                {i.attributes.categoria}
                              </th>
                              <th className="text-[13px] p-2 border-r-[2px] border-black text-white">
                                {i.attributes.cantidad}
                              </th>
                              <th className="text-[13px] p-2 border-r-[2px] border-black text-white">
                                {i.attributes.kg_estimado_barra} kg
                              </th>
                              <th className="text-[13px] p-2 border-r-[2px] border-black text-white capitalize">
                                {i.attributes.nombre}
                              </th>
                              <th className="text-[13px] p-2 border-r-[2px] border-black text-white capitalize">
                                {i.id}
                              </th>
                              <th className="text-sm p-2 border-r-[2px] border-black text-white">
                                <div
                                  onClick={() => {
                                    handleModal(),
                                      handlePerfilSeleccionadoId(i.id);
                                  }}
                                  className="bg-black px-4 py-2 rounded-lg cursor-pointer hover:bg-black/80 max-md:text-xs text-center"
                                >
                                  Seleccionar perfil
                                </div>
                              </th>
                            </tr>
                          ))
                        ) : (
                          <div className="w-full flex justify-center mt-5">
                            <span className="text-red-500 font-bold text-lg w-full">
                              No se encuentra ningun perfil con ese nombre.
                            </span>
                          </div>
                        )}
                      </div>
                    </tr>
                  </thead>
                </table>
                {modal && (
                  <div className="absolute top-[50%] left-[35%] flex flex-col gap-2 bg-white shadow-2xl drop-shadow-2xl shadow-black/50 py-4 px-2 rounded  duration-500 max-md:left-[5%] max-md:w-[90%] max-md:top-[10px]">
                    <div
                      onClick={() => handleModal()}
                      className="text-black font-bold text-[36px] px-1 flex justify-end cursor-pointer hover:text-primary transition-all ease-in-out"
                    >
                      <AiFillCloseCircle />
                    </div>
                    <form
                      onSubmit={onCreatePerfilSeleccionado}
                      className="flex flex-col gap-3 max-md:gap-1"
                    >
                      <div>
                        <p className="text-sm font-semibold text-center underline">
                          Cargar Perfil para facturar
                        </p>
                      </div>
                      {error ? (
                        <span className="bg-red-500 text-sm text-white p-2 rounded-lg text-center max-md:text-xs">
                          Selecciona una cantidad menor de:{" "}
                          {perfilSeleccionado[0]?.attributes.cantidad}
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
                      <div className="flex gap-2">
                        <label className='className="text-sm font-bold text-black capitalize max-md:text-sm'>
                          Total de barras en stock:{" "}
                        </label>
                        <div className="font-bold text-primary max-md:text-sm">
                          {perfilSeleccionado[0]?.attributes.cantidad}
                        </div>
                      </div>
                      <input
                        {...register("barras", {
                          required: true,
                        })}
                        type="number"
                        placeholder="Selecciona Cantidad de Barras"
                        className="text-sm rounded-lg p-2 text-black placeholder:text-gray-900 outline-none bg-gray-200 shadow-md shadow-black/20 max-md:mb-2"
                      />

                      <input
                        {...register("kg", { required: true })}
                        type="number"
                        step="0.001"
                        placeholder="Selecciona Cantidad de Kilos"
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
                className="text-black font-bold text-[36px] px-1 flex justify-end cursor-pointer hover:text-primary transition-all ease-in-out"
              >
                <AiFillCloseCircle />
              </div>
              <form
                onSubmit={onEditPerfilSeleccionado}
                className="flex flex-col gap-2"
              >
                <div>
                  <p className="text-sm font-semibold text-center underline">
                    Editar Perfil Seleccionado
                  </p>
                </div>
                {error ? (
                  <span className="bg-red-500 text-sm text-white p-2 rounded-lg text-center max-md:text-xs">
                    Selecciona una cantidad menor de:{" "}
                    {perfilSeleccionado[0]?.attributes.cantidad}
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
                <div className="flex gap-2">
                  <label className='className="text-sm font-bold text-black capitalize max-md:text-sm'>
                    Total de barras en stock:{" "}
                  </label>
                  <div className="font-bold text-primary max-md:text-sm">
                    {perfilSeleccionado[0]?.attributes.cantidad}
                  </div>
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
          <div className="bg-white w-full p-4 shadow-lg shadow-black/30 overflow-y-scroll  scrollbar cursor-pointer scrollbar-thumb-gray-900 scrollbar-track-gray-200 h-[300px]">
            <table className="w-full">
              <thead className="w-full">
                <tr className="w-full">
                  <div className="w-full">
                    {perfilId.length ? (
                      <>
                        <th className="text-sm border-gray-900 border-2 py-2 px-[6px] w-[120px]">
                          cantidad
                        </th>
                        <th className="text-sm border-gray-900 border-2 py-2 px-[6px] w-[160px]">
                          codigo
                        </th>
                        <th className="text-sm border-gray-900 border-2 py-2 px-[6px] w-[160px]">
                          kg total
                        </th>
                        <th className="text-sm border-gray-900 border-2 py-2 px-[6px] w-[160px]">
                          colores
                        </th>
                        <th className="text-sm border-gray-900 border-2 py-2 px-[6px] w-[160px]">
                          categoria
                        </th>
                        <th className="text-sm border-gray-900 border-2 py-2 px-[6px] w-[160px]">
                          Eliminar
                        </th>
                        <th className="text-sm border-gray-900 border-2 py-2 px-[6px] w-[160px]">
                          Editar
                        </th>
                      </>
                    ) : (
                      <span className="text-xl font-semibold flex justify-center">
                        No se encuentra cargado nada empieza a facturar.
                      </span>
                    )}
                    {perfilId.map((p) => (
                      <tr
                        key={p.id}
                        className="bg-primary border-2 border-gray-900 w-full"
                      >
                        <th className="text-[13px] px-2 py-3 border-r-[2px] border-black text-white">
                          {p.attributes.barras}
                        </th>
                        <th className="text-[13px] px-2 py-3 border-r-[2px] border-black text-white">
                          {p.attributes.codigo}
                        </th>
                        <th className="text-[13px] px-2 py-3 border-r-[2px] border-black text-white">
                          {" "}
                          {p.attributes.kg} kg
                        </th>
                        <th className="text-[13px] px-2 py-3 border-r-[2px] border-black text-white">
                          {" "}
                          {p.attributes.color}
                        </th>
                        <th className="text-[13px] px-2 py-3 border-r-[2px] border-black text-white">
                          {" "}
                          {p.attributes.categoria}
                        </th>
                        <th className="border-r-[2px] border-black">
                          <div className="flex items-center content-center justify-center h-full">
                            <AiFillCloseCircle
                              className="text-red-400 border-white border-[1px] rounded-full hover:scale-[1.05] hover:text-red-500 transition-all ease-in-out text-3xl"
                              onClick={() => handleDelete(p.id)}
                            />
                          </div>
                        </th>
                        <th className="border-r-[2px] border-black">
                          <div className="flex items-center content-center justify-center h-full">
                            <AiFillEdit
                              className="text-yellow-500 text-3xl hover:scale-[1.05] hover:text-yellow-600 transition-all ease-in-out"
                              onClick={() => {
                                {
                                  handlePerfilSeleccionado(p.id),
                                    setEditarModal(!editarModal);
                                }
                              }}
                            />
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
        {/* SEPARADO */}

        <form onSubmit={onSubmit} className="flex flex-col space-y-6">
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Total de kilos herrero:
            </label>
            <input
              {...register("total_kilos_herrero", { required: true })}
              type="text"
              className="px-0 py-3 text-center w-40 shadow-lg shadow-black/20 font-semibold bg-white outline-none placeholder:text-black/50 max-md:text-sm max-md:w-[100px]"
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
              className="px-0 py-3 text-center w-40 shadow-lg shadow-black/20 font-semibold bg-white outline-none placeholder:text-black/50 max-md:text-sm max-md:w-[100px]"
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
              className="px-0 py-3 text-center w-40 shadow-lg shadow-black/20 font-semibold bg-white outline-none placeholder:text-black/50 max-md:text-sm max-md:w-[100px]"
            />
            {/* <div>{totalKgModena()}</div> */}
          </div>
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Total de kilos natural:
            </label>
            <input
              {...register("total_kilos_natural", { required: true })}
              type="text"
              className="px-0 py-3 text-center w-40 shadow-lg shadow-black/20 font-semibold bg-white outline-none placeholder:text-black/50 max-md:text-sm max-md:w-[100px]"
            />
            {/* <div>{totalKgModena()}</div> */}
          </div>
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Total de barra perfiles:
            </label>
            <div className="px-0 py-3 text-center w-40 shadow-lg shadow-black/20 font-semibold bg-white outline-none placeholder:text-black/50 max-md:text-sm max-md:w-[100px]">
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
              className="px-0 py-3 text-center w-40 shadow-lg shadow-black/20 font-semibold bg-white outline-none placeholder:text-black/50 max-md:text-sm max-md:w-[100px]"
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
              className="px-0 py-3 text-center w-40 shadow-lg shadow-black/20 font-semibold bg-white outline-none placeholder:text-black/50 max-md:text-sm max-md:w-[100px]"
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
              className="px-0 py-3 text-center w-40 shadow-lg shadow-black/20 font-semibold bg-white outline-none placeholder:text-black/50 max-md:text-sm max-md:w-[100px]"
            />
          </div>
          <div className="flex gap-3 items-center">
            {errors.precio_natural && (
              <span className="bg-red-500 text-sm text-white rounded-lg p-3 text-center uppercase">
                la fecha es requerida
              </span>
            )}
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Precio de kilo natural:
            </label>
            <input
              step="0.01"
              {...register("precio_natural", { required: true })}
              type="number"
              className="px-0 py-3 text-center w-40 shadow-lg shadow-black/20 font-semibold bg-white outline-none placeholder:text-black/50 max-md:text-sm max-md:w-[100px]"
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
              className="px-0 py-3 text-center w-40 shadow-lg shadow-black/20 font-semibold bg-white outline-none placeholder:text-black/50 max-md:text-sm max-md:w-[100px] cursor-pointer"
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
