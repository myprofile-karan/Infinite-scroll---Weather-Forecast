const temperatureInCelsius = (temperature: number): number => {
  return Math.round(temperature - 273.15);
};

const temperatureInFahrenheit = (temperature: number): number => {
  return (Math.round(temperature - 273.15) * 9) / 5 + 32;
};

export { temperatureInCelsius, temperatureInFahrenheit };
