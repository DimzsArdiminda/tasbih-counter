import axios from "axios";


export const domain = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:3000';

export const api = axios.create({
    baseURL: `${domain}/api`,
    headers : {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});

export const endpoint = {
    sholat : {
        fetchAllCities: () => api.get("/cities"),
    },
    dzikir: {
        // Dzikir presets
        fetchAll: () => api.get("/dzikir/all"),
        fetchById: () => api.get("/dzikir/byid"),
        addCustom: (payload: { name: string; arabic: string; translation: string; targetDefault: number; userId: string }) =>
            api.post("/dzikir/add", payload),
        deleteById: (id: string) => api.delete(`/dzikir/byid/delete/${id}`),

        // Target count
        fetchAllTarget: () => api.get("/dzikir/targetcount/all"),
        fetchTargetById: () => api.get("/dzikir/targetcount/byid"),
        addCustomTarget: (payload: { target: number; userId: string }) =>
            api.post("/dzikir/targetcount/add", payload),
        deleteTarget: (id: string) => api.delete(`/dzikir/targetcount/delete/${id}`),

        // History
        fetchHistory: () => api.get("/dzikir/history"),
        addHistory: (payload: { dhikrName: string; count: number; target: number; completed: boolean }) =>
            api.post("/dzikir/history", payload),
        deleteHistory: (id: string) => api.delete(`/dzikir/history/${id}`),
        clearHistory: () => api.delete("/dzikir/history/clear"),
    },
};
