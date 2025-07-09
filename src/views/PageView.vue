<template>
    <div class="flex h-full">
        <LeftNavigation class="hidden xl:block" />
        <main class="grow p-2">
            <router-view class="container min-w-full"></router-view>
        </main>
    </div>
</template>
<script lang="ts" setup>
    import LeftNavigation from '@/components/layout/LeftNavigation.vue';
</script>
