"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/hooks/useAlert";
import type { DhikrPreset, CustomTarget, DhikrRecord } from "./interface/interface";
import {
    fetchAllDzikir,
    fetchDzikirById,
    fetchAllTarget,
    fetchTargetById,
    fetchDzikirHistory,
    addCustomDzikir,
    addCustomTarget,
    addDzikirHistory,
    deleteDzikirById,
    deleteCustomTarget,
    deleteDzikirHistory,
    clearDzikirHistory,
} from "./handler";

export function useTasbih() {
    const { data: session } = useSession();
    const { success, error, confirm } = useAlert();
    const router = useRouter();

    const [count, setCount] = useState(0);
    const [allDhikrs, setAllDhikrs] = useState<DhikrPreset[]>([]);
    const [dzikirById, setDzikirById] = useState<DhikrPreset[]>([]);
    const [selectedDhikr, setSelectedDhikr] = useState<DhikrPreset | null>(null);
    const [target, setTarget] = useState<number>(33);
    const [targetById, setTargetById] = useState<CustomTarget | null>(null);
    const [allTarget, setAllTarget] = useState<CustomTarget[]>([]);
    const [customTarget, setCustomTarget] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [records, setRecords] = useState<DhikrRecord[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [vibrationEnabled, setVibrationEnabled] = useState(true);
    const [animate, setAnimate] = useState(false);
    const [showCustomDhikrModal, setShowCustomDhikrModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"all" | "custom">("all");

    useEffect(() => {
        fetchAllDzikir().then((apiDhikrs) => {
            setAllDhikrs(apiDhikrs);
            if (apiDhikrs.length > 0) {
                setSelectedDhikr(apiDhikrs[0]);
                setTarget(apiDhikrs[0].targetDefault);
            }
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        fetchAllTarget()
            .then((apiTarget) => {
                setAllTarget(apiTarget);
                if (apiTarget.length > 0) setTarget(apiTarget[0].target);
            })
            .catch(() => setTarget(33))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (!session?.user?.id) return;
        fetchDzikirById()
            .then(setDzikirById)
            .finally(() => setIsLoading(false));
    }, [session?.user?.id]);

    useEffect(() => {
        if (!session?.user?.id) return;
        fetchTargetById()
            .then(setTargetById)
            .finally(() => setIsLoading(false));
    }, [session?.user?.id]);

    useEffect(() => {
        if (!session?.user?.id) { setRecords([]); return; }
        fetchDzikirHistory()
            .then(setRecords)
            .finally(() => setIsLoading(false));
    }, [session?.user?.id]);

    // ─── Handlers ───────────────────────────────────────────────────────────

    const playSound = () => {
        if (soundEnabled) {
            const audio = new Audio(
                "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiToIGGS56+iYSgoSVKzn8LJnHgU7k9r0yH8yBSh+zPLaizsIG2S45+iVSQoRU6vn8LJnHgU7lNr0yH8yBSh+zPLaizsIG2S45+iVSQoRU6vn8LJnHgU7lNr0yH8yBSh+zPLaizsIG2S45+iVSQoRU6vn8LJnHgU7lNr0",
            );
            audio.play().catch(() => {});
        }
    };

    const vibrate = () => {
        if (vibrationEnabled && navigator.vibrate) {
            navigator.vibrate(200);
        }
    };

    const saveRecord = async (completed: boolean) => {
        if (!selectedDhikr) return;
        if (!session?.user?.id) throw new Error("Anda harus login terlebih dahulu");

        const created = await addDzikirHistory({
            dhikrName: selectedDhikr.name,
            count: completed ? target : count,
            target,
            completed,
        });

        setRecords((prev) => [created, ...prev].slice(0, 50));
    };

    const handleIncrement = () => {
        if (!selectedDhikr) return;

        setCount((prev) => prev + 1);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 200);
        playSound();
        vibrate();

        if (count + 1 === target) {
            void saveRecord(true).catch((err) => console.error("Error saving completed dzikir history:", err));
            setTimeout(() => {
                success("Alhamdulillah!", `Anda telah menyelesaikan ${target}x ${selectedDhikr.name}`);
            }, 100);
        }
    };

    const handleReset = () => {
        if (count > 0) {
            confirm("Reset Dzikir?", "Apakah Anda ingin menyimpan progress ini sebelum reset?").then((result) => {
                if (result.isConfirmed) {
                    void saveRecord(false).catch((err) => console.error("Error saving reset dzikir history:", err));
                }
                setCount(0);
            });
        } else {
            setCount(0);
        }
    };

    const handleDhikrChange = (preset: DhikrPreset) => {
        setSelectedDhikr(preset);
        setTarget(preset.targetDefault);
        setCount(0);
    };

    const handleTargetChange = (newTarget: number) => {
        setTarget(newTarget);
        setShowCustomInput(false);
        if (count > newTarget) setCount(0);
    };

    const handleAddCustomDhikr = async (
        name: string,
        arabic: string,
        translation: string,
        targetDefault: number,
    ) => {
        if (!session?.user?.id) throw new Error("Anda harus login terlebih dahulu");

        const newDhikr = await addCustomDzikir({ name, arabic, translation, targetDefault, userId: session.user.id });
        setAllDhikrs((prev) => [...prev, { ...newDhikr, userId: session?.user?.id }]);
        router.refresh();
    };

    const handleAddCustomTarget = async (value: number) => {
        if (!session?.user?.id) throw new Error("Anda harus login terlebih dahulu");

        const newTarget = await addCustomTarget({ target: value, userId: session.user.id });
        const newCustomTarget: CustomTarget = { ...newTarget, userId: session?.user?.id };
        setAllTarget((prev) => [...prev, newCustomTarget]);
        setTarget(newCustomTarget.target);
        router.refresh();
    };

    const handleDeleteRecord = async (id: string) => {
        try {
            await deleteDzikirHistory(id);
            setRecords((prev) => prev.filter((r) => r.id !== id));
        } catch (err) {
            console.error("Error deleting dzikir history:", err);
            error("Terjadi Kesalahan", "Gagal menghapus history. Silakan coba lagi");
        }
    };

    const handleClearAllRecords = () => {
        confirm("Hapus Semua History?", "Tindakan ini tidak dapat dibatalkan").then(async (result) => {
            if (!result.isConfirmed) return;
            try {
                await clearDzikirHistory();
                setRecords([]);
                success("Berhasil", "Semua history telah dihapus");
            } catch (err) {
                console.error("Error clearing dzikir history:", err);
                error("Terjadi Kesalahan", "Gagal menghapus semua history. Silakan coba lagi");
            }
        });
    };

    const handleDeleteDzikir = async (id: string | undefined) => {
        if (!id) return;
        try {
            await deleteDzikirById(id);
            setDzikirById((prev) => prev.filter((d) => d.id !== id));
            setAllDhikrs((prev) => prev.filter((d) => d.id !== id));
            success("Berhasil", "Dzikir berhasil dihapus");
        } catch (err) {
            console.error("Error deleting dzikir:", err);
            error("Terjadi Kesalahan", "Gagal menghapus dzikir. Silakan coba lagi");
        }
    };

    const handleDeleteCustomTarget = async (id: string | undefined) => {
        if (!id) { console.warn("Delete called without target id"); return; }
        try {
            await deleteCustomTarget(id);
            setAllTarget((prev) => prev.filter((t) => t.id !== id));
            if (targetById?.id === id) setTargetById(null);
            success("Berhasil", "Target custom berhasil dihapus");
        } catch (err) {
            console.error("Error deleting custom target:", err);
            error("Terjadi Kesalahan", err instanceof Error ? err.message : "Gagal menghapus target custom");
        }
    };

    return {
        // state
        session,
        count,
        allDhikrs,
        dzikirById,
        selectedDhikr,
        target,
        targetById,
        allTarget,
        customTarget,
        showCustomInput,
        records,
        showHistory,
        soundEnabled,
        vibrationEnabled,
        animate,
        showCustomDhikrModal,
        isLoading,
        activeTab,
        // setters (UI-driven)
        setCustomTarget,
        setShowCustomInput,
        setShowHistory,
        setSoundEnabled,
        setVibrationEnabled,
        setShowCustomDhikrModal,
        setActiveTab,
        // handlers
        handleIncrement,
        handleReset,
        handleDhikrChange,
        handleTargetChange,
        handleAddCustomDhikr,
        handleAddCustomTarget,
        handleDeleteRecord,
        handleClearAllRecords,
        handleDeleteDzikir,
        handleDeleteCustomTarget,
    };
}
