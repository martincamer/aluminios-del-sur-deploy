import { Link } from 'react-router-dom';

export const OlvidePassword = () => {
	return (
		<div className="bg-secondary/60 h-screen w-full flex justify-center items-center max-md:px-4">
			<form className="bg-white p-10 w-1/3 mx-auto max-md:w-full max-w-full rounded-xl shadow-xl shadow-black/20 space-y-6">
				<div className="flex flex-col gap-3">
					<label className="uppercase font-bold text-normal">Email</label>
					<input
						type="email"
						className="p-3 rounded-md bg-white outline-none border-[1px] border-black placeholder:text-black/50"
						placeholder="Escribe tu email"
					/>
				</div>
				<div className="flex flex-col gap-3">
					<input
						type="submit"
						className="p-3 rounded-md bg-primary text-white font-semibold hover:bg-primary/80 transition-all ease-in-out outline-none placeholder:text-black/50 cursor-pointer"
						value={'Enviar'}
					/>
				</div>
				<div className="flex justify-between">
					<Link
						to="/"
						className="underline text-sm font-semibold text-gray-600"
					>
						¿Ya tienes una cuenta? Entrar Ahora.
					</Link>
					<Link
						to="/register"
						className="underline text-sm font-semibold text-gray-600"
					>
						¿Aun no tienes una cuenta? Registrate.
					</Link>
				</div>
			</form>
		</div>
	);
};
