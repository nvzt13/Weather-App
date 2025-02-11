import { HoursProps } from "@/type/types";
import Image from "next/image";
export default function Hours({ hours }: HoursProps) {
  return (
    <section className="text-white p-8 rounded-lg bg-sky-400 opacity-80 mx-auto">
      <div className="flex items-center justify-center flex-col space-y-8">
        <h2 className="text-3xl font-bold text-center">Hourly Forecast</h2>
        <div className="hours-container flex overflow-x-auto w-full gap-6 p-4">
          <div className="hours flex gap-6 p-4">
            {hours.map((hour, index) => (
              <div
                key={index}
                className="hour flex flex-col items-center justify-center bg-white text-gray-800 p-6 rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="day text-xl font-semibold text-gray-700">
                  {new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="icon-container my-2">
                  <Image
                    src={`https:${hour.icon}`}
                    alt="Weather Icon"
                    className="w-12 h-12 rounded-full border-2 border-blue-400 p-2 transition-transform duration-300 hover:scale-110"
                    width={40}
                    height={40}
                  />
                </div>
                <p className="degree text-xl font-semibold text-blue-500">{hour.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
