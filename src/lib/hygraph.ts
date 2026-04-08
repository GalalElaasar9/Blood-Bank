import { GraphQLClient, gql } from "graphql-request";

const HYGRAPH_CONTENT_API =
  "https://eu-west-2.cdn.hygraph.com/content/cmnht9h9r00j308w8mon0qg8p/master";

const HYGRAPH_MUTATION_API =
  "https://api-eu-west-2.hygraph.com/v2/cmnht9h9r00j308w8mon0qg8p/master";

export const hygraphClient = new GraphQLClient(HYGRAPH_CONTENT_API);

// Mutation client - uses auth token for write operations
export const hygraphMutationClient = new GraphQLClient(HYGRAPH_MUTATION_API);

export function setMutationAuth(token: string) {
  hygraphMutationClient.setHeader("Authorization", `Bearer ${token}`);
}

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
        address
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

// ── Mutations ───────────────────────────────────────────

export const CREATE_DONOR = gql`
  mutation CreateDonor(
    $name: String!
    $bloodType: BloodType!
    $phone: String!
    $city: City!
    $nationalId: String!
    $dateOfBirth: Date!
  ) {
    createDonor(
      data: {
        name: $name
        bloodType: $bloodType
        phone: $phone
        city: $city
        nationalId: $nationalId
        dateOfBirth: $dateOfBirth
      }
    ) {
      id
    }
  }
`;

export const PUBLISH_DONOR = gql`
  mutation PublishDonor($id: ID!) {
    publishDonor(where: { id: $id }) {
      id
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
