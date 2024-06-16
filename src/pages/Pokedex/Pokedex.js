import "./Pokedex.css";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import ListedPokemon from "../../Components/ListedPokemon/ListedPokemon";
import axios from "axios";
import NavBar from "../../Components/NavBar/NavBar";
import Loading from "../../Components/Loading/Loading";
import Pokemons from "../../responses/pokemons.json";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);

  const getPokemons = useCallback(async () => {
    /*const response = await axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`)
      .catch((error) => {
        console.error(error);
      });
    */
    const response = Pokemons;
    setPokemons(response.data.results);
  }, [page]);

  useEffect(() => {
    getPokemons();
    return () => {
      setPokemons([]);
    };
  }, [getPokemons]);

  if (!pokemons.length) {
    return (
      <div>
        <NavBar />
        <Loading />
      </div>
    );
  }

  return (
    <div className="body">
      <NavBar />
      <div className="pokedex">
        {pokemons.map((pokemon, index) => (
          <div className="listedPokemonContainer" key={index}>
            <ListedPokemon key={index} pokemonName={pokemon.name} />
          </div>
        ))}
      </div>
      <div className="pageButtons">
        {page > 0 ? (
          <button
            onClick={() => {
              setPage(page - 1);
              window.scrollTo(0, 0);
            }}
            className="button"
          >
            Anterior
          </button>
        ) : null}
        <button
          onClick={() => {
            setPage(page + 1);
            window.scrollTo(0, 0);
          }}
          className="button"
        >
          Próxima
        </button>

        {page > 0 ? (
          <button
            onClick={() => {
              setPage(0);
              window.scrollTo(0, 0);
            }}
            className="button"
          >
            Início
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Pokedex;
