<template>
    <div id="app" class="flex h-screen flex-col" :class="getTheme">
        <notifications position="top center" width="100%" />
        <TopNavigation v-if="!store.hideNavigation" class="!hidden bg-white xl:!inline" />
        <MobilNavigation v-if="!store.hideNavigation" class="!inline xl:!hidden" />
        <div id="app_content" class="mt-16 xl:mt-20 grow bg-white">
            <BreadCrumbs v-if="!store.hideNavigation" class="block" />
            <router-view />
        </div>
        <Footer id="app_footer" />
    </div>
</template>
<script setup lang="ts">
    import Footer from '@/components/layout/PageFooter.vue';
    import TopNavigation from '@/components/layout/TopNavigation.vue';
    import { useTheme } from '@vivaconagua/vueca';
    import { computed, onMounted, watch } from 'vue';
    import { useI18n } from 'vue-i18n';
    import BreadCrumbs from './components/layout/BreadCrumbs.vue';
    import MobilNavigation from './components/layout/MobilNavigation.vue';
    import { useMainStore } from './stores/MainStore';
    import { useSessionStore } from './stores/SessionStore';

    const store = useMainStore();
    const sessionStore = useSessionStore();
    const { locale } = useI18n({ useScope: 'global' });
    onMounted(() => {
        if (sessionStore.language != '') {
            locale.value = sessionStore.language;
        } else {
            sessionStore.language = locale.value as string;
        }
    });

    watch(
        () => locale,
        (value) => {
            sessionStore.language = value.value as string;
        },
        { deep: true }
    );

    const getTheme = computed(() => {
        return useTheme.getTheme();
    });
</script>
