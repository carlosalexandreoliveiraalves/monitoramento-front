import { Property } from "../property/components/property.model";


export type DeviceStatus = 'Active' | 'Inactive' | 'Maintenance';

export interface Device {
  id: string;
  name: string;
  status: DeviceStatus;
  temperature: string;
  phProbe: string;
  turbidity: string;
  property?: Property; // Objeto completo vindo do GET
}

// DTO para envio ao Backend
export interface DeviceDTO {
  name: string;
  status: DeviceStatus;
  temperature: string;
  phProbe: string;
  turbidity: string;
  propertyId: string; // ID para vínculo
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}