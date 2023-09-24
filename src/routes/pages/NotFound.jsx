import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col gap-12 items-center justify-center h-screen">
      <h3 className="text-primary font-bold text-5xl">
        ¡Esta pagìna no se encuentra disponible!
      </h3>
      <Link
        className="font-semibold underline text-2xl"
        to={localStorage.key("email") ? "/home" : "/"}
      >
        Volver a la pagina principal
      </Link>
    </div>
  );
};
