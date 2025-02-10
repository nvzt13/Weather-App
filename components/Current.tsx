import { WiDegrees } from "react-icons/wi";
import { HeaderProps } from "@/type/types";

export default function Current({name, degree, test}: HeaderProps) {
  return (
    <section className="header bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 rounded-lg shadow-lg mx-auto">
      <div className="flex items-center justify-center flex-col h-80 space-y-4">
        <h2 className="text-4xl font-bold tracking-wide">{name}</h2>
        <div className="flex items-center relative">
          <h1 className="text-7xl font-extrabold">{degree}</h1>
          <WiDegrees className="text-[120px] absolute left-14 top-[-20px] text-white opacity-80" />
        </div>
        <p className="text-xl italic">{test}</p>
        
      </div>
    </section>
  );
}