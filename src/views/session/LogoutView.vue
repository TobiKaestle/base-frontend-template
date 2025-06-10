<template>
    <Card>
        <Card bordered class="text-center">
            <Headline>{{ $t('messages.logout.redirect') }}</Headline>
        </Card>
    </Card>
</template>
<script lang="ts" setup>
    import { useSessionStore } from '@/stores/SessionStore';
    import { Card, Headline } from '@vivaconagua/vueca';
    import { onMounted } from 'vue';

    const store = useSessionStore();
    onMounted(() => {
        store.logout().finally(() => {
            setTimeout(() => {
                sessionStorage.clear();
                window.location.href =
                    store.login_url +
                    '/logout?callback=' +
                    window.btoa(window.location.protocol + '//' + window.location.host);
            }, 2000);
        });
    });
</script>
