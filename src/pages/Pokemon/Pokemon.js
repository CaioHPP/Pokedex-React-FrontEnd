import "./Pokemon.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import NavBar from "../../Components/NavBar/NavBar";

import PokemonTypeCanvas from "../../util/poketypes";

const Pokemon = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  const getPokemon = async () => {
    const general = await axios
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

    if (species.data.evolves_from_species) {
      const preEvolution = await axios
        .get(
          "https://pokeapi.co/api/v2/pokemon/" +
            species.data.evolves_from_species.name
        )
        .catch((error) => {
          console.error(error);
        });

      species.data.evolves_from_species = preEvolution.data;
    }
    if (
      evolution.data.chain?.evolves_to[0]?.species?.name === general.data.name
    ) {
      evolution.data.chain.evolves_to[0] =
        evolution.data.chain.evolves_to[0].evolves_to[0];
    }

    const response = {
      ...general.data,
      species: species.data,
      evolution: evolution.data.chain,
    };
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
      <div
        className="pokemonDetailContainer"
        style={{
          backgroundColor: `${pokemon?.species?.color.name}`,
        }}
      >
        <div className="pokemonDetail">
          <div className="name">
            <h1>{pokemon?.name.toUpperCase()}</h1>
          </div>
          <div className="pokeInfoContainer">
            <div className="pokeImage">
              <img
                src={pokemon?.sprites.other["official-artwork"].front_default}
                alt={pokemon?.name}
                className="pokemonImageDetail"
              />
            </div>
            <div className="pokeInfo">
              <p>
                <strong>Altura:</strong> {pokemon?.height * 10} cm
              </p>
              <p>
                <strong>Peso:</strong> {pokemon?.weight / 10} kg
              </p>
              <p className="types">
                <strong>Tipos:</strong>{" "}
                {pokemon?.types.map((type, index) => (
                  <PokemonTypeCanvas key={index} type={type.type.name} />
                ))}
              </p>
              <p>
                <strong>Habilidades Passivas:</strong>{" "}
              </p>
              <ul>
                {pokemon?.abilities.map((ability, index) => (
                  <li key={index}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="body">
        {pokemon?.evolution?.evolves_to[0] &&
          pokemon?.evolution?.evolves_to[0].species?.name !==
            pokemon?.species?.evolves_from_species?.name && (
            <div
              className="pokemonDetailContainer"
              style={{
                backgroundColor: `${pokemon?.species?.color.name}`,
              }}
            >
              <div className="pokemonDetail">
                <div className="name">
                  <h1>
                    EVOLUÇÃO:{" "}
                    {pokemon?.evolution?.evolves_to[0]?.species?.name.toUpperCase()}
                  </h1>
                </div>
                {pokemon?.evolution?.evolves_to.map((evolution, index) => (
                  <div className="pokeInfoContainer" key={index}>
                    <div className="pokeImage">
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                          evolution?.species?.url?.split("/")[6]
                        }.png`}
                        alt={evolution?.species?.name}
                        className="pokemonImageDetail"
                      />
                    </div>
                    <div className="containerBotaoInfo">
                      <div className="pokeInfo">
                        <p>
                          <strong>Nome:</strong>{" "}
                          {evolution?.species?.name.toUpperCase()}
                        </p>
                        <p>
                          <strong>Level necessário:</strong>{" "}
                          {evolution?.evolution_details[0].min_level
                            ? evolution.evolution_details[0].min_level
                            : "N/A"}
                        </p>
                        <p>
                          <strong>Item necessário:</strong>{" "}
                          {evolution?.evolution_details[0].item
                            ? evolution.evolution_details[0].item.name.toUpperCase()
                            : "N/A"}
                        </p>
                      </div>
                      <Link
                        to={`/pokedex/${
                          evolution?.species?.url?.split("/")[6]
                        }`}
                      >
                        <Button
                          texto="Ver detalhes"
                          onClick={() => {
                            window.scrollTo(0, 0);
                          }}
                        />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Pré-evolução */}

        {pokemon?.species?.evolves_from_species && (
          <div
            className="pokemonDetailContainer"
            style={{
              backgroundColor: `${pokemon?.species?.color.name}`,
            }}
          >
            <div className="pokemonDetail">
              <div className="name">
                <h1>
                  PRÉ-EVOLUÇÃO:{" "}
                  {pokemon?.species?.evolves_from_species?.name.toUpperCase()}
                </h1>
              </div>
              <div className="pokeInfoContainer">
                <div className="pokeImage">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.species?.evolves_from_species?.id}.png`}
                    alt={pokemon?.species?.evolves_from_species?.name}
                    className="pokemonImageDetail"
                  />
                </div>
                <div className="pokeInfo">
                  <p>
                    <strong>Nome:</strong>{" "}
                    {pokemon?.species?.evolves_from_species?.name.toUpperCase()}
                  </p>
                  <p>
                    <strong>Altura:</strong>{" "}
                    {pokemon?.species?.evolves_from_species?.height * 10} cm
                  </p>
                  <p>
                    <strong>Peso:</strong>{" "}
                    {pokemon?.species?.evolves_from_species?.weight / 10} kg
                  </p>
                </div>
                <Link
                  to={`/pokedex/${pokemon?.species?.evolves_from_species?.id}`}
                >
                  <Button
                    texto="Ver detalhes"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pokemon;
