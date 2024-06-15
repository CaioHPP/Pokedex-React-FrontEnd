import "./NavBar.css";
import logo from "../../logo.svg";
import pokeball from "../../images/pokeball.png";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const NavBar = () => {
  return (
    <div className="navBar">
      <Link to="/" style={{ height: "5vmin" }}>
        <div className="linkLogon">
          <img src={logo} alt="logo" className="logo" />
          <h2>Online Pokédex</h2>
        </div>
      </Link>

      <Link to="/pokedex">
        <button className="button">
          Pokédex
          <img src={pokeball} alt="imagem" />
        </button>
      </Link>
    </div>
  );
};

export default NavBar;
