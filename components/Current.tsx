import { WiDegrees } from "react-icons/wi";
import { CurrentProps } from "@/type/types";
import Form from '@/components/Form';

export default function Current({name, degree, text, onDataSubmit }: CurrentProps) {
  return (
    <div className="flex items-center justify-evenly flex-col p-8 text-white rounded-lg mx-auto h-[500px]">
      <h2 className="text-5xl font-bold tracking-wide drop-shadow-lg text-center">{name}</h2>
      <div className="flex items-center relative">
        <h1 className="text-6xl font-extrabold">{degree}</h1>
        <WiDegrees className="text-[100px] absolute -right-16 -top-8 text-white opacity-80" />
      </div>
      <p className="text-xl italic opacity-90 text-center">{text}</p>
      <Form onDataSubmit={onDataSubmit} />
    </div>
  );
}