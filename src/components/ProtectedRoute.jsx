import { Navigate } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
	// const { user } = useAuth();

	if (!localStorage.getItem('email')) {
		return <Navigate to={'/'} />;
	}

	return children;
};
