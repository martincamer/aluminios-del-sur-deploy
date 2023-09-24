import { Navigate, useNavigate } from "react-router-dom";
import { Alerta } from "../../components/Alerta";
import useAuth from "../../hooks/useAuth";

export const Login = () => {
  const { handleSubmit, usuario, alerta, setUsuario, user } = useAuth();

  return (
    <div className="h-screen w-full flex justify-center items-center max-md:px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-primary p-10 w-1/3 mx-auto max-md:w-full max-w-full rounded-xl shadow-xl shadow-black/20 space-y-6"
      >
        {alerta && <Alerta>{alerta}</Alerta>}

        <div className="flex flex-col gap-3">
          <label className="uppercase font-bold text-normal text-white">
            Usuario:
          </label>
          <input
            type="text"
            className="p-3 rounded-md bg-white outline-none placeholder:text-black/50 shadow-md shadow-black/30"
            placeholder="Escribe tu usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div>
          <input
            // onClick={() => user[0]?.attributes.email === usuario}
            type="submit"
            className="p-3 rounded-md bg-white text-primary uppercase font-semibold hover:bg-black hover:text-white transition-all ease-in-out outline-none placeholder:text-black/50 cursor-pointer"
            value={"Logearse"}
          />

          {/* {user[0]?.attributes.email} */}
        </div>
      </form>
    </div>
  );
};
