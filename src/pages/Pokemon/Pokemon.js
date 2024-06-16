import "./Pokemon.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import NavBar from "../../Components/NavBar/NavBar";
import ListedPokemon from "../../Components/ListedPokemon/ListedPokemon";
import Bulbasaur from "../../responses/bulbasaur.json";
import Ivysaur from "../../responses/ivysaur.json";
import BulbaImage from "../../images/1.png";
import IvysaurImage from "../../images/2.png";

const Pokemon = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  const getPokemon = async () => {
    /*const general = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .catch((error) => {
        console.error(error);
      });
    const species = await axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .catch((error) => {
        console.error(error);
      });

    const evolution = await axios
      .get(species.data.evolution_chain.url)
      .catch((error) => {
        console.error(error);
      });

    const response = {
      ...general.data,
      species: species.data,
      evolution: evolution.data.chain,
    };*/
    const response = id === "1" ? Bulbasaur : Ivysaur;
    response.sprites.front_default = id === "1" ? BulbaImage : IvysaurImage;

    console.log(response);
    setPokemon(response);
  };

  useEffect(() => {
    getPokemon();
    return () => {
      setPokemon(null);
    };
  }, [id]);

  return (
    <div className="body">
      <NavBar />
      <div className="pokemonDetail">
        <h1>{pokemon?.name}</h1>
        <img
          src={pokemon?.sprites.front_default}
          alt={pokemon?.name}
          className="pokemonImageDetail"
        />
        <p>
          <strong>Height:</strong> {pokemon?.height}
        </p>
        <p>
          <strong>Weight:</strong> {pokemon?.weight}
        </p>
        <p>
          <strong>Types:</strong>{" "}
          {pokemon?.types.map((type, index) => (
            <span key={index}>{type.type.name} </span>
          ))}
        </p>
        <p>
          <strong>Abilities:</strong>{" "}
          {pokemon?.abilities.map((ability, index) => (
            <span key={index}>{ability.ability.name} </span>
          ))}
        </p>
        <p>
          <strong>Evolution:</strong>{" "}
        </p>
        {pokemon?.evolution.evolves_to.map((evolution, index) => (
          <ListedPokemon key={index} pokemonName={evolution.species.name} />
        ))}
        <Link to="/pokedex">
          <Button text="Voltar" />
        </Link>
      </div>
    </div>
  );
};

export default Pokemon;
