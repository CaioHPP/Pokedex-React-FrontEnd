import "./Button.css";

const Button = ({ texto, imagem, onClick }) => {
  if (imagem) {
    return (
      <div>
        <button className="buttonContainer" onClick={onClick}>
          {texto}
          <img src={imagem} alt="imagem" />
        </button>
      </div>
    );
  }
  return (
    <button className="buttonContainer" onClick={onClick}>
      {texto}
    </button>
  );
};

export default Button;
