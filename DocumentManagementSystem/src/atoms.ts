import { atom } from "recoil";

export interface IContact {
  id: string;
  name: string;
  address: string;
  phone: string;
  created_at: string;
  manager_id: string;
}

export const clientContacts = atom<IContact[]>({
  key: "contacs",
  default: [],
});

export const token = atom<string>({
  key: "token",
  default: "",
});
