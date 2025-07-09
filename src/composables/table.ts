import { computed } from 'vue';

export const tableLabels = computed(() => (t: any) => {
    return {
        search: t('table.search'),
        page_no_results: t('table.page.no_results'),
        page_label: t('table.page.label'),
        page_size: t('table.page.size'),
        page_first: t('table.page.first'),
        page_prev: t('table.page.back'),
        page_next: t('table.page.next'),
        page_last: t('table.page.last'),
    };
});
