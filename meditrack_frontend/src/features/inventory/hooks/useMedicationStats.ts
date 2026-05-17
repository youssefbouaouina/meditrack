import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../shared/api/client";
import { MedicationStats } from "../../../shared/types";

export const useMedicationStats = () =>
  useQuery({
    queryKey: ["medication-stats"],
    queryFn: async () => {
      const { data } = await apiClient.get<MedicationStats>("/api/user-medications/stats/");
      return data;
    },
    staleTime: 30_000
  });
