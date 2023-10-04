import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { CardSeleccionPerfil } from "../../components/CardSeleccionPerfil";
import { BuscadorPerfilSeleccionar } from "../../components/BuscadorPerfilSeleccionar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfPerfilPresupusto } from "../../components/PdfPerfilPresupuesto";
import axios from "axios";
import "jspdf-autotable";

export const Presupuesto = () => {
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
  const [perfilEnviado, setPerfilEnviado] = useState(
    JSON.parse(localStorage.getItem("perfilEnviado")) ?? []
  );
  //create useState Formulario

  // const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [kilos, setKilos] = useState(0);
  const [codigo, setCodigo] = useState("");
  const [colores, setColores] = useState("");
  const [categoria, setCategoria] = useState("");
  const [kg_peso_neto, setKiloPesoNeto] = useState(0);
  const [cliente, setCliente] = useState("");
  const [totalPagar, setTotalPagar] = useState(0);
  const [totalBarras, setTotalBarras] = useState(0);
  const [totalKilosHerrero, setTotalKilosHerrero] = useState(0);
  const [totalKilosModena, setTotalKilosModena] = useState(0);
  const [totalKilosModenaA30, setTotalKilosModenaA30] = useState(0);
  const [precioKiloHerrero, setPrecioKiloHerrero] = useState(
    JSON.parse(localStorage.getItem("precio_kilo_herrero")) ?? 0
  );
  const [precioKiloModena, setPrecioKiloModena] = useState(
    JSON.parse(localStorage.getItem("precio_kilo_modena")) ?? 0
  );
  const [precioKiloModenaA30, setPrecioKiloModenaA30] = useState(
    JSON.parse(localStorage.getItem("precio_kilo_modenaA30")) ?? 0
  );

  const params = useParams();

  useEffect(() => {
    localStorage.setItem("perfilEnviado", JSON.stringify(perfilEnviado));
  }, [perfilEnviado]);

  useEffect(() => {
    localStorage.setItem(
      "precio_kilo_herrero",
      JSON.stringify(precioKiloHerrero)
    );
  }, [precioKiloHerrero]);
  useEffect(() => {
    localStorage.setItem(
      "precio_kilo_modena",
      JSON.stringify(precioKiloModena)
    );
  }, [precioKiloModena]);
  useEffect(() => {
    localStorage.setItem(
      "precio_kilo_modenaA30",
      JSON.stringify(precioKiloModenaA30)
    );
  }, [precioKiloModenaA30]);

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

  // Obtener api metodo get clientes

  useEffect(() => {
    async function data() {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/clientes?populate=*&filters[id]=${
          params.id
        }`
      );

      setCliente(res.data.data[0].attributes.nombre);

      setClienteId(res.data.data);
    }

    data();
  }, [obtenerId]);

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
        setCodigo(respuesta.data.data[0].attributes.codigo);
        setColores(respuesta.data.data[0].attributes.colores);
        setCategoria(respuesta.data.data[0].attributes.categoria);
        setKiloPesoNeto(
          respuesta.data.data[0].attributes.kg_estimado_barra || 0
        );
        // setCodigo(respuesta.data.data[0].attributes.id);
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

  const addToPerfil = (e) => {
    e.preventDefault();

    const nuevoValor = cantidad * kg_peso_neto;

    const newItem = {
      id: perfilSeleccionado[0].id,
      codigo,
      colores,
      categoria,
      cliente,
      cantidad,
      nuevoValor,
    };

    setPerfilEnviado([...perfilEnviado, newItem]);

    handleModal(false);
    setSeleccionar(false);
  };
  const addToDelete = (id) => {
    const newItem = perfilEnviado.filter((item) => {
      return item.id !== id;
    });
    setPerfilEnviado(newItem);
  };

  const totalKgHerrero = () => {
    return perfilEnviado.reduce((sum, b) => {
      return sum + Number(b.categoria == "herrero" && b.nuevoValor);
    }, 0);
  };
  const totalKgModena = () => {
    return perfilEnviado.reduce((sum, b) => {
      return sum + Number(b.categoria == "modena" && b.nuevoValor);
    }, 0);
  };
  const totalKgModenaA30 = () => {
    return perfilEnviado.reduce((sum, b) => {
      return sum + Number(b.categoria == "modena a-30" && b.nuevoValor);
    }, 0);
  };

  const totalBarrasEnviado = () => {
    return perfilEnviado.reduce((sum, b) => {
      return sum + Number(b.cantidad);
    }, 0);
  };

  const totalKilos = () => {
    return perfilEnviado.reduce((sum, b) => {
      return sum + Number(b.nuevoValor);
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

  const TOTALPAGAR =
    precioKiloHerrero * totalKgHerrero() +
    precioKiloModena * totalKgModena() +
    precioKiloModenaA30 * totalKgModenaA30();

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
                      onSubmit={addToPerfil}
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
                          value={codigo}
                          onChange={(e) => setCodigo(e.target.value)}
                          type="text"
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
                          value={colores}
                          onChange={(e) => setColores(e.target.value)}
                          type="text"
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
                          value={categoria}
                          onChange={(e) => setCategoria(e.target.value)}
                          type="text"
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
                          value={cliente}
                          onChange={(e) => setCliente(e.target.value)}
                          type="text"
                          className="font-bold text-primary capitalize bg-transparent outline-none max-md:text-sm"
                        />
                      </div>
                      <input
                        min="1"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        type="number"
                        placeholder="Cantidad de barras"
                        className="text-sm rounded-lg p-2 text-black placeholder:text-gray-900 outline-none bg-gray-200 shadow-md shadow-black/20 max-md:mb-2"
                      />

                      <input
                        min="1"
                        value={kg_peso_neto}
                        onChange={(e) => setKiloPesoNeto(e.target.value)}
                        type="number"
                        step="0.001"
                        placeholder="kg barra peso neto"
                        className="text-sm rounded-lg p-2 text-black placeholder:text-gray-900 outline-none bg-gray-200 shadow-md shadow-black/20 max-md:mb-2"
                      />

                      <div>
                        <input
                          type="submit"
                          className="bg-black text-white p-2 rounded-lg text-center outline-none cursor-pointer text-sm"
                          value={"Enviar Perfil"}
                        />
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg grid grid-cols-3 max-md:grid-cols-1 justify-items-center gap-2 overflow-y-scroll h-[200px]">
            {perfilEnviado.map((p) => (
              <div
                key={p.id}
                className="bg-primary rounded-lg flex justify-between p-4 gap-4 h-[132px] w-full shadow-md shadow-black/30"
              >
                <div className="grid grid-cols-2 max-md:grid-cols-2 items-center justify-center justify-items-center gap-2 w-full">
                  <span className="capitalize text-black bg-white px-1 py-1 justify-center rounded-full text-xs font-semibold w-full flex items-center max-md:text-xs">
                    {p.cantidad} brs
                  </span>
                  <span className="capitalizetext-black capitalize gap-[2px] bg-white px-1 py-1 justify-center rounded-full text-xs font-bold w-full flex items-center max-md:text-xs">
                    <span className="text-primary">Cod:</span> {p.codigo}
                  </span>
                  <span className="capitalize text-black bg-white px-1 py-1 justify-center rounded-full text-xs font-semibold w-full flex items-center max-md:text-xs">
                    {p.nuevoValor.toLocaleString("arg")} kg
                  </span>
                  <span className="capitalize text-black bg-white px-1 py-1 justify-center rounded-full text-xs font-semibold w-full flex items-center max-md:text-xs">
                    {p.colores}
                  </span>
                  <span className="capitalize text-black bg-white px-1 py-1 justify-center rounded-full text-xs font-semibold w-full flex items-center max-md:text-xs">
                    {p.categoria}
                  </span>
                </div>

                <div className="flex flex-col justify-center items-center gap-2">
                  <input
                    className="bg-red-500 px-3 py-2 text-white rounded-full w-[40px] h-[40px] text-sm text-center outline-none cursor-pointer max-md:text-xs"
                    value={"X"}
                    onClick={() => addToDelete(p.id)}
                  />
                  {/* <input
										className="bg-green-500 px-3 py-2 text-white rounded-full w-[40px] h-[40px] text-sm text-center outline-none cursor-pointer max-md:text-xs"
										value={'E'}
										onClick={() => {
											{
												handlePerfilSeleccionadoId(p.id),
													handleModal(!modal),
													setSeleccionar(!seleccionar);
											}
										}}
									/> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEPARADO */}

        <div
          // onSubmit={onSubmit}
          className="flex flex-col space-y-6"
        >
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Total de kilos herrero:
            </label>
            <div className="px-0 py-3 text-center w-40 rounded-full bg-white outline-none placeholder:text-black/50 max-md:text-sm max-md:w-[100px]">
              {totalKgHerrero().toLocaleString("arg") || 0}
            </div>

            {/* <div>{totalKgHerrero()}</div> */}
          </div>
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Total de kilos modena:
            </label>
            <div className="px-0 py-3 text-center w-40 rounded-full bg-white outline-none placeholder:text-black/50 max-md:text-sm max-md:w-[100px]">
              {totalKgModena().toLocaleString("arg") || 0}
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Total de kilos modena a-30:
            </label>
            <div className="px-0 py-3 text-center w-40 rounded-full bg-white outline-none placeholder:text-black/50 max-md:text-sm max-md:w-[100px]">
              {totalKgModenaA30().toLocaleString("arg") || 0}
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Total de barra perfiles:
            </label>
            <div className="px-0 text-center rounded-full bg-white w-40 py-3 max-md:text-sm max-md:w-[100px]">
              {totalBarrasEnviado() || 0}
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Precio de kilo herrero:
            </label>
            <input
              min="1"
              value={precioKiloHerrero}
              onChange={(e) => setPrecioKiloHerrero(e.target.value)}
              step="0.001"
              type="number"
              className="px-0 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-auto max-md:text-sm max-md:w-[100px]"
            />
          </div>
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Precio de kilo modena:
            </label>
            <input
              min="1"
              value={precioKiloModena}
              onChange={(e) => setPrecioKiloModena(e.target.value)}
              step="0.001"
              type="number"
              className="px-0 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-auto max-md:text-sm max-md:w-[100px]"
            />
          </div>
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Precio de kilo modena a-30:
            </label>
            <input
              min="1"
              value={precioKiloModenaA30}
              onChange={(e) => setPrecioKiloModenaA30(e.target.value)}
              step="0.001"
              type="number"
              className="px-0 py-3 text-center rounded-full bg-white outline-none placeholder:text-black/50 w-auto max-md:text-sm max-md:w-[100px]"
            />
          </div>
          {/* <div className="flex gap-3 items-center">
						<label className="font-semibold text-normal text-white max-md:text-sm">
							Seleccionar Fecha:
						</label>
						<input
							type="date"
							className="px-6 py-3 rounded-lg bg-white outline-none placeholder:text-black/60 w-auto"
						/>
					</div> */}
          <div className="flex gap-3 items-center">
            <label className="font-semibold text-normal text-white max-md:text-sm">
              Total a pagar:
            </label>

            <div className="text-white bg-green-600 py-2 px-5 rounded-xl text-xl max-md:text-base font-bold">
              ${TOTALPAGAR.toLocaleString("arg") || 0}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="px-0 py-3 text-center rounded-xl bg-green-600 cursor-pointer text-white  outline-none placeholder:text-black/50 w-full hover:bg-green-700 transition-all ease-in-out max-md:text-xs">
              <PDFDownloadLink
                onClick={() => clickToatFacturar()}
                document={
                  <PdfPerfilPresupusto
                    TOTALPAGAR={TOTALPAGAR}
                    totalKilos={totalKilos}
                    precioKiloHerrero={precioKiloHerrero}
                    precioKiloModena={precioKiloModena}
                    precioKiloModenaA30={precioKiloModenaA30}
                    perfilEnviado={perfilEnviado}
                    clienteId={clienteId}
                    perfil={perfilId}
                  />
                }
                fileName={`${clienteId[0]?.attributes.nombre}_${clienteId[0]?.attributes.apellido}`}
              >
                GENERAR PRESUPUESTO FACTURACIÓN
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
