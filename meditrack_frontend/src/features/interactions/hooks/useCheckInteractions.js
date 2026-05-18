import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../shared/api/client";
export const useCheckInteractions = (ids) => useQuery({
    queryKey: ["interactions", ids.join(",")],
    queryFn: async () => {
        const { data } = await apiClient.get(`/api/interactions/check/?ids=${ids.join(",")}`);
        return data;
    },
    enabled: ids.length >= 2,
    staleTime: 72 * 60 * 60 * 1000
});
