import "./App.css";
import Login from "./pages/Login/Login";
import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from "react-router-dom";
import Pokedex from "./pages/Pokedex/Pokedex";
import Error from "./pages/Error/Error";

//cpp is just a acronym for Caio Henrique Pedroso Pedro

//Pokedex app made by Caio Henrique Pedroso Pedro
//This app is a simple login page that redirects to a pokedex page

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/pokedex",
    element: <Pokedex />,
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
