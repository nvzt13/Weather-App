'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hours from '@/components/Hours';
import Days from '@/components/Days';
import Form from '@/components/Form';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true); // Yüklenme durumunu takip etmek için

  // Varsayılan olarak Bitlis verilerini getir
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = 'cc484c798f974ef1be843345250302';
        const BASE_URL = "http://api.weatherapi.com/v1";
        const response = await fetch(`${BASE_URL}/forecast.json?key=${apiKey}&q=Bitlis&days=7&aqi=no&alerts=no`);

        if (!response.ok) {
          throw new Error('Şehir bulunamadı');
        }

        const data = await response.json();

        // Saatlik hava durumu verilerini gönder
        const hoursData = data.forecast.forecastday[0].hour.map(hour => ({
          time: hour.time,
          temp: hour.temp_c,
          icon: hour.condition.icon,
        }));

        // Haftalık hava durumu verilerini gönder
        const daysData = data.forecast.forecastday.map(day => ({
          date: day.date,
          maxTemp: day.day.maxtemp_c,
          minTemp: day.day.mintemp_c,
          condition: day.day.condition.text,
          icon: day.day.condition.icon,
        }));

        setWeatherData({
          location: data.location,
          current: data.current,
          hours: hoursData,
          days: daysData,
        });

        setLoading(false); // Yüklenme durumu bitti
      } catch (error) {
        console.error('Hata:', error);
        setLoading(false); // Yüklenme durumu bitti
      }
    };

    fetchWeatherData();
  }, []);

  // Formdan gelen veriyi al ve state'e kaydet
  const handleDataSubmit = (data) => {
    setWeatherData(data);
  };

  return (
    <div>
      <div className="fixed w-full h-screen bg-custom-sun bg-cover bg-no-repeat bg-[70%_10%] z-0"></div>
      <div className="relative min-h-screen max-w-2xl mx-auto">
        <div className="relative z-10">
          <Form onDataSubmit={handleDataSubmit} />

          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            weatherData && (
              <>
                <Header
                  name={weatherData.location.name}
                  degree={weatherData.current.temp_c}
                  feelslike={weatherData.current.feelslike_c}
                />
                <Hours hours={weatherData.hours} />
                <Days days={weatherData.days} />
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}