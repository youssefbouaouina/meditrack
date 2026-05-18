import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../shared/api/client";
import { format } from "date-fns";
export const useAdherenceLogs = (startDate, endDate) => {
    const start = format(startDate, "yyyy-MM-dd");
    const end = format(endDate, "yyyy-MM-dd");
    return useQuery({
        queryKey: ["adherence-logs", start, end],
        queryFn: async () => {
            const { data } = await apiClient.get(`/api/adherence-logs/?start=${start}&end=${end}`);
            const grouped = data.results.reduce((acc, log) => {
                const key = log.scheduled_time.slice(0, 10);
                acc[key] = acc[key] ? [...acc[key], log] : [log];
                return acc;
            }, {});
            return { logs: data.results, grouped };
        },
        staleTime: 60000
    });
};
