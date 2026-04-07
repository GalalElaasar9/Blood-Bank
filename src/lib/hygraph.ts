import { GraphQLClient, gql } from "graphql-request";

const HYGRAPH_CONTENT_API =
  "https://eu-west-2.cdn.hygraph.com/content/cmnht9h9r00j308w8mon0qg8p/master";

export const hygraphClient = new GraphQLClient(HYGRAPH_CONTENT_API);

// ── Queries ──────────────────────────────────────────────

export const GET_HOSPITALS = gql`
  query GetHospitals {
    hospitals {
      id
      name
      city
      address
      phone
      email
      whatsapp
      bloodInventories {
        id
        bloodType
        quantity
        price
      }
    }
  }
`;

export const GET_BLOOD_INVENTORY = gql`
  query GetBloodInventory {
    bloodInventories {
      id
      bloodType
      quantity
      price
      hospitals {
        id
        name
        city
        phone
        email
        whatsapp
      }
    }
  }
`;

export const GET_DONORS = gql`
  query GetDonors {
    donors {
      id
      name
      bloodType
      phone
      city
      nationalId
      dateOfBirth
      lastDonationDate
    }
  }
`;

// ── Types ────────────────────────────────────────────────

export interface BloodInventory {
  id: string;
  bloodType: string;
  quantity: number;
  price: number;
  hospitals?: Hospital[];
}

export interface Hospital {
  id: string;
  name: string;
  city: string;
  address?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  bloodInventories?: BloodInventory[];
}

export interface Donor {
  id: string;
  name: string;
  bloodType: string;
  phone: string;
  city: string;
  nationalId?: string;
  dateOfBirth?: string;
  lastDonationDate?: string;
}
