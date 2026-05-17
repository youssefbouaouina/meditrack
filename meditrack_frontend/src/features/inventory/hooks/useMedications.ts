import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../shared/api/client";
import { Medication, UserMedication } from "../../../shared/types";

interface PaginatedResponse<T> {
  results: T[];
}

export interface MedicationPayload extends Omit<Medication, "id"> {
  barcode: string | null;
}

export interface UserMedicationPayload {
  medication: MedicationPayload;
  dosage: string;
  frequency: "once_daily" | "twice_daily" | "three_times_daily" | "custom";
  schedule_times: string[];
  start_date: string;
  end_date: string | null;
  stock_count: number;
  stock_threshold: number;
  is_active: boolean;
  notes: string;
}

export const useUserMedications = () =>
  useQuery({
    queryKey: ["user-medications"],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedResponse<UserMedication>>("/api/user-medications/");
      return data.results;
    },
    staleTime: 30_000
  });

export const useAddMedication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UserMedicationPayload) => {
      const { data } = await apiClient.post<UserMedication>("/api/user-medications/", payload);
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
    mutationFn: async ({ id, payload }: { id: number; payload: Partial<UserMedicationPayload> }) => {
      const { data } = await apiClient.patch<UserMedication>(`/api/user-medications/${id}/`, payload);
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
    mutationFn: async (id: number) => {
      await apiClient.delete(`/api/user-medications/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-medications"] });
      queryClient.invalidateQueries({ queryKey: ["medication-stats"] });
    }
  });
};
