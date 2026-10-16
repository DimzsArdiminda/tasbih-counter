import { endpoint } from "../api/api";
import type { DhikrPreset, CustomTarget, DhikrRecord } from "./interface/interface";

export type { DhikrPreset, CustomTarget, DhikrRecord };

export const fetchAllDzikir = async (): Promise<DhikrPreset[]> => {
    try {
        const response = await endpoint.dzikir.fetchAll();

        if (!Array.isArray(response.data)) {
            console.error("Data is not an array:", response.data);
            return [];
        }

        return response.data.map((d: DhikrPreset) => ({
            id: d.id,
            name: d.name,
            arabic: d.arabic,
            translation: d.translation,
            targetDefault: d.targetDefault,
            userId: d.userId,
        }));
    } catch (error) {
        console.error("Error fetching all dzikir:", error);
        return [];
    }
};

export const fetchDzikirById = async (): Promise<DhikrPreset[]> => {
    try {
        const response = await endpoint.dzikir.fetchById();

        if (!Array.isArray(response.data)) {
            console.error("Data is not an array:", response.data);
            return [];
        }

        return response.data.map((d: DhikrPreset) => ({
            id: d.id,
            name: d.name,
            arabic: d.arabic,
            translation: d.translation,
            targetDefault: d.targetDefault,
            userId: d.userId,
        }));
    } catch (error) {
        console.error("Error fetching dzikir by id:", error);
        return [];
    }
};

export const addCustomDzikir = async (
    payload: { name: string; arabic: string; translation: string; targetDefault: number; userId: string }
): Promise<DhikrPreset> => {
    const response = await endpoint.dzikir.addCustom(payload);
    return response.data as DhikrPreset;
};

export const deleteDzikirById = async (id: string): Promise<void> => {
    await endpoint.dzikir.deleteById(id);
};

export const fetchAllTarget = async (): Promise<CustomTarget[]> => {
    try {
        const response = await endpoint.dzikir.fetchAllTarget();

        if (!Array.isArray(response.data)) {
            console.error("Data is not an array:", response.data);
            return [];
        }

        return response.data.map((d: CustomTarget) => ({
            id: d.id,
            target: d.target,
            userId: d.userId,
        }));
    } catch (error) {
        console.error("Error fetching all targets:", error);
        throw error;
    }
};

export const fetchTargetById = async (): Promise<CustomTarget | null> => {
    try {
        const response = await endpoint.dzikir.fetchTargetById();

        if (Array.isArray(response.data) && response.data.length > 0) {
            return {
                id: response.data[0].id,
                target: response.data[0].target,
                userId: response.data[0].userId,
            };
        }

        return null;
    } catch (error) {
        console.error("Error fetching target by id:", error);
        return null;
    }
};

export const addCustomTarget = async (
    payload: { target: number; userId: string }
): Promise<CustomTarget> => {
    const response = await endpoint.dzikir.addCustomTarget(payload);
    return response.data as CustomTarget;
};

export const deleteCustomTarget = async (id: string): Promise<void> => {
    await endpoint.dzikir.deleteTarget(id);
};

// ─── History ───────────────────────────────────────────────────────────────

export const fetchDzikirHistory = async (): Promise<DhikrRecord[]> => {
    try {
        const response = await endpoint.dzikir.fetchHistory();

        if (!Array.isArray(response.data)) {
            console.error("History data is not an array:", response.data);
            return [];
        }

        return response.data as DhikrRecord[];
    } catch (error) {
        console.error("Error fetching dzikir history:", error);
        return [];
    }
};

export const addDzikirHistory = async (
    payload: { dhikrName: string; count: number; target: number; completed: boolean }
): Promise<DhikrRecord> => {
    const response = await endpoint.dzikir.addHistory(payload);
    return response.data as DhikrRecord;
};

export const deleteDzikirHistory = async (id: string): Promise<void> => {
    await endpoint.dzikir.deleteHistory(id);
};

export const clearDzikirHistory = async (): Promise<void> => {
    await endpoint.dzikir.clearHistory();
};