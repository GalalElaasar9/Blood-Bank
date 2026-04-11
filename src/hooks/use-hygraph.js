import { useQuery, useMutation } from "@tanstack/react-query";
import {
  hygraphClient,
  hygraphMutationClient,
  GET_HOSPITALS,
  GET_BLOOD_INVENTORY,
  CREATE_DONOR,
  PUBLISH_DONOR,
  GET_FEATURED_HOSPITALS,
  GET_BLOOD_INVENTORY_FILTERED
} from "@/lib/hygraph.js";
import { GET_FEATURED_HOSPITALS } from "../lib/hygraph";

export function useHospitals() {
  return useQuery({
    queryKey: ["hospitals"],
    queryFn: async () => {
      const data = await hygraphClient.request(GET_HOSPITALS);
      return data.hospitals;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useFeaturedHospitals(){
  return useQuery({
    queryKey:['featuredHospitails'],
    queryFn: async ()=>{
      const data = await hygraphClient.request(GET_FEATURED_HOSPITALS);
      return data.hospitals
    },
    staleTime: 1000 * 60 * 5,
  })
}

export function useBloodInventory() {
  return useQuery({
    queryKey: ["bloodInventory"],
    queryFn: async () => {
      const data = await hygraphClient.request(GET_BLOOD_INVENTORY);
      return data.bloodInventories;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateDonor() {
  return useMutation({
    mutationFn: async (variables) => {
      const data = await hygraphMutationClient.request(CREATE_DONOR, variables);
      await hygraphMutationClient.request(PUBLISH_DONOR, { id: data.createDonor.id });
      return data.createDonor;
    },
    onError: (err) => console.error(err),
    onSuccess: (donor) => console.log("Donor created", donor),
  });
}

export function useFeaturedHospitals() {
  return useQuery({
    queryKey: ["featuredHospitals"],
    queryFn: async () => {
      const data = await hygraphClient.request(GET_FEATURED_HOSPITALS);
      return data.hospitals;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useFilteredBloodInventory({ bloodType, city }) {
  return useQuery({
    queryKey: ["bloodInventory", bloodType, city],
    queryFn: async () => {
      const data = await hygraphClient.request(GET_BLOOD_INVENTORY_FILTERED, {
        bloodType,
        city,
      });
      return data.bloodInventories;
    },
    staleTime: 1000 * 60 * 5,
  });
}
