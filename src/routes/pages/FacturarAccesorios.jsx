import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { BuscadorPerfilSeleccionar } from "../../components/BuscadorPerfilSeleccionar";
import { CardSeleccionAccesorio } from "../../components/CardSeleccionAccesorio";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfAccesorio } from "../../components/PdfAccesorio";
import "jspdf-autotable";
import axios from "axios";

export const FacturarAccesorio = () => {
  const [seleccionar, setSeleccionar] = useState(false);
  const [accesorio, setAccesorio] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState([]);
  const [obtenerId, setObtenerId] = useState(null);
  const [modal, setModal] = useState(false);
  const [accesorioSeleccionado, setAccesorioSeleccionado] = useState([]);
  const [clienteId, setClienteId] = useState([]);
  const [accId, setAccId] = useState([]);

  const params = useParams();

  //buscar perfil
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  let resultado = [];

  if (!search) {
    resultado = accesorio;
  } else {
    resultado = accesorio.filter((dato) =>
      dato.attributes.codigo.toLowerCase().includes(search)
    );
  }

  console.log(accId);

  //Obtener api metodo get clientes
  useEffect(() => {
    async function data() {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/clientes-accesorios?populate=*&filters[id]=${params.id}`
      );

      setValue("cliente", res.data.data[0].attributes.nombre);

      setClienteId(res.data.data);
    }

    data();
  }, [obtenerId]);

  useEffect(() => {
    async function load() {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/acc-cargados?populate=*&filters[cliente]=${
          clienteId[0]?.attributes.nombre
        }`
      );
      setAccId(res.data.data);
    }

    load();
  }, [clienteId]);

  //Obtener get perfiles
  useEffect(() => {
    async function load() {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/accesorios`);
      setAccesorio(res.data.data);
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
          }/accesorios?populate=*&filters[id]=${obtenerId}`
        );
        setAccesorioSeleccionado(respuesta.data.data);

        setValue("codigo", respuesta.data.data[0].attributes.codigo);
        setValue("color", respuesta.data.data[0].attributes.color);
        setValue("categoria", respuesta.data.data[0].attributes.categoria);
        setValue("precio", respuesta.data.data[0].attributes.precio);
        // setValue('slug', respuesta.data.data[0].id);
      } catch (error) {
        console.log(error);
      }
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = handleSubmit(async ({ total_pagar, total_accesorios }) => {
    axios.put(
      `${import.meta.env.VITE_API_URL}/clientes-accesorios/${params.id}`,
      {
        data: {
          total_pagar: (total_pagar = totalPrecio()),
          total_accesorios: (total_accesorios = totalAccesorios()),
        },
      }
    );

    toast.success("Datos enviados correctamente!", {
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
  });

  const onCreateAccesorioSeleccionado = handleSubmit(
    async ({
      codigo,
      color,
      categoria,
      cliente,
      precio,
      cantidad,
      nombre,
      precio_standart,
    }) => {
      if (cantidad > accesorioSeleccionado[0].attributes.cantidad) {
        setTimeout(() => {
          setError(false);
        }, 1400);
        setError(true);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/acc-cargados`, {
          data: {
            codigo: codigo,
            color: color,
            categoria: categoria,
            cliente: cliente,
            precio: precio * cantidad,
            cantidad: cantidad,
            nombre: nombre,
            precio_standart: precio,
          },
        });
        await axios.put(
          `${import.meta.env.VITE_API_URL}/accesorios/${obtenerId}`,
          {
            data: {
              cantidad: accesorioSeleccionado[0].attributes.cantidad - cantidad,
            },
          }
        );

        toast.success("Creado satifactoriamente!", {
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
      }
    }
  );

  const handleDelete = (id) => {
    try {
      axios.delete(`${import.meta.env.VITE_API_URL}/acc-cargados/${id}`);
      toast.error("Elimanado correctamente!", {
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

  const totalAccesorios = () => {
    return accId.reduce((sum, b) => {
      return sum + Number(b.attributes.cantidad);
    }, 0);
  };

  const totalPrecio = () => {
    return accId.reduce((sum, b) => {
      return sum + Number(b.attributes.precio);
    }, 0);
  };

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
    <div className="py-[150px] px-4">
      <ToastContainer />
      <div className="absolute top-28 left-10">
        <Link
          to={"/clientes-accesorios"}
          className="underline text-primary font-semibold"
        >
          Volver al clientes accesorios
        </Link>
      </div>
      <div className="bg-primary p-10 rounded-lg w-2/3 mx-auto shadow-2xl shadow-black/30 space-y-6">
        <div className="flex justify-center">
          <h3 className="text-white text-xl">
            Cargar Pago - Facturación Cliente{" "}
            <span className="font-semibold underline">
              {clienteId[0]?.attributes.nombre}{" "}
              {clienteId[0]?.attributes.apellido}
            </span>
          </h3>
        </div>

        <div className="flex gap-3 items-center">
          <label className="font-semibold text-normal text-white">
            Cliente:
          </label>
          <div className="px-10 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-50">
            {clienteId[0]?.attributes.nombre}{" "}
            {clienteId[0]?.attributes.apellido}
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <label className="font-semibold text-normal text-white">
            Localidad:
          </label>
          <div className="px-10 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-50">
            {clienteId[0]?.attributes.localidad}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex gap-3 items-center relative">
            <label className="font-semibold text-normal text-white">
              Cantidad de accesorios a:
            </label>
            <input
              onClick={() => setSeleccionar(!seleccionar)}
              type="text"
              className="px-0 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-auto"
              value={"Seleccionar"}
            />
            <div
              className={
                !seleccionar
                  ? "hidden"
                  : `bg-white shadow-lg shadow-black/30 p-10 rounded-xl absolute w-full flex flex-col space-y-5`
              }
            >
              <div
                onClick={() => setSeleccionar(!seleccionar)}
                className="absolute top-0 right-0 p-5 text-2xl font-bold cursor-pointer"
              >
                X
              </div>

              <div>
                <BuscadorPerfilSeleccionar
                  search={search}
                  searcher={searcher}
                />
              </div>

              <div className="flex flex-wrap gap-4 overflow-y-scroll h-[300px]">
                {resultado.map((a) => (
                  <CardSeleccionAccesorio
                    key={a.id}
                    a={a}
                    handleModal={handleModal}
                    handlePerfilSeleccionadoId={handlePerfilSeleccionadoId}
                  />
                ))}
                {modal && (
                  <div className="absolute top-[40%] left-[35%] flex flex-col gap-2 bg-white shadow-xl drop-shadow-2xl shadow-black/50 py-4 px-2 rounded-lg transition-all ease-in-out duration-500">
                    <div
                      onClick={() => handleModal()}
                      className="text-black font-bold text-[19px] px-4 flex justify-end cursor-pointer"
                    >
                      X
                    </div>
                    <form
                      onSubmit={onCreateAccesorioSeleccionado}
                      className="flex flex-col gap-3"
                    >
                      {error ? (
                        <span className="bg-red-500 text-sm text-white p-2 rounded-lg text-center">
                          El total seleccionado es mayor a:{" "}
                          {accesorioSeleccionado[0].attributes.cantidad}
                        </span>
                      ) : (
                        ""
                      )}
                      <div>
                        <label
                          className='className="text-sm font-bold text-black capitalize'
                          htmlFor=""
                        >
                          Codigo:{" "}
                        </label>
                        <input
                          type="text"
                          {...register("codigo", {
                            required: true,
                          })}
                          className="font-bold text-primary capitalize bg-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label
                          className='className="text-sm font-bold text-black capitalize '
                          htmlFor=""
                        >
                          Color:{" "}
                        </label>
                        <input
                          type="text"
                          {...register("color", {
                            required: true,
                          })}
                          className="font-bold text-primary capitalize bg-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label
                          className='className="text-sm font-bold text-black capitalize'
                          htmlFor=""
                        >
                          categoria:{" "}
                        </label>
                        <input
                          type="text"
                          {...register("categoria", {
                            required: true,
                          })}
                          className="font-bold text-primary capitalize bg-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label
                          className='className="text-sm font-bold text-black capitalize'
                          htmlFor=""
                        >
                          Cliente:{" "}
                        </label>
                        <input
                          type="text"
                          {...register("cliente", {
                            required: true,
                          })}
                          className="font-bold text-primary capitalize bg-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label
                          className='className="text-sm font-bold text-black capitalize'
                          htmlFor=""
                        >
                          Precio:{" "}
                        </label>
                        <span className="font-bold text-primary">$</span>
                        <input
                          step="0.01"
                          type="number"
                          {...register("precio", {
                            required: true,
                          })}
                          className="font-bold text-primary capitalize bg-transparent outline-none"
                        />
                      </div>

                      <input
                        {...register("cantidad", {
                          required: true,
                        })}
                        // value={cantidad}
                        // onChange={e => setCantidad(e.target.value)}
                        type="number"
                        placeholder="Cantidad de paquetes, accesorios"
                        className="text-sm rounded-lg p-2 text-black placeholder:text-gray-900 outline-none bg-gray-200 shadow-md shadow-black/20"
                      />

                      <input
                        type="submit"
                        className="bg-black text-white p-2 rounded-lg text-center outline-none cursor-pointer text-sm"
                        value={"Enviar Accesorio"}
                      />
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg grid grid-cols-3 justify-items-center gap-4 overflow-y-scroll h-[200px]">
            {accId?.map((acc) => (
              <div
                key={acc.id}
                className="bg-primary rounded-lg flex justify-between p-4 gap-2 h-[132px] w-full"
              >
                <div className="grid grid-cols-2 items-center justify-center justify-items-center gap-2 w-full">
                  <span className="capitalize text-primary bg-white px-1 py-1 justify-center rounded-full text-xs font-semibold w-full flex items-center">
                    <span className="text-black">{acc.attributes.codigo}</span>
                  </span>
                  <span className="capitalizetext-primary bg-white px-1 py-1 justify-center rounded-full text-xs font-bold w-full flex items-center">
                    {acc.attributes.cliente}
                  </span>
                  <span className="capitalize text-primary bg-white px-1 py-1 justify-center rounded-full text-xs font-semibold w-full flex items-center gap-1">
                    Total:
                    <span className="text-black">
                      {acc.attributes.cantidad}
                    </span>
                  </span>
                  <span className="capitalize text-black bg-white px-1 py-1 justify-center rounded-full text-xs font-semibold w-full flex items-center">
                    $ {acc.attributes.precio}
                  </span>
                  <span className="capitalize text-black bg-white py-1 justify-center rounded-full text-xs font-semibold w-full flex items-center">
                    {acc.attributes.categoria}
                  </span>
                  <span className="capitalize text-black bg-white py-1 justify-center rounded-full text-xs font-semibold w-full flex items-center">
                    {acc.attributes.color}
                  </span>
                </div>

                <div className="flex flex-col gap-2 items-center">
                  <input
                    className="bg-red-500 px-3 py-2 text-white rounded-full w-[40px] h-[40px] text-sm text-center outline-none cursor-pointer"
                    value={"X"}
                    onClick={() => handleDelete(acc.id)}
                  />
                  {/* <input
										onClick={() => {
											setSeleccionar(acc.id), handleModal(acc.id);
										}}
										className="bg-green-500 px-3 py-2 text-white rounded-full w-[40px] h-[40px] text-sm text-center outline-none cursor-pointer"
										value={'E'}
									/> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEPARADO */}

        <form onSubmit={onSubmit} className="flex flex-col space-y-6">
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white">
              Cantidad Total Accesorios:
            </label>
            <div className="px-0 text-center rounded-full bg-white w-[200px] py-3">
              {totalAccesorios()}
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white">
              Total a pagar:
            </label>

            <div className="text-white font-bold bg-green-600 py-2 px-5 rounded-xl text-xl shadow-lg">
              ${totalPrecio()}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-3 w-full">
              <input
                type="submit"
                className="px-0 py-3 text-center rounded-xl bg-orange-500 cursor-pointer text-white  outline-none placeholder:text-black/50 shadow-lg hover:bg-orange-600 transition-all ease-in-out w-full"
                value={"ENVIAR DATOS ACCESORIO"}
              />
            </div>

            <div className="px-0 py-3 text-center rounded-xl bg-green-600 cursor-pointer text-white  outline-none placeholder:text-black/50 hover:bg-green-700 transition-all ease-in-out w-full">
              <PDFDownloadLink
                onClick={() => clickToatFacturar()}
                document={
                  <PdfAccesorio
                    // accesorioSeleccionado={accesorioSeleccionado}
                    accesorio={accesorio}
                    clienteId={clienteId}
                    accId={accId}
                  />
                }
                fileName="FORM"
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
