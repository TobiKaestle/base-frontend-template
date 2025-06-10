<template>
    <aside class="w-64">
        <div class="h-full overflow-y-auto bg-white py-4 shadow-right">
            <ul class="space-y-2">
                <li
                    :key="templateRoute.name"
                    v-for="templateRoute in getNavigation"
                    class="m-0 p-0">
                    <router-link
                        :title="$t('' + templateRoute?.meta?.title)"
                        :to="templateRoute.path"
                        class="block w-full p-2 transition-all duration-200"
                        active-class="bg-vca-dark-500 text-white hover:text-white hover:font-bold">
                        {{ $t('' + templateRoute?.meta?.title) }}
                    </router-link>
                </li>
            </ul>
        </div>
    </aside>
</template>
<script lang="ts" setup>
    import { navigationList } from '@/composables/navigation';
    import { computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const router = useRouter();
    const route = useRoute();

    const routeChildren = () => {
        const current = router.options.routes.find((el) => el.name == route.matched[0].name);
        if (!current || !current.children) {
            return [];
        }
        return current.children;
    };
    const getNavigation = computed(() => {
        return navigationList(routeChildren());
    });
</script>
