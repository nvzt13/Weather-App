"use client";
import { useState, useEffect } from "react";
import Hours from "@/components/Hours";
import Days from "@/components/Days";
import Form from "@/components/Form";
import { Loader2 } from "lucide-react";
import { WeatherData } from "@/type/types"; 
import Current from "@/components/Current";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        const BASE_URL = "http://api.weatherapi.com/v1";
        const response = await fetch(
          `${BASE_URL}/forecast.json?key=${apiKey}&q=Bitlis&days=7&aqi=no&alerts=no`
        );

        if (!response.ok) {
          throw new Error("Şehir bulunamadı");
        }

        const data = await response.json();
        console.log(data);
        const hoursData = data.forecast.forecastday[0].hour.map((hour: {time: string, temp_c: number, condition:{icon: string}}) => ({
          time: hour.time,
          temp: hour.temp_c,
          icon: hour.condition.icon,
        }));

        const daysData = data.forecast.forecastday.map((day: {date: string, day:{maxtemp_c:number, mintemp_c:number, condition: {text: string, icon: string}}}) => ({
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

        setLoading(false);
      } catch (error) {
        console.error("Hata:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const handleDataSubmit = (data: WeatherData) => {
    setWeatherData(data);
  };

  return (
    <div className="relative min-h-screen max-w-2xl mx-auto mb-32">
      <div className="relative z-10">
        <Form onDataSubmit={handleDataSubmit} />

        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Loader2 className="animate-spin text-white h-10 w-10" />
          </div>
        ) : weatherData ? (
          <>
            <Current
              name={weatherData.location.name}
              degree={weatherData.current.temp_c}
              test={weatherData.current.condition.text}
            />
            <Hours hours={weatherData.hours} />
            <Days days={weatherData.days} />
          </>
        ) : (
          <div className="text-center text-white">Veri bulunamadı.</div>
        )}
      </div>
    </div>
  );
}
