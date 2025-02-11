export type WeatherData = {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  hours: {
    time: string;
    temp: number;
    icon: string;
  }[];
  days: {
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    icon: string;
  }[];
};

export interface FormProps {
  onDataSubmit: (data: WeatherData) => void;
}
export interface CurrentProps {
  name: string;
  degree: number;
  text: string;
  onDataSubmit: (data: WeatherData) => void;
}
export interface HeaderProps {
  name: string;
  degree: number;
  test: string;
}
export interface HoursProps {
  hours: {
    time: string;
    temp: number;
    icon: string;
  }[];
}
export interface DaysProps { 
  days: {
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    icon: string;
  }[];
}