import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header';

export const Layout = () => {
	return (
		<>
			<Header />
			<main className="h-full max-w-full w-full py-[50px]">
				<Outlet />
			</main>
		</>
	);
};
