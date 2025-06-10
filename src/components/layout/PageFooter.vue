<template>
    <footer class="text-l inset-x-0 bg-vca-base-500 p-4 font-serif text-white xl:px-0">
        <div
            class="container mx-auto flex flex-grow flex-wrap items-start justify-between xl:flex-nowrap">
            <a
                class="basis-full font-bold hover:text-vca-dark-500"
                :href="$t('footer.legal.copyright.url')"
                :title="$t('footer.legal.copyright.header')"
                target="_blank">
                {{ $t('footer.legal.copyright.header') }}
            </a>
            <div class="flex basis-auto flex-col">
                <a
                    class="whitespace-nowrap p-1 hover:text-vca-dark-500"
                    :href="$t('footer.legal.emission.url')"
                    :title="$t('footer.legal.emission.header')"
                    target="_blank">
                    {{ $t('footer.legal.emission.header') }}
                </a>
                <a
                    class="whitespace-nowrap p-1 hover:text-vca-dark-500"
                    :href="$t('footer.legal.security.url')"
                    :title="$t('footer.legal.security.header')"
                    target="_blank">
                    {{ $t('footer.legal.security.header') }}
                </a>
                <a
                    class="whitespace-nowrap p-1 hover:text-vca-dark-500"
                    :href="$t('footer.legal.imprint.url')"
                    :title="$t('footer.legal.imprint.header')"
                    target="_blank">
                    {{ $t('footer.legal.imprint.header') }}
                </a>
            </div>
        </div>
    </footer>

    <div class="mx-auto w-full bg-vca-dark-500 pb-2 text-center !text-white xl:hidden">
        <div class="bg-vca-dark-500 !text-white mx-auto w-fit">
            <LanguageSelection
                :type="languageType"
                :theme="ThemeTypes.dark"
                v-model="locale"
                :options="$i18n.availableLocales" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useI18n } from 'vue-i18n';
    import { LanguageSelection, ThemeTypes } from '@vivaconagua/vueca';
    import { $i18n } from '@/i18n';
    const languageType = 'text';

    const { locale } = useI18n({ useScope: 'global' });
</script>
