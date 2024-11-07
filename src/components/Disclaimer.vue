<script setup lang="ts">
import { marked } from "marked";
import { onMounted, ref } from "vue";
import { useAccountStore } from "../stores/account";
import { exit } from '@tauri-apps/plugin-process';

const emit = defineEmits(['agreed'])
const model = defineModel<boolean>('visible')

const text = `
**Software Disclaimer**

This software is open source, developed by Noctisynth and provided as open source. Open source software
allows users to freely use, copy, modify, and distribute copies of this software, but must comply with the
corresponding open source license agreement. Users should carefully read and comply with the open source
license agreement attached to the software.

All rights to this software are owned by Noctisynth and Fay Ash. Unauthorized copying, modification,
distribution, or commercial use of this software is strictly prohibited. Violations of copyright law
will be subject to legal sanctions.

Users explicitly understand and agree that the authors and contributors shall not be held liable for any
loss or damage arising from the use, download, or reliance on any version of this software, including but
not limited to data loss, system failures, hardware damage, or any other form of damage. This software is
provided "as is" without any form of express or implied warranties. In no event shall the developers be
liable for any direct, indirect, incidental, special, punitive, or consequential damages arising from the
use or inability to use this software, even if they have been advised of the possibility of such damages.

By downloading or using this software, you signify that you have read, understood, and agree to accept all
terms and conditions of this disclaimer. If you do not agree with these terms, do not download, install, or
use this software.

This disclaimer applies to all versions of this software, including but not limited to previous versions.
Regardless of which version you are using, you must comply with the provisions of this disclaimer.

Copyright © 2011-PRESENT [Noctisynth, org](https://github.com/noctisynth). All rights reserved.

`

const html = ref<string | null>();

const visible = ref<boolean>(model.value !== undefined ? model.value : true);

const accountStore = useAccountStore();

function onAgree() {
    visible.value = false;
    accountStore.disclaimed = true;
    emit('agreed');
}

onMounted(() => {
    html.value = marked(text).toString();
});
</script>

<template>
    <Dialog class="w-full max-w-md" :visible="visible" modal :showHeader="false" :closable="false">
        <ScrollPanel class="my-2rem px-1">
            <p>
                <span v-html="html"></span>
            </p>
            <div class="flex justify-between items-center mt-2.5rem">
                <Button @click="exit(0)" severity="danger">Exit</Button>
                <Button @click="onAgree">I Agree</Button>
            </div>
        </ScrollPanel>
    </Dialog>
</template>

<style scoped></style>