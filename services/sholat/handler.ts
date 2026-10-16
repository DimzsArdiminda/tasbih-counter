import { endpoint } from "../api/api";
import type { KabupatanKota } from "./interface/interface";


export const searchData = async (query: string) => {
    try{
        const response = await endpoint.sholat.searchCities(query);
        if(!response.data || !Array.isArray(response.data.data)){
            console.error("Invalid response data:", response.data);
            return [];
        }
        return response.data.data;
    }catch(error){
        console.error('Error searching cities:', error);
        return [];
    }
}

export const fetchAllCities = async () : Promise<KabupatanKota[]> => {
    try{
        const response = await endpoint.sholat.fetchAllCities();
        const getFetch = response.data.data;
        if(!Array.isArray(getFetch)){
            console.error("Data is not an array:", response.data);
            return [];
        }
        return getFetch;
    }catch(error) {
        console.error('Error fetching all cities:', error);
        return [];
    }
}