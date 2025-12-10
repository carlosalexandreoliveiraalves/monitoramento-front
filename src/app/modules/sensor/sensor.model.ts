import { Device } from "../device/device.model";

export type SensorType = 'Temperature' | 'Ph' | 'Turbidity';

export interface Sensor {
  id: string;
  name: string;
  sensorType: SensorType;
  device?: Device; // Objeto completo vindo do GET
}

// DTO para envio
export interface SensorDTO {
  name: string;
  sensorType: SensorType;
  deviceId: string; // ID para vínculo
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}