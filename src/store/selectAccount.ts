import { Accounts } from "types/accounts";
import { proxy } from "valtio";

export const selectAccountStore = proxy<{
  account: Accounts | null
}>({
  account: null
});
