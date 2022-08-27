export interface User {
  id: number;
  userId: string;
  jwt?: string;
  address?: Address;
}

export interface Address {
  address: string;
  addressEnglish: string;
  detail: string;
  zoncode: string;
  latitude: string;
  logitude: string;
}
