import React, { useEffect, useState } from "react";

import './ColorGenerator.css';
import { ColorType } from "../../types/color";

function getRandomNumber(length: number): number {
  return Math.floor(Math.random() * length);
}

function getHexColor(): string {
  const hexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  let hexColor = '#';

  for (let i = 0; i < 6; i++) {
    const randomNumber = getRandomNumber(hexValues.length);
    const randomHexValue = hexValues[randomNumber];

    hexColor += randomHexValue;
  }

  return hexColor;
}

function getRgbColor() {
  const r = getRandomNumber(256);
  const g = getRandomNumber(256);
  const b = getRandomNumber(256);

  return `rgb(${r}, ${g}, ${b})`;
}

export const ColorGenerator: React.FC = () => {
  const [colorType, setColorType] = useState<ColorType | null>(null);
  const [color, setColor] = useState<string>('#FFFFFFF');

  const handleColorGenerate = (type: ColorType | null) => {
    let color = '';

    if (type === ColorType.hex) {
      color = getHexColor();
    }

    if (type === ColorType.rgb) {
      color = getRgbColor();
    }

    setColor(color);
  }

  useEffect(() => { 
    handleColorGenerate(colorType);
  }, [colorType])

  return (
    <div className="wrap">
      <div className="color-generator" style={{ 'backgroundColor': color }}>
        <div className="buttons">
          <button className="button is-light" onClick={() => setColorType(ColorType.hex)}>
            Create HEX color
          </button>

          <button className="button is-light" onClick={() => setColorType(ColorType.rgb)}>
            Create RGB color
          </button>

          <button className="button is-light" onClick={() => handleColorGenerate(colorType)}>
            Create Random color
          </button>
        </div>

        <div className="content">
          <h2 className="title">
            {colorType && `${colorType} color`}
          </h2>
          <p className="color">
            {color}
          </p>
        </div>
      </div>
    </div>
  );
}