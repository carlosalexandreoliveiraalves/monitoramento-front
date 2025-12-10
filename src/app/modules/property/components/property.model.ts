// src/app/models/property.model.ts

import { Person } from "../../user/user.model";

// Importe a interface de Person que você já tem

export interface Property {
    id?: string;
    areaHa: string;
    address: string;
    person?: Person; // Objeto completo vindo do GET
}

// O que enviamos para o Backend (DTO)
export interface PropertyDTO {
    areaHa: string;
    address: string;
    personId: string; // Apenas o ID para vincular no POST/PUT
}

export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
}