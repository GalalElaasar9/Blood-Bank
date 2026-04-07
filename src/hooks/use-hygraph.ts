import { useQuery } from "@tanstack/react-query";
import {
  hygraphClient,
  GET_HOSPITALS,
  GET_BLOOD_INVENTORY,
  Hospital,
  BloodInventory,
} from "@/lib/hygraph";

export function useHospitals() {
  return useQuery<Hospital[]>({
    queryKey: ["hospitals"],
    queryFn: async () => {
      const data = await hygraphClient.request<{ hospitals: Hospital[] }>(GET_HOSPITALS);
      return data.hospitals;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useBloodInventory() {
  return useQuery<BloodInventory[]>({
    queryKey: ["bloodInventory"],
    queryFn: async () => {
      const data = await hygraphClient.request<{ bloodInventories: BloodInventory[] }>(
        GET_BLOOD_INVENTORY
      );
      return data.bloodInventories;
    },
    staleTime: 1000 * 60 * 5,
  });
}
