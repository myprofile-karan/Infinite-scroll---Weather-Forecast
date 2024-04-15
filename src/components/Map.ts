import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { WeatherData } from "../types/types";

const globalMap = (mapRef: React.MutableRefObject<L.Map | null>, lat: number, lon: number, weatherData: WeatherData | null) => {
    useEffect(() => {
    function mapInitialize() {
      if (!weatherData) return;
      const map = L.map("map").setView([lat, lon], 2);

      // Initialize map
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );
      L.marker([lat, lon]).addTo(map);
      mapRef.current = map;
    }
    mapInitialize();

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [weatherData, lat, lon]);
};
export default globalMap