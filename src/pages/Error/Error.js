//SadPikachu for BadRequest Page
//show error message

import { useRouteError } from "react-router-dom";
import SadPikachu from "../../images/error.gif";

const Error = () => {
  /*Get Error */
  const error = useRouteError();
  console.log(error);

  return (
    <div className="errorContainer">
      <img src={SadPikachu} alt="Sad Pikachu" />
      <h1>BadRequest - Error {error.status}</h1>
      <h2>{error.data}</h2>
      <p>{error.error.message}</p>
    </div>
  );
};

export default Error;
