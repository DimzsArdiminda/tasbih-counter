import { endpoint } from "../api/api";
import type { KabupatanKota } from "./interface/interface";


export const fetchAllCities = async () : Promise<KabupatanKota[]> => {
    try{
        const response = await endpoint.sholat.fetchAllCities();
        const getFetch = response.data.data;
        if(!Array.isArray(getFetch)){
            console.error("Data is not an array:", response.data);
            return [];
        }
        // console.log("Fetched cities:", getFetch); // Log the fetched data for debugging
            // const data = getFetch.map((c: KabupatanKota) => ({
            //     id: c.id,
            //     lokasi: c.lokasi,
            // }));

        return getFetch;
    }catch(error) {
        console.error('Error fetching all cities:', error);
        return [];
    }
}