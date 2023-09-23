import { Link } from 'react-router-dom';

export const Register = () => {
	return (
		<div className="bg-secondary/60 h-full py-[100px] w-full flex flex-col gap-20 justify-center items-center max-md:px-4">
			<div>
				<h1 className="text-4xl font-extrabold text-primary underline">
					Registrarse Ahora
				</h1>
			</div>
			<form className="bg-white p-10 w-1/3 mx-auto max-md:w-full max-w-full rounded-xl shadow-xl shadow-black/20 space-y-6">
				<div className="flex flex-col gap-3">
					<label className="uppercase font-bold text-normal">Nombre</label>
					<input
						type="text"
						className="p-3 rounded-md bg-white outline-none border-[1px] border-black placeholder:text-black/50"
						placeholder="Escribe tu nombre"
					/>
				</div>
				<div className="flex flex-col gap-3">
					<label className="uppercase font-bold text-normal">Apellido</label>
					<input
						type="text"
						className="p-3 rounded-md bg-white outline-none border-[1px] border-black placeholder:text-black/50"
						placeholder="Escribe tu apellido"
					/>
				</div>
				<div className="flex flex-col gap-3">
					<label className="uppercase font-bold text-normal">Email</label>
					<input
						type="email"
						className="p-3 rounded-md bg-white outline-none border-[1px] border-black placeholder:text-black/50"
						placeholder="Escribe tu email"
					/>
				</div>
				<div className="flex flex-col gap-3">
					<label className="uppercase font-bold text-normal">Contraseña</label>
					<input
						type="password"
						className="p-3 rounded-md bg-white outline-none border-[1px] border-black placeholder:text-black/50"
						placeholder="Escribe tu contraseña"
					/>
				</div>
				<div className="flex flex-col gap-3">
					<label className="uppercase font-bold text-normal">
						Repetir Contraseña
					</label>
					<input
						type="password"
						className="p-3 rounded-md bg-white outline-none border-[1px] border-black placeholder:text-black/50"
						placeholder="Escribe tu contraseña"
					/>
				</div>
				<div className="flex flex-col gap-3">
					<input
						type="submit"
						className="p-3 rounded-md bg-primary text-white font-semibold hover:bg-primary/80 transition-all ease-in-out outline-none placeholder:text-black/50 cursor-pointer"
						value={'Crear Cuenta'}
					/>
				</div>
				<div className="flex justify-between">
					<Link
						to="/olvide-password"
						className="underline text-sm font-semibold text-gray-600"
					>
						Olvide mi password.
					</Link>
					<Link
						to="/"
						className="underline text-sm font-semibold text-gray-600"
					>
						¿Tienes una cuenta? Entra ahora.
					</Link>
				</div>
			</form>
		</div>
	);
};
