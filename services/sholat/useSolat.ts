"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { KabupatanKota } from "./interface/interface";
import { fetchAllCities } from "./handler";

export function useSolat() {
    const [allCities, setAllCities] = useState<KabupatanKota[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [searching, setSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fetchAllCities()
        .then((cities) => {
            setAllCities(cities);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {}, [allCities]);

  // Debounced search function
    const handleSearch = useCallback(
        (query: string) => {
        setSearchTerm(query);

        // Clear previous timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (query.trim() === "") {
            setAllCities(allCities);
            setSearching(false);
            return;
        }

        setSearching(true);

        // Debounce search request
        searchTimeoutRef.current = setTimeout(async () => {
            try {
            const response = await fetch(
                `/api/cities/search?q=${encodeURIComponent(query.trim())}`,
            );
            if (!response.ok) throw new Error("Gagal mencari kota");
            const data = await response.json();
            if (data.data && Array.isArray(data.data)) {
                setAllCities(data.data);
            } else {
                setAllCities([]);
            }
            } catch (err) {
            console.error("Search error:", err);
            setAllCities([]);
            } finally {
            setSearching(false);
            }
        }, 300); // 300ms debounce
        },
        [allCities],
    );

    return {
        allCities,
        setAllCities,
        loading,
        error,
        searching,
        searchTerm,
        handleSearch,
    };
}