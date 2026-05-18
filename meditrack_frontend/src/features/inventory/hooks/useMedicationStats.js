import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../shared/api/client";
export const useMedicationStats = () => useQuery({
    queryKey: ["medication-stats"],
    queryFn: async () => {
        const { data } = await apiClient.get("/api/user-medications/stats/");
        return data;
    },
    staleTime: 30000
});
