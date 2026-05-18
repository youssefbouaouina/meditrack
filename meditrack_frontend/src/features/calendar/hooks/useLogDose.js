import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../shared/api/client";
export const useMarkTaken = (start, end) => {
    const queryClient = useQueryClient();
    const queryKey = ["adherence-logs", start, end];
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await apiClient.patch(`/api/adherence-logs/${id}/`, { status: "taken" });
            return data;
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey });
            const previous = queryClient.getQueryData(queryKey);
            if (previous) {
                const updatedLogs = previous.logs.map((log) => log.id === id ? { ...log, status: "taken", taken_at: new Date().toISOString() } : log);
                const grouped = updatedLogs.reduce((acc, log) => {
                    const key = log.scheduled_time.slice(0, 10);
                    acc[key] = acc[key] ? [...acc[key], log] : [log];
                    return acc;
                }, {});
                queryClient.setQueryData(queryKey, { logs: updatedLogs, grouped });
            }
            return { previous };
        },
        onError: (_error, _variables, context) => {
            if (context?.previous) {
                queryClient.setQueryData(queryKey, context.previous);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            queryClient.invalidateQueries({ queryKey: ["medication-stats"] });
        }
    });
};
