export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
}

export interface HourlyForecast {
  dt: number;
  temp: number;
  weather: Array<{
    icon: string;
    description: string;
  }>;
}

export interface ForecastData {
  hourly: HourlyForecast[];
  timezone_offset: number;
}

export interface WeatherError {
  message: string;
}