import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { HourlyForecast } from '../types/weather';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface HourlyForecastProps {
  data: HourlyForecast[];
  timezone_offset: number;
}

export default function HourlyForecast({ data, timezone_offset }: HourlyForecastProps) {
  const next24Hours = data.slice(0, 24);

  const formatHour = (timestamp: number) => {
    const date = new Date((timestamp + timezone_offset) * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
  };

  const chartData = {
    labels: next24Hours.map(hour => formatHour(hour.dt)),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: next24Hours.map(hour => Math.round(hour.temp)),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1e293b',
        bodyColor: '#1e293b',
        borderColor: 'rgb(226, 232, 240)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => `${context.parsed.y}°C`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
        },
        ticks: {
          callback: (value: number) => `${value}°C`,
        },
      },
    },
  };

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-lg p-6 mt-6 w-full">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">24-Hour Forecast</h3>
      <div className="h-[300px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}