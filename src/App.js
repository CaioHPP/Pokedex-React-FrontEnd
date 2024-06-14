import "./App.css";
import Login from "./pages/Login/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Pokedex from "./pages/Pokedex/Pokedex";

//cpp is just a acronym for Caio Henrique Pedroso Pedro

//Pokedex app made by Caio Henrique Pedroso Pedro
//This app is a simple login page that redirects to a pokedex page

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/pokedex",
    element: <Pokedex />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
