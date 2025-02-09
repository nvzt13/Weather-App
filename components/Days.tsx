import { WiDegrees } from "react-icons/wi";

export default function Days({ days }) {
  return (
    <section className="days bg-gradient-to-b from-blue-500 to-blue-700 p-6 rounded-lg shadow-lg mx-auto">
      <div className="flex items-center justify-center flex-col h-full space-y-6">
        {days.map((day, index) => (
          <div key={index} className="day flex items-center justify-around w-full bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-700 font-semibold">{day.date}</p>
            <img src={day.icon} alt="weather condition" className="w-10 h-10" />
            <p className="text-gray-700">{day.condition}</p>
            <p className="text-gray-700">{day.maxTemp}°C</p>
            <WiDegrees className="text-blue-500 text-3xl" />
            <p className="text-gray-500">{day.minTemp}°C</p>
          </div>
        ))}
      </div>
    </section>
  );
}