<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { invoke } from '@tauri-apps/api/core';
import { useAccountStore } from '../stores/account';
import router from '../routers';

const toast = useToast();
const accountStore = useAccountStore();

async function login() {
    const result: { status: boolean; msg: string, account: Account } = await invoke("login", {
        username: username.value,
        password: password.value
    })
    if (result.status) {
        toast.add({ severity: 'success', summary: 'Login Success', detail: result.msg, life: 3000 });
        accountStore.setAccount(result.account);
        await new Promise(resolve => setTimeout(resolve, 3000));
        router.push('/dashboard');
    } else {
        toast.add({ severity: 'error', summary: 'Login Failed', detail: result.msg, life: 3000 });
    }
}

const username = ref('');
const password = ref('');
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <Card>
            <template #title>
                <h1 class="text-3xl font-bold mb-0">Login</h1>
            </template>
            <template #subtitle>
                <p class="m-0">Please enter your credentials to login</p>
            </template>
            <template #content>
                <form @submit.prevent="login" class="flex flex-col gap-4">
                    <InputText v-model="username" label="Username" placeholder="mileage" />
                    <Password class="w-full" input-class="w-full" v-model="password" label="Password" type="password"
                        placeholder="Enter your password" toggleMask />
                    <div class="flex justify-end">
                        <Button type="submit" label="Login"></Button>
                    </div>
                </form>
            </template>
        </Card>
    </div>
</template>

<style scoped></style>