export interface CityData {
  ascii_name: string;
  cou_name_en: string;
  timezone: string;
  coordinates: Coordinates
}

export interface Coordinates {
  lon: number;
  lat: number;
}



export interface WeatherData {
  name: string;
  main: MainData;
  sys: SysData;
  weather: WeatherInfo[];
  wind: WindData;
}

export interface MainData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface SysData {
  country: string;
}

export interface WeatherInfo {
  description: string;
  icon: string;
  main: string;
}

export interface WindData {
  speed: number;
}

