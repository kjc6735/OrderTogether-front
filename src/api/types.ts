export interface User {
  id: number;
  userId: string;
  token: string;
  address?: Address;
  displayName?: string;
  latitude: number;
  longitude: number;
}
/*

{"addressEn": null, "addressKo": "원주 우산동 상지대학교 치악관", "createdAt": "2022-10-05T09:08:37.227Z", "deletedAt": null, "describe": "str", "detail": null, "id": 1, "latitude": 37.3718538, "longitude": 127.9317158, "storeId": 2, "title": "reboot", "updatedAt": "2022-10-05T09:08:37.227Z", "userId": 1}
*/

export interface Post {
  id: number;
  addressEn?: string;
  addressKo: string;
  latitude: number;
  longitude: number;
  createAt: Date;
  deleteAt?: Date;
  title: string;
  describe: string;
  detail?: string;
  storeId?: number;
  userId: number;
}

export interface Address {
  address: string;
  addressEnglish: string;
  detail: string;
  zoncode: string;
  latitude: string;
  logitude: string;
}

export type Category = {
  id: number;
  name: string;
};

export type SubCategory = {
  id: number;
  name: string;
  categoryId: number;
};
