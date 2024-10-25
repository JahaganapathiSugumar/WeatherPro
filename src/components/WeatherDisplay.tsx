import React from 'react';
import { Cloud, Droplets, Wind } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherDisplayProps {
  data: WeatherData;
}

export default function WeatherDisplay({ data }: WeatherDisplayProps) {
  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-lg p-8 mt-6 w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">{data.name}</h2>
        <div className="flex justify-center items-center mt-4">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            className="w-24 h-24"
          />
          <span className="text-6xl font-bold text-gray-800">
            {Math.round(data.main.temp)}°C
          </span>
        </div>
        <p className="text-xl text-gray-600 capitalize mt-2">{data.weather[0].description}</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg transition-transform hover:scale-105">
          <Droplets className="text-blue-500 mb-2" size={28} />
          <span className="text-sm text-gray-600">Humidity</span>
          <span className="font-bold text-lg">{data.main.humidity}%</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg transition-transform hover:scale-105">
          <Wind className="text-blue-500 mb-2" size={28} />
          <span className="text-sm text-gray-600">Wind</span>
          <span className="font-bold text-lg">{Math.round(data.wind.speed)} m/s</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg transition-transform hover:scale-105">
          <Cloud className="text-blue-500 mb-2" size={28} />
          <span className="text-sm text-gray-600">Feels Like</span>
          <span className="font-bold text-lg">{Math.round(data.main.feels_like)}°C</span>
        </div>
      </div>
    </div>
  );
}