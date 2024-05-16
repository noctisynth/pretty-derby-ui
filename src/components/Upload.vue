<script setup lang="ts">
import { ref } from 'vue';
// import { useToast } from 'primevue/usetoast';
import { invoke } from '@tauri-apps/api/core';
import { useAccountStore } from '../stores/account';
import Button from 'primevue/button';

// const toast = useToast();
const accountStore = useAccountStore();
const msg = ref<string | null>(null);
const status = ref<boolean | null>(null);
const account = accountStore.account;

async function upload() {
    status.value = null;
    if (!mileage.value || !datetime.value) {
        status.value = false;
        msg.value = 'Please fill in all fields';
        return;
    }
    const result: { status: boolean; msg: string } = await invoke("upload", {
        account: accountStore.account,
        mileage: mileage.value,
        time: datetime.value.toLocaleString(),
    })
    console.log(result);
    status.value = result.status;
    msg.value = result.msg;
}

const mileage = ref<number>(account ? Math.min(account.daily - account.day, account.weekly - account.week, account.end) || 1 : 1);
const datetime = ref<Date | null>(null);
</script>

<template>
    <div class="max-w-full w-full flex flex-col items-center justify-center h-screen">
        <Card class="w-full max-w-md">
            <template #title>
                <h1 class="text-3xl font-bold mb-0">Upload</h1>
            </template>
            <template #subtitle>
                <p class="m-0">Upload running data to the server</p>
            </template>
            <template #content>
                <div class="flex flex-col gap-4">
                    <InputNumber inputClass="w-full" v-model="mileage" label="Mileage" placeholder="Mileage"
                        inputId="horizontal-buttons" type="float" showButtons buttonLayout="horizontal" :step="0.1"
                        suffix=" km" :minFractionDigits="1" :maxFractionDigits="1">
                        <template #incrementbuttonicon>
                            <span class="pi pi-plus"></span>
                        </template>
                        <template #decrementbuttonicon>
                            <span class="pi pi-minus"></span>
                        </template>
                    </InputNumber>
                    <Calendar placeholder="Select Date" v-model="datetime" showTime hourFormat="24" />
                    <Message class="w-full" :severity="status === null ? 'info' : status === true ? 'success' : 'error'"
                        v-if="msg" @close="msg = null">{{ msg
                        }}
                    </Message>
                    <div class="flex justify-between items-center">
                        <Button label="Logout" @click="accountStore.account = null; $router.push('/')" severity="secondary"></Button>
                        <Button type="submit" label="Upload" @click="upload"></Button>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped></style>