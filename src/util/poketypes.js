import React, { useEffect, useRef } from "react";
import poketypes from "../images/poketypes.png";

const typesJSON = {
  normal: {
    x: [0, 31],
    y: [0, 15],
  },
  fight: {
    x: [32, 63],
    y: [0, 15],
  },
  flying: {
    x: [64, 95],
    y: [0, 15],
  },
  poison: {
    x: [96, 127],
    y: [0, 15],
  },
  ground: {
    x: [0, 31],
    y: [16, 31],
  },
  rock: {
    x: [32, 63],
    y: [16, 31],
  },
  bug: {
    x: [64, 95],
    y: [16, 31],
  },
  ghost: {
    x: [96, 127],
    y: [16, 31],
  },
  steel: {
    x: [0, 31],
    y: [32, 47],
  },
  unknown: {
    x: [32, 63],
    y: [32, 47],
  },
  fire: {
    x: [64, 95],
    y: [32, 47],
  },
  water: {
    x: [96, 127],
    y: [32, 47],
  },
  grass: {
    x: [0, 31],
    y: [48, 63],
  },
  electric: {
    x: [32, 63],
    y: [48, 63],
  },
  psych: {
    x: [64, 95],
    y: [48, 63],
  },
  ice: {
    x: [96, 127],
    y: [48, 63],
  },
  dragon: {
    x: [0, 31],
    y: [64, 79],
  },
  dark: {
    x: [32, 63],
    y: [64, 79],
  },
  fairy: {
    x: [64, 98],
    y: [64, 79],
  },
};

const PokemonTypeCanvas = ({ type }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = poketypes;
    img.onload = () => {
      if (typesJSON[type]) {
        const { x, y } = typesJSON[type];
        const [sx, ex] = x;
        const [sy, ey] = y;
        let width = ex - sx + 1;
        const height = ey - sy + 1;

        if (type === "fairy") {
          width = 34;
        }
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the image section onto the canvas
        ctx.drawImage(img, sx, sy, width, height, 0, 0, width, height);
      }
    };
  }, [type]);

  return <canvas ref={canvasRef} width={34} height={16} />;
};

export default PokemonTypeCanvas;
