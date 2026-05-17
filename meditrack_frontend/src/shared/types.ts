export interface User {
  id: number;
  username: string;
  email: string;
  date_joined: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface Medication {
  id: number;
  name: string;
  barcode: string | null;
  active_substance: string;
  form: string;
  manufacturer: string;
}

export interface UserMedication {
  id: number;
  medication: Medication;
  dosage: string;
  frequency: "once_daily" | "twice_daily" | "three_times_daily" | "custom";
  schedule_times: string[];
  start_date: string;
  end_date: string | null;
  stock_count: number;
  stock_threshold: number;
  is_active: boolean;
  notes: string;
  created_at: string;
}

export type AdherenceStatus = "upcoming" | "taken" | "missed";

export interface AdherenceLog {
  id: number;
  user_medication: UserMedication;
  scheduled_time: string;
  taken_at: string | null;
  status: AdherenceStatus;
  notes: string;
}

export type InteractionSeverity = "low" | "moderate" | "high";

export interface DrugInteraction {
  id: number;
  substance_a: string;
  substance_b: string;
  severity: InteractionSeverity;
  description: string;
}

export interface MedicationStats {
  total_medications: number;
  active_medications: number;
  low_stock_count: number;
  critical_stock_count: number;
}
