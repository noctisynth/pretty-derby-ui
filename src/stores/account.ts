import { ref } from "vue";
import { defineStore } from "pinia";
import { invoke } from "@tauri-apps/api/core";

export const useAccountStore = defineStore(
  "account",
  () => {
    const account = ref<Account | null>(null);
    const disclaimed = ref(false);
    const setAccount = (newAccount: Account) => {
      account.value = newAccount;
    };
    const isLoggedIn = () => {
      return account.value !== null;
    };
    const login = async (username: string, password: string) => {
      const result: { status: boolean; msg: string; account: Account } =
        await invoke("login", {
          username,
          password,
        });
      if (result.status) {
        setAccount(result.account);
        return { status: true, msg: "Login successfully" };
      } else {
        return { status: false, msg: result.msg };
      }
    };
    const acquire = async () => {
      const result: { status: boolean; msg: string; account: Account } =
        await invoke("login", {
          username: account.value?.username,
          password: account.value?.password,
        });
      if (result.status) {
        setAccount(result.account);
        return { status: true, msg: "Login successfully" };
      } else {
        return { status: false, msg: result.msg };
      }
    };
    return {
      account,
      disclaimed,
      setAccount,
      isLoggedIn,
      login,
      acquire,
    };
  },
  {
    persist: true,
  }
);
