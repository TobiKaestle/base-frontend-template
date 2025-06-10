<template>
    <Card>
        <Card bordered class="text-center">
            <Headline>{{ $t('messages.callback.redirect') }}</Headline>
        </Card>
    </Card>
</template>
<script lang="ts" setup>
    import { useSessionStore } from '@/stores/SessionStore';
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { Headline, Card } from '@vivaconagua/vueca';
    const store = useSessionStore();
    const router = useRouter();

    interface Props {
        code?: string;
    }
    const props = defineProps<Props>();

    onMounted(() => {
        store.callback({ code: props.code }).finally(() => {
            router.push({ path: store.callbackRoute });
        });
    });
</script>
