import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import { CgShutterstock } from "react-icons/cg";
import { IoLayers, IoAlbums } from "react-icons/io5";
import { ImProfile } from "react-icons/im";

export const SideBar = () => {
  return (
    <div className="w-1/4 h-full bg-primary mx-5 rounded-lg p-10 max-md:hidden shadow-lg shadow-black/50">
      <div className="flex flex-col gap-12">
        <h2 className="font-semibold text-xl text-white text-center">
          CLIENTES, PERFILES Y ACCESORIOS
        </h2>
        <div className="flex flex-col gap-5">
          <Link
            to={"/home"}
            className="text-lg font-semibold text-white flex gap-2 items-center hover:underline transition-all hover:translate-x-1"
          >
            <ImProfile className="text-3xl text-white" /> Inicio - Perfil
            <IoIosArrowForward />
          </Link>
          <Link
            to={"/clientes"}
            className="text-lg font-semibold text-white flex gap-2 items-center hover:underline transition-all hover:translate-x-1"
          >
            <BsPersonCircle className="text-3xl text-white" /> Clientes Perfiles{" "}
            <IoIosArrowForward />
          </Link>
          <Link
            to={"/clientes-accesorios"}
            className="text-lg font-semibold text-white flex gap-2 items-center hover:underline transition-all hover:translate-x-1"
          >
            <BsPersonCircle className="text-3xl text-white" /> Clientes
            Accesorios <IoIosArrowForward />
          </Link>
          <Link
            to={"/perfiles"}
            className="text-lg font-semibold text-white flex gap-2 items-center hover:underline transition-all hover:translate-x-1"
          >
            <CgShutterstock className="text-3xl text-white" /> Perfiles en stock{" "}
            <IoIosArrowForward />
          </Link>
          <Link
            to={"/accesorios"}
            className="text-lg font-semibold text-white flex gap-2 items-center hover:underline transition-all hover:translate-x-1"
          >
            <IoLayers className="text-3xl text-white" /> Accesorios en stock{" "}
            <IoIosArrowForward />
          </Link>
        </div>
      </div>
      <hr className="h-[5px] my-[60px]" />
      <div className="flex flex-col gap-12">
        <h2 className="font-semibold text-xl text-white text-center">
          CONTENIDO DE PRODUCTOS
        </h2>
        <div className="flex flex-col gap-5">
          <Link
            to={"/cargar-perfil"}
            className="text-lg font-semibold text-white flex gap-2 items-center hover:underline transition-all hover:translate-x-1"
          >
            <IoAlbums className="text-3xl" /> Cargar nuevo perfil{" "}
            <IoIosArrowForward />
          </Link>
          <Link
            to={"/cargar-accesorio"}
            className="text-lg font-semibold text-white flex gap-2 items-center hover:underline transition-all hover:translate-x-1"
          >
            <IoAlbums className="text-3xl" /> Cargar nuevo accesorio{" "}
            <IoIosArrowForward />
          </Link>
        </div>
      </div>
    </div>
  );
};
