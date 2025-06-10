<template>
    <Card class="flex flex-col">
        <PageLogo />
        <Headline class="text-center" :type="HeadlineType.H1">{{ $t('home.portal') }}</Headline>
        <div>
            <Button
                class="m-auto flex"
                :type="ButtonType.Outline"
                @click="showInfo = true"
                :size="ButtonSize.Small">
                {{ $t('button.more_infos') }}
            </Button>
        </div>
    </Card>
    <Popup
        :show="showInfo == true"
        @close="showInfo = false"
        v-if="showInfo == true"
        :title="$t('home.portal')">
        <p v-html="$t('home.more')"></p>
    </Popup>
</template>
<script setup lang="ts">
    import PageLogo from '@/components/layout/PageLogo.vue';
    import { useSessionStore } from '@/stores/SessionStore';
    import {
        Button,
        ButtonSize,
        ButtonType,
        Card,
        Headline,
        HeadlineType,
        Popup,
    } from '@vivaconagua/vueca';
    import { onMounted, ref } from 'vue';

    const store = useSessionStore();

    const showInfo = ref(false);
    onMounted(() => {
        // eslint-disable-next-line
        store.refresh().catch(() => {});
    });
</script>
