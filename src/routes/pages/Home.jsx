import { useEffect, useState } from 'react';
import { SideBar } from '../../components/SideBar';
import axios from 'axios';

export const Home = () => {
	const [usuario, setUsuario] = useState([]);

	useEffect(() => {
		async function loadData() {
			const res = await axios.get(`${import.meta.env.VITE_API_URL}/usuarios`);
			console.log(res.data.data);
			setUsuario(res.data.data);
		}

		loadData();
	}, []);

	return (
		<div className="flex">
			<SideBar />
			<div className="flex w-full justify-center max-md:py-[150px] max-md:px-6">
				<p className="text-3xl font-bold text-black">
					Usuario Logeado:{' '}
					<span className="capitalize text-primary font-extrabold">
						@{usuario.map(u => u.attributes.email)}
					</span>
				</p>
			</div>
		</div>
	);
};
