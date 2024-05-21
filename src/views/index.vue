<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAccountStore } from '../stores/account';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const router = useRouter();
const accountStore = useAccountStore();

const msg = ref<string>('Please wait while we acquire your session...');
const visible = ref(false);

async function check() {
    visible.value = false;
    if (accountStore.isLoggedIn()) {
        const res = await accountStore.acquire()
        if (res.status)
            router.push('/dashboard');
        else {
            accountStore.account = null;
            toast.add({ severity: 'error', summary: 'Error', detail: "Failed to acquire session: " + res.msg });
        }
    }
    else
        router.push('/login');
}

onMounted(async () => {
    if (!accountStore.disclaimed) {
        visible.value = true;
        return;
    }
    await check();
});
</script>

<template>
    <div class="w-full h-full">
        <div class="flex flex-col gap-3rem justify-center items-center h-screen">
            <Disclaimer :v-model:visible="visible" @agreed="check"></Disclaimer>
            <ProgressSpinner />
            <span class="font-bold">{{ msg }}</span>
        </div>
    </div>
</template>

<style scoped></style>