"use client";
import { useState, useEffect } from "react";
import Hours from "@/components/Hours";
import Days from "@/components/Days";
import { Loader2 } from "lucide-react";
import { WeatherData } from "@/type/types"; 
import Current from "@/components/Current";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = "cc484c798f974ef1be843345250302";
        const BASE_URL = "https://api.weatherapi.com/v1";
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
    <div className="max-w-2xl mx-auto my-28">
      <div className="z-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin text-white h-10 w-10" />
          </div>
        ) : weatherData ? (
          <>
            <Current
              name={weatherData.location.name}
              degree={weatherData.current.temp_c}
              text={weatherData.current.condition.text}
              onDataSubmit={handleDataSubmit}
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
