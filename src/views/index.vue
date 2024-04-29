<script setup lang="ts">
import Toast from 'primevue/toast';
import { onMounted } from 'vue';
import { useAccountStore } from '../stores/account';
import router from '../routers';

const accountStore = useAccountStore();

onMounted(() => {
    if (accountStore.isLoggedIn())
        router.push('/dashboard');
});
</script>

<template>
    <div class="w-full h-full">
        <Toast class="w-10rem max-w-90%"></Toast>
        <Login></Login>
    </div>
</template>

<style scoped></style>