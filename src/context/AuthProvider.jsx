import { createContext, useEffect, useState } from 'react';
import { aluminiosApi } from '../api/aluminiosApi';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState([]);
	const [usuario, setUsuario] = useState('');
	const [alerta, setAlerta] = useState('');

	const navigate = useNavigate();
	useEffect(() => {
		async function loadData() {
			const { data } = await aluminiosApi.get('/usuarios');
			// const datos = data.data.map(i => i.attributes.email);
			setUser(data.data);
		}

		loadData();
	}, []);

	const handleSubmit = e => {
		e.preventDefault();

		if ([usuario].includes('')) {
			setAlerta('Todos los campos son obligatorios');
			return;
		}
		if (usuario !== user[0]?.attributes.email) {
			setAlerta('El usuario no existe');
			return;
		}

		if (usuario === user[0]?.attributes.email) {
			localStorage.setItem('email', user[0]?.attributes.email);
			navigate('/home');
		}

		setAlerta('');
	};
	// console.log(user[0]?.attributes.jwt);

	// console.log(datos[0].attributes.jwt);

	return (
		<AuthContext.Provider
			value={{ handleSubmit, usuario, setUsuario, alerta, setAlerta, user }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
