import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../shared/api/client";
import { AdherenceLog } from "../../../shared/types";
import { format } from "date-fns";

interface PaginatedResponse<T> {
  results: T[];
}

export interface AdherenceLogData {
  logs: AdherenceLog[];
  grouped: Record<string, AdherenceLog[]>;
}

export const useAdherenceLogs = (startDate: Date, endDate: Date) => {
  const start = format(startDate, "yyyy-MM-dd");
  const end = format(endDate, "yyyy-MM-dd");

  return useQuery({
    queryKey: ["adherence-logs", start, end],
    queryFn: async (): Promise<AdherenceLogData> => {
      const { data } = await apiClient.get<PaginatedResponse<AdherenceLog>>(
        `/api/adherence-logs/?start=${start}&end=${end}`
      );
      const grouped = data.results.reduce<Record<string, AdherenceLog[]>>((acc, log) => {
        const key = log.scheduled_time.slice(0, 10);
        acc[key] = acc[key] ? [...acc[key], log] : [log];
        return acc;
      }, {});
      return { logs: data.results, grouped };
    },
    staleTime: 60_000
  });
};
