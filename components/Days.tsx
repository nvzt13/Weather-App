import { DaysProps } from "@/type/types";
import Image from "next/image";

// Function to get the day name from the date
const getDayName = (dateString: string): string => {
  const date = new Date(dateString);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return dayNames[date.getDay()]; 
};

export default function Days({ days }: DaysProps) {
  return (
    <section className=" p-8 rounded-lg mx-auto my-12 bg-sky-400 opacity-80">
      <h3 className="text-3xl font-bold text-center text-white my-12">Days Forecast</h3>
      <div className="flex items-center justify-center flex-col h-full space-y-6">
        {days.map((day, index) => (
          <div key={index} className="day flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-md pe-8">
            <p className="text-gray-700 sm:w-12  font-semibold">{getDayName(day.date)}</p>
            <Image width={40} height={40} src={`https:${day.icon}`} alt="weather condition" className="w-10 h-10" />
            <p className="text-gray-700">{Math.floor(day.maxTemp)}°C</p>
            <div className="relative w-1/3 h-2 bg-gradient-to-r from-red-500 to-blue-300 rounded-full">
              <div
                className={`absolute top-0 left-0 h-full bg-red-500 rounded-full`}
              />
            </div>
            <p className="text-gray-500">{Math.floor(day.minTemp)}°C</p>
          </div>
        ))}
      </div>
    </section>
  );
}
