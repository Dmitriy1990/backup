export interface RootUsers {
  content: Content[];
  pageable: Pageable;
  size: number;
  number: number;
  sort: Sort2;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  totalPages: number;
  totalElements: number;
}

export interface Content {
  username: string;
  enabled: boolean;
  groups: string[];
}

export interface CheckedUsers extends Content {
  checked: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Sort2 {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export enum USER_ROLES {
  GROUP_ADMIN = "GROUP_ADMIN",
  GROUP_USER = "GROUP_USER",
}
