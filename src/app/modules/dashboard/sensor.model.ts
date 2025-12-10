export interface SensorRecord {
    _id: string;
    value: number;
    timestamp: string;
    createdAt: string;
    updatedAt: string;
}

// Interface para a resposta padrão da sua API
export interface ApiResponse<T> {
    success: boolean;
    count?: number;
    data: T;
}