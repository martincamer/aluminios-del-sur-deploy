import { Link, useNavigate } from "react-router-dom";
import prs from "../assets/logo.png";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

export const Header = () => {
  const { user } = useAuth();

  const actualUrl = window.location.href;
  useEffect(() => {}, [actualUrl]);
  const navigate = useNavigate("/");

  return (
    <header className="bg-primary">
      <div className="px-6 max-w-full flex flex-row justify-between items-center">
        {/* logo prs  */}
        <Link to={"/home"}>
          <img className="h-[80px] cursor-pointer" src={prs} alt="logo" />
        </Link>
        <nav className="flex flex-row gap-6 items-center">
          {localStorage.key("email") ? (
            <div className="bg-white py-2 px-2 rounded-lg">
              <span className="text-primary font-semibold">Usuario:</span>{" "}
              <span className="text-black font-bold capitalize">
                @{user[0]?.attributes.email}
              </span>
            </div>
          ) : (
            ""
          )}
          {localStorage.key("email") ? (
            <button
              className="bg-white px-4 py-2 rounded-lg text-primary font-bold capitalize"
              onClick={() => (localStorage.removeItem("email"), navigate("/"))}
            >
              logout
            </button>
          ) : (
            ""
          )}
        </nav>
      </div>
    </header>
  );
};
