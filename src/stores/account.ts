import { ref } from "vue";
import { defineStore } from "pinia";

export const useAccountStore = defineStore(
  "account",
  () => {
    const account = ref<Account | null>(null);
    const setAccount = (newAccount: Account) => {
      account.value = newAccount;
    };
    const isLoggedIn = () => {
      return account.value !== null;
    };
    return {
      account,
      setAccount,
      isLoggedIn,
    };
  },
  {
    persist: true,
  }
);
