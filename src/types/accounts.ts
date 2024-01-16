import { Pageable, Sort2 } from "./users";

export interface RootAccounts {
  content: Accounts[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort2;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface Accounts {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  createDate: string;
  lastUpdateDate: string;
  username: string;
}

export interface CheckedAccount extends Accounts {
  checked: boolean;
}
