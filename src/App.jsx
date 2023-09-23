import {
	// Navigate,
	// createRoutesFromElements,
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';
import {
	Accesorios,
	CargarAccesorio,
	CargarPerfil,
	Clientes,
	EditarAccesorio,
	EditarPerfil,
	Facturar,
	Home,
	Login,
	NuevoCliente,
	Perfiles,
	CategoriaPerfiles,
	CategoriaAccesorios,
	ClientesAccesorio,
	NuevoClienteAccesorio,
	FacturarAccesorio,
	// OlvidePassword,
	// Register,
} from './routes/pages';
import { Layout } from './routes/layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthProvider.jsx';

const router = createBrowserRouter([
	{
		element: (
			<AuthProvider>
				<Layout />
			</AuthProvider>
		),
		children: [
			{
				path: '/',
				element: <Login />,
			},
			{
				path: '/home',
				element: (
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				),
			},
			{
				path: '/clientes',
				element: (
					<ProtectedRoute>
						<Clientes />
					</ProtectedRoute>
				),
			},
			{
				path: '/nuevo-cliente',
				element: (
					<ProtectedRoute>
						<NuevoCliente />
					</ProtectedRoute>
				),
			},
			{
				path: '/perfiles',
				element: (
					<ProtectedRoute>
						<Perfiles />
					</ProtectedRoute>
				),
			},
			{
				path: '/accesorios',
				element: (
					<ProtectedRoute>
						<Accesorios />
					</ProtectedRoute>
				),
			},
			{
				path: '/facturar-cliente/:id',
				element: (
					<ProtectedRoute>
						<Facturar />
					</ProtectedRoute>
				),
			},
			{
				path: '/cargar-perfil',
				element: (
					<ProtectedRoute>
						<CargarPerfil />
					</ProtectedRoute>
				),
			},
			{
				path: '/editar-perfil/:id',
				element: (
					<ProtectedRoute>
						<EditarPerfil />
					</ProtectedRoute>
				),
			},
			{
				path: '/editar-accesorio/:id',
				element: (
					<ProtectedRoute>
						<EditarAccesorio />
					</ProtectedRoute>
				),
			},
			{
				path: '/cargar-accesorio',
				element: (
					<ProtectedRoute>
						<CargarAccesorio />
					</ProtectedRoute>
				),
			},
			{
				path: '/perfiles/:categoria',
				element: (
					<ProtectedRoute>
						<CategoriaPerfiles />
					</ProtectedRoute>
				),
			},
			{
				path: '/accesorios/:categoria',
				element: (
					<ProtectedRoute>
						<CategoriaAccesorios />
					</ProtectedRoute>
				),
			},
			{
				path: '/clientes-accesorios',
				element: (
					<ProtectedRoute>
						<ClientesAccesorio />
					</ProtectedRoute>
				),
			},
			{
				path: '/nuevo-cliente-accesorio',
				element: (
					<ProtectedRoute>
						<NuevoClienteAccesorio />
					</ProtectedRoute>
				),
			},
			{
				path: '/facturar-accesorio/:id',
				element: (
					<ProtectedRoute>
						<FacturarAccesorio />
					</ProtectedRoute>
				),
			},
			// { path: '/pdf-viewer', element: <PDFViewerT /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
