'use client';
import { useState } from 'react';

export default function Form({ onDataSubmit }) {
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Yükleniyor durumunu göster
    setError(null);   // Hata mesajını temizle

    try {
      const apiKey = 'cc484c798f974ef1be843345250302';
      const BASE_URL ="http://api.weatherapi.com/v1"
      const response = await fetch(`${BASE_URL}/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`);
      
      if (!response.ok) {
        throw new Error('Şehir bulunamadı');
      }

      const data = await response.json();
console.log(data.forecast)
      // Saatlik hava durumu verilerini gönder
      const hoursData = data.forecast.forecastday[0].hour.map(hour => ({
        time: hour.time,
        temp: hour.temp_c,
        icon: hour.condition.icon
      }));

      // Haftalık hava durumu verilerini gönder
      const daysData = data.forecast.forecastday.map(day => ({
        date: day.date,
        maxTemp: day.day.maxtemp_c,
        minTemp: day.day.mintemp_c,
        condition: day.day.condition.text,
        icon: day.day.condition.icon
      }));

      onDataSubmit({
        location: data.location,
        current: data.current,
        hours: hoursData,
        days: daysData
      });

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-blue-500 to-blue-700 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform transform hover:scale-105 duration-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Hava Durumu Tahmini</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700 text-sm font-semibold mb-2">
              Şehir Adı
            </label>
            <input 
              type="text" 
              id="city" 
              value={city} 
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Şehir Adını Girin"
              required
            />
          </div>

          <button 
            type="submit" 
            className={`w-full bg-blue-600 text-white py-2 rounded-lg transition-colors duration-300 hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Yükleniyor...' : 'Tahmini Getir'}
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