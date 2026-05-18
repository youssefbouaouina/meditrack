import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../shared/api/client";
export const useUserMedications = () => useQuery({
    queryKey: ["user-medications"],
    queryFn: async () => {
        const { data } = await apiClient.get("/api/user-medications/");
        return data.results;
    },
    staleTime: 30000
});
export const useAddMedication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {
            const { data } = await apiClient.post("/api/user-medications/", payload);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-medications"] });
            queryClient.invalidateQueries({ queryKey: ["medication-stats"] });
        }
    });
};
export const useUpdateMedication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, payload }) => {
            const { data } = await apiClient.patch(`/api/user-medications/${id}/`, payload);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-medications"] });
            queryClient.invalidateQueries({ queryKey: ["medication-stats"] });
        }
    });
};
export const useDeleteMedication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            await apiClient.delete(`/api/user-medications/${id}/`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-medications"] });
            queryClient.invalidateQueries({ queryKey: ["medication-stats"] });
        }
    });
};
