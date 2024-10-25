import React, { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import HourlyForecast from './components/HourlyForecast';
import ErrorMessage from './components/ErrorMessage';
import Navbar from './components/Navbar';
import type { WeatherData, WeatherError, ForecastData } from './types/weather';

// You need to replace this with your own API key from OpenWeather
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'YOUR_API_KEY';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/onecall';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (city: string) => {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
      setError('Please configure your OpenWeather API key');
      return;
    }

    setIsLoading(true);
    setError('');
    setWeather(null);
    setForecast(null);

    try {
      // Get current weather first to get coordinates
      const weatherResponse = await axios.get(WEATHER_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      });
      setWeather(weatherResponse.data);

      // Use coordinates to get hourly forecast
      const { lat, lon } = weatherResponse.data.coord;
      const forecastResponse = await axios.get(FORECAST_URL, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
          exclude: 'current,minutely,daily,alerts'
        }
      });
      setForecast(forecastResponse.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Invalid API key. Please check your OpenWeather API key configuration.');
      } else if (err.response?.status === 404) {
        setError('City not found. Please check the city name and try again.');
      } else {
        setError(err.message || 'Failed to fetch weather data');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <Navbar />
      <main className="pt-20 px-4 flex flex-col items-center">
        <div className="w-full max-w-4xl flex flex-col items-center pb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Real-Time Weather Updates</h1>
            <p className="text-white/80 text-lg">Get accurate weather information for any city worldwide</p>
          </div>
          
          <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg mb-8">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {isLoading && (
            <div className="flex items-center justify-center mt-8">
              <Loader2 className="animate-spin text-white" size={32} />
            </div>
          )}

          {error && <ErrorMessage message={error} />}
          
          {weather && <WeatherDisplay data={weather} />}
          
          {forecast && <HourlyForecast data={forecast.hourly} timezone_offset={forecast.timezone_offset} />}
        </div>
      </main>
    </div>
  );
}

export default App;