import { CheckedAccount } from "types/accounts";
import { CheckedUsers } from "types/users";
import { proxy } from "valtio";

export const addUserStore = proxy<{
  selectedAccounts: CheckedAccount[];
  selectedUsers: CheckedUsers[]
}>({
  selectedAccounts: [],
  selectedUsers: []
});
