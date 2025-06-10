<template>
    <Card>
        <Card bordered class="text-center">
            <Headline>{{ $t('messages.login.redirect') }}</Headline>
        </Card>
    </Card>
</template>
<script lang="ts">
    import { Card, Headline } from '@vivaconagua/vueca';
    import { ComponentPublicInstance, defineComponent } from 'vue';

    interface IInstance extends ComponentPublicInstance {
        setCallbackRoute(from: string): void;
    }

    export default defineComponent({
        beforeRouteEnter(to, from, next) {
            next((vm) => {
                const instance = vm as IInstance;
                instance.setCallbackRoute(from.path);
            });
        },
    });
</script>
<script lang="ts" setup>
    import { useSessionStore } from '@/stores/SessionStore';
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    const callbackRoute = ref('/');

    const setCallbackRoute = (from: string) => {
        callbackRoute.value = from;
    };
    defineExpose({ setCallbackRoute });

    const router = useRouter();

    const store = useSessionStore();
    onMounted(() => {
        if (!store.hasCurrentUser) {
            store.callbackRoute = store.routerCallback ? store.routerCallback : callbackRoute.value;
            window.location.href = store.getLoginURL + '?language=' + localStorage.language;
        } else {
            router.push({ path: '/' });
        }
    });
</script>
