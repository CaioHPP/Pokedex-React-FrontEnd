//Pokeball rotating animation
import "./Loading.css";
import pokeball from "../../images/pokeball.png";

const Loading = () => {
  return (
    <div className="loadingContainer">
      <img src={pokeball} className="pokeball" alt="pokeball" />
    </div>
  );
};

export default Loading;
