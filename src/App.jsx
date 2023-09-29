import {
  // Navigate,
  // createRoutesFromElements,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
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
  NotFound,
  EstadoCliente,
  EditarEstadoCliente,
  Presupuesto,
  EditarCliente,
  // OlvidePassword,
  // Register,
} from "./routes/pages";
import { Layout } from "./routes/layout/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { RederictTo } from "./components/RedericTo";

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <RederictTo>
            <Login />
          </RederictTo>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/clientes",
        element: (
          <ProtectedRoute>
            <Clientes />
          </ProtectedRoute>
        ),
      },
      {
        path: "/nuevo-cliente",
        element: (
          <ProtectedRoute>
            <NuevoCliente />
          </ProtectedRoute>
        ),
      },
      {
        path: "/perfiles",
        element: (
          <ProtectedRoute>
            <Perfiles />
          </ProtectedRoute>
        ),
      },
      {
        path: "/accesorios",
        element: (
          <ProtectedRoute>
            <Accesorios />
          </ProtectedRoute>
        ),
      },
      {
        path: "/facturar-cliente/:id",
        element: (
          <ProtectedRoute>
            <Facturar />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cargar-perfil",
        element: (
          <ProtectedRoute>
            <CargarPerfil />
          </ProtectedRoute>
        ),
      },
      {
        path: "/editar-perfil/:id",
        element: (
          <ProtectedRoute>
            <EditarPerfil />
          </ProtectedRoute>
        ),
      },
      {
        path: "/editar-accesorio/:id",
        element: (
          <ProtectedRoute>
            <EditarAccesorio />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cargar-accesorio",
        element: (
          <ProtectedRoute>
            <CargarAccesorio />
          </ProtectedRoute>
        ),
      },
      {
        path: "/perfiles/:categoria",
        element: (
          <ProtectedRoute>
            <CategoriaPerfiles />
          </ProtectedRoute>
        ),
      },
      {
        path: "/accesorios/:categoria",
        element: (
          <ProtectedRoute>
            <CategoriaAccesorios />
          </ProtectedRoute>
        ),
      },
      {
        path: "/clientes-accesorios",
        element: (
          <ProtectedRoute>
            <ClientesAccesorio />
          </ProtectedRoute>
        ),
      },
      {
        path: "/nuevo-cliente-accesorio",
        element: (
          <ProtectedRoute>
            <NuevoClienteAccesorio />
          </ProtectedRoute>
        ),
      },
      {
        path: "/facturar-accesorio/:id",
        element: (
          <ProtectedRoute>
            <FacturarAccesorio />
          </ProtectedRoute>
        ),
      },
      {
        path: "/estado-clientes",
        element: (
          <ProtectedRoute>
            <EstadoCliente />
          </ProtectedRoute>
        ),
      },
      {
        path: "/estado-clientes/:id",
        element: (
          <ProtectedRoute>
            <EditarEstadoCliente />
          </ProtectedRoute>
        ),
      },
      {
        path: "/facturar-cliente-presupuesto/:id",
        element: (
          <ProtectedRoute>
            <Presupuesto />
          </ProtectedRoute>
        ),
      },
      {
        path: "/editar-cliente-perfiles/:id",
        element: (
          <ProtectedRoute>
            <EditarCliente />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
