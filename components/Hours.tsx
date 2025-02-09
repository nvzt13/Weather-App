export default function Hours({ hours }) {
  return (
    <section className="main bg-gradient-to-b from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg mx-auto">
      <div className="flex items-center justify-center flex-col space-y-6">
        <div className="description text-center">
          <p className="text-lg font-medium leading-relaxed">
            Yakınlık (Proximity) İlkesi: Nesneler birbirine ne kadar yakınsa, bir grup olarak algılanma olasılıkları o kadar yüksektir.
          </p>
        </div>

        <div className="hours flex overflow-auto w-full gap-4">
          {hours.map((hour, index) => (
            <div
              key={index}
              className="hour flex flex-col items-center justify-center bg-white text-gray-800 p-4 rounded-lg shadow-md"
            >
              <div className="day text-lg font-bold">
  {new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
</div>
              <i className="text-blue-500 text-3xl">
                <img src={hour.icon} alt="Weather Icon" className="w-10 h-10" />
              </i>
              <p className="degree text-lg">{hour.temp}°C</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}