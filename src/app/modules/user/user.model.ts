export interface Person {
  id?: string; // O backend usa BaseEntity, assumindo que gera um ID
  name: string;
  email: string;
  role: string;
}

// Interface auxiliar para a paginação do Spring
export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // página atual (0-index)
}