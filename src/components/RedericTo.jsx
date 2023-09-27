import { Navigate } from 'react-router-dom';

export const RederictTo = ({ children }) => {
	if (localStorage.getItem('email')) {
		return <Navigate to={'/home'} />;
	}

	return children;
};
