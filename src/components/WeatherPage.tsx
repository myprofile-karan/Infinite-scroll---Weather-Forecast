import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { WeatherData } from "../types/types";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import TempConverter from "./TempConverter";
import Cloudy from "../assets/cloudy.webp";
import Clear from "../assets/sunny2.png";
import Rain from "../assets/rain.jpg";
import globalMap from "./Map";
import { temperatureInCelsius, temperatureInFahrenheit } from "./utils/tempConvert";

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>();
  const [unit, setUnit] = useState("C");

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const lon: number | any = params.get("lon");
  const lat: number | any = params.get("lat");

  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=051f7fb97aedf21f638cc8c5e23cc235`
        );
        const jsonData = await response.json();
        setWeatherData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  globalMap(mapRef, lat, lon, weatherData as WeatherData | any);

  if (!weatherData) {
    return null; // replace with loader
  }

  const { name, main, sys, weather, wind } = weatherData;
  const changeImage = weather[0]?.main;

  return (
    <div className="w-full h-[800px]">
      <div className="relative w-full h-[100%]">
        <Link
          to="/"
          className="px-5 py-2 m-2 z-[4] font-bold text-md bg-gray-300 absolute top-0 rounded-lg"
        >
          <i className="fa-solid fa-chevron-left"></i>{" "}
        </Link>
        <img
          src={
            changeImage === "Clear"
              ? Clear
              : changeImage === "Clouds"
              ? Cloudy
              : changeImage === "Rain"
              ? Rain
              : ""
          }
          className="absolute top-0 object-cover w-full h-[100%] z-[0] opacity-50"
          alt=""
        />
        <div className=" w-full h-full px-4 sm:px-10 py-5 mx-auto rounded-lg z-[3] absolute top-0">
          {weatherData && (
            <div className="sm:p-6">
              <div id="map" className="mx-auto mb-3 w-full h-[300px]"></div>

              <TempConverter setUnit={setUnit} />

              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 sm:text-left text-center my-5">
                {name}, {sys?.country}
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <img
                    src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
                    alt="Weather Icon"
                    className="sm:h-32 sm:w-32 w-20 h-20 object-cover"
                  />
                </div>
                <div className="text-white flex gap-2">
                  <div>
                    <p className="text-4xl lg:text-5xl mb-1 font-bold">
                      {unit === "C"
                        ? temperatureInCelsius(main?.temp)
                        : temperatureInFahrenheit(main?.temp)}
                      °{unit}
                    </p>
                    <p className="text-lg font-bold text-cener">
                      {weather[0]?.description}
                    </p>
                  </div>

                  <div className="">
                    <p className="text-sm mb-1 text-gray-200">
                      Feels like:{" "}
                      {unit === "C"
                        ? temperatureInCelsius(main?.temp)
                        : temperatureInFahrenheit(main?.temp)}
                      °{unit}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col items-center my-5 sm:my-0 sm:items-end text-sm justify-end text-gray-200">
                <p>
                  Min Temp:{" "}
                  {unit === "C"
                    ? temperatureInCelsius(main?.temp_min)
                    : temperatureInFahrenheit(main?.temp_min)}
                  °{unit}
                </p>
                <p>
                  Max Temp:{" "}
                  {unit === "C"
                    ? temperatureInCelsius(main?.temp_max)
                    : temperatureInFahrenheit(main?.temp_max)}
                  °{unit}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center mt-5 text-white py-4 rounded-lg">
                <div className="text-white">
                  <p className="text-lg">Humidity</p>
                  <p className="text-2xl">{main?.humidity}%</p>
                </div>
                <div className="text-white">
                  <p className="text-lg">Pressure</p>
                  <p className="text-2xl">{main?.pressure} hPa</p>
                </div>
                <div className="text-white">
                  <p className="text-lg">Wind Speed</p>
                  <p className="text-2xl">{wind?.speed} m/s</p>
                </div>
                <div className="text-white">
                  <p className="text-lg">Cloudiness</p>
                  <p className="text-2xl">{weather[0]?.main}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
