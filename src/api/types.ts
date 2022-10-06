export interface User {
  id: number;
  userId: string;
  token?: string;
  address?: Address;
  displayName?: string;
  latitude: number;
  longitude: number;
}

export interface Address {
  address: string;
  addressEnglish: string;
  detail: string;
  zoncode: string;
  latitude: string;
  logitude: string;
}
