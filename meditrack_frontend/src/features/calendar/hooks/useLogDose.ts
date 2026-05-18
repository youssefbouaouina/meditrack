import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../shared/api/client";
import { AdherenceLog } from "../../../shared/types";
import { AdherenceLogData } from "./useAdherenceLogs";

export const useMarkTaken = (start: string, end: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["adherence-logs", start, end] as const;

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await apiClient.patch<AdherenceLog>(`/api/adherence-logs/${id}/`, { status: "taken" });
      return data;
    },
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<AdherenceLogData>(queryKey);
      if (previous) {
        const updatedLogs = previous.logs.map((log) =>
          log.id === id ? { ...log, status: "taken" as const, taken_at: new Date().toISOString() } : log
        );
        const grouped = updatedLogs.reduce<Record<string, AdherenceLog[]>>((acc, log) => {
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
