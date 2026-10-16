export interface DhikrPreset {
    id?: string;
    name: string;
    arabic: string;
    translation: string;
    targetDefault: number;
    userId?: string;
}

export interface CustomTarget {
    id?: string;
    target: number;
    userId?: string;
}

export interface DhikrRecord {
    id: string;
    dhikrName: string;
    count: number;
    target: number;
    date: string;
    completed: boolean;
}