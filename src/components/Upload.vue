<script setup lang="ts">
import { ref } from 'vue';
// import { useToast } from 'primevue/usetoast';
import { invoke } from '@tauri-apps/api/core';
import { useAccountStore } from '../stores/account';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

function formatDate(date: Date) {
    const pad = (number: number) => (number < 10 ? '0' + number : number);

    return (
        date.getFullYear() + '/' +
        pad(date.getMonth() + 1) + '/' + // getMonth() 返回的月份是从0开始的，所以需要+1
        pad(date.getDate()) + ' ' +
        pad(date.getHours()) + ':' +
        pad(date.getMinutes()) + ':' +
        pad(date.getSeconds())
    );
}

// const toast = useToast();
const accountStore = useAccountStore();
const msg = ref<string | null>(null);
const status = ref<boolean | null>(null);
const router = useRouter();

// Generate random number between min and max
const random = (min: any, max: any) => Math.floor(Math.random() * (max - min + 1) + min)

async function upload() {
    status.value = null;
    if (!mileage.value || !datetime.value) {
        status.value = false;
        msg.value = 'Please fill in all fields';
        return;
    }
    datetime.value.setSeconds(random(0, 59))
    const result: { status: boolean; msg: string } = await invoke("upload", {
        mileage: mileage.value,
        time: formatDate(datetime.value),
    })
    console.log(result);
    status.value = result.status;
    msg.value = result.msg;
}

const mileage = ref<number>(2);
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
                    <Calendar placeholder="Select Date" v-model="datetime" showTime hourFormat="24" showIcon />
                    <Message class="w-full" :severity="status === null ? 'info' : status === true ? 'success' : 'error'"
                        v-if="msg" @close="msg = null">{{ msg
                        }}
                    </Message>
                    <div class="flex justify-between items-center">
                        <Button label="Logout" @click="accountStore.account = null; router.push('/')"
                            severity="secondary"></Button>
                        <Button type="submit" label="Upload" @click="upload"></Button>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped></style>