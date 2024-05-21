<script setup lang="ts">
import { onMounted } from 'vue';
import { useAccountStore } from '../stores/account';
import router from '../routers';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const accountStore = useAccountStore();

onMounted(async () => {
    if (accountStore.isLoggedIn()) {
        const res = await accountStore.acquire()
        if (res.status)
            router.push('/dashboard');
        else {
            accountStore.account = null;
            toast.add({ severity: 'error', summary: 'Error', detail: "Failed to acquire session: " + res.msg });
        }
    }
});
</script>

<template>
    <div class="w-full h-full">
        <Login></Login>
    </div>
</template>

<style scoped></style>