"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { KabupatanKota } from "./interface/interface";
import { fetchAllCities, searchData } from "./handler";

export function useSolat() {
    const [originalCities, setOriginalCities] = useState<KabupatanKota[]>([]);
    const [allCities, setAllCities] = useState<KabupatanKota[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [searching, setSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fetchAllCities()
        .then((cities) => {
            setOriginalCities(cities);
            setAllCities(cities); 
        })
        .catch((err) => {
            setError(err instanceof Error ? err.message : "Terjadi kesalahan");
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    
    const handleSearch = useCallback(
    (query: string) => {
        setSearchTerm(query);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (query.trim() === "") {
            setAllCities(originalCities);
            setSearching(false);
            return;
        }

        setSearching(true);


        searchTimeoutRef.current = setTimeout(async () => {

            try {
              const results = await searchData(query);

              
              if (Array.isArray(results)) {
                setAllCities(results);
              } else {
                console.error("Gagal melakukan pencarian:", results.message);
                setAllCities([]); 
              }
            } catch (error) {
              console.error(
                "Terjadi kesalahan pada jaringan atau server:",
                error,
              );
              setAllCities([]);
            } finally {
              setSearching(false);
            }


            // setAllCities(results);
            // setSearching(false);
        }, 300);
    },
    [originalCities], 
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
