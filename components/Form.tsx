'use client';

import { FormProps } from '@/type/types';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';

export default function Form({ onDataSubmit }: FormProps) {
  const [city, setCity] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiKey = 'cc484c798f974ef1be843345250302';
      const BASE_URL = 'http://api.weatherapi.com/v1';
      const response = await fetch(`${BASE_URL}/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`);

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();

      const hoursData = data.forecast.forecastday[0].hour.map((hour: { time: string; temp_c: number; condition: { icon: string } }) => ({
        time: hour.time,
        temp: hour.temp_c,
        icon: hour.condition.icon,
      }));

      const daysData = data.forecast.forecastday.map((day: { date: string; day: { maxtemp_c: number; mintemp_c: number; condition: { text: string; icon: string } } }) => ({
        date: day.date,
        maxTemp: day.day.maxtemp_c,
        minTemp: day.day.mintemp_c,
        condition: day.day.condition.text,
        icon: day.day.condition.icon,
      }));

      onDataSubmit({
        location: data.location,
        current: data.current,
        hours: hoursData,
        days: daysData,
      });

      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-blue-500 to-blue-700 p-24">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform transform hover:scale-105 duration-300">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700 text-sm font-semibold mb-2">
              City Name
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter City Name"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-lg transition-colors duration-300 hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? <Loader2Icon className='animate-spin mx-auto' /> : 'Search'}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-500 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
