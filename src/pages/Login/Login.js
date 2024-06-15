import "./Login.css";
import logo from "../../logo.svg";
import loginicon from "../..//images/pokeball.png";
import validator from "validator";
import Button from "../../Components/Button/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleSubmit = (event) => {
    const isValid = validate();

    if (!isValid) {
      event.preventDefault();
    }
  };

  const validate = () => {
    let emailError = "";
    let senhaError = "";

    if (!validator.isEmail(email)) {
      emailError = "Email inválido";
    }

    if (senha.length < 8) {
      senhaError = "A senha deve ter no mínimo 8 caracteres";
    }

    if (emailError || senhaError) {
      setEmailError(emailError);
      setSenhaError(senhaError);
      return false;
    } else {
      setEmailError("");
      setSenhaError("");
    }

    return true;
  };

  return (
    <div>
      <div className="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form className="login">
        <img src={logo} className="logo" alt="logo" />
        <h2>Online Pokédex</h2>
        <label for="email">E-mail</label>
        <input
          type="text"
          placeholder="Digite seu e-mail"
          id="email"
          onChange={handleEmailChange}
        />
        <label for="senha">Senha</label>
        <input
          type="password"
          placeholder="Digite sua senha"
          id="senha"
          onChange={handleSenhaChange}
        />
        <span>{emailError}</span>
        <span>{senhaError}</span>
        <Link to="/pokedex" style={{ textDecoration: "none" }}>
          <Button texto="Login" imagem={loginicon} onClick={handleSubmit} />
        </Link>
      </form>
    </div>
  );
};

export default Login;
