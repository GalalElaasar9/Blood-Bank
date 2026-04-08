import { useQuery, useMutation } from "@tanstack/react-query";
import {
  hygraphClient,
  hygraphMutationClient,
  GET_HOSPITALS,
  GET_BLOOD_INVENTORY,
  CREATE_DONOR,
  PUBLISH_DONOR,
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

export function useCreateDonor() {
  return useMutation({
    mutationFn: async (variables: {
      name: string;
      bloodType: string;
      phone: string;
      city: string;
      nationalId: string;
      dateOfBirth: string;
    }) => {
      const data = await hygraphMutationClient.request<{ createDonor: { id: string } }>(
        CREATE_DONOR,
        variables
      );
      // Publish after creation
      await hygraphMutationClient.request(PUBLISH_DONOR, { id: data.createDonor.id });
      return data.createDonor;
    },
  });
}
