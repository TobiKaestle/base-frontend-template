<template>
    <div class="p-2">
        <Headline :type="HeadlineType.H4">{{ $t('table.header.title') }}</Headline>
        <CustomTable :list="store.list" :labels="tableLabels" :pagination="pagination" colspan="5">
            <template #colspan>
                <col width="1%" />
                <col width="98%" />
                <col width="1%" />
            </template>
            <template #desktop-options>
                <div class="my-2">
                    <Button size="small" @click.prevent="setCreate()">
                        {{ $t('context_button.add', [$t('example.context')]) }}
                    </Button>
                </div>
            </template>
            <template #desktop-header>
                <th class="CustomTable__cell sortable" @click.prevent="pagination.sort('_id')">
                    <label> {{ $t('table.header.index') }} &varr;</label>
                </th>
                <th class="CustomTable__cell sortable" @click.prevent="pagination.sort('name')">
                    <label> {{ $t('table.header.name') }} &varr;</label>
                </th>
                <th class="CustomTable__cell">
                    <label> {{ $t('table.header.options') }} </label>
                </th>
            </template>
            <template #desktop-content>
                <tr
                    class="CustomTable__row"
                    :class="{ last: index + 1 == pagination.state.pageSize }"
                    v-for="(res, index) in pagination.getFilteredList()"
                    :key="index">
                    <td class="CustomTable__cell">
                        <label> {{ index + 1 }} </label>
                    </td>
                    <td class="CustomTable__cell">
                        <label> {{ res.name }} </label>
                    </td>
                    <td class="CustomTable__cell CustomTable__cell__options">
                        <Row>
                            <div class="h-6 w-6">
                                <div class="h-6 w-6">
                                    <button @click.prevent="viewCurrent(res)">
                                        {{ t('table.options.view') }}
                                    </button>
                                </div>
                            </div>
                            <div class="h-6 w-6">
                                <button @click.prevent="setEdit(res)">
                                    {{ t('table.options.edit') }}
                                </button>
                            </div>
                        </Row>
                    </td>
                </tr>
            </template>
            <template #mobile-filter> <div class=""></div> </template>
            <template #mobile-header>
                <div class="sortable text-left" @click.prevent="pagination.sort('name')">
                    {{ $t('table.header.name') }} &varr;
                </div>
            </template>
            <template #mobile-content>
                <tr
                    class="CustomTable__row"
                    v-for="(res, index) in pagination.getFilteredList()"
                    :key="index">
                    <td class="vca-table-cell">
                        {{ res.name }}
                    </td>
                </tr>
            </template>
        </CustomTable>
    </div>
</template>
<script setup lang="ts">
    import { useExamplesStore } from '@/stores/ExamplesStore';
    import { Example } from '@/types/Example';
    import {
        Button,
        CustomTable,
        Headline,
        HeadlineType,
        Row,
        usePagination,
    } from '@vivaconagua/vueca';
    import { computed, ref, watch } from 'vue';
    import { useI18n } from 'vue-i18n';

    const store = useExamplesStore();
    const { t } = useI18n();
    const pagination = ref(usePagination());

    const tableLabels = computed(() => {
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

    pagination.value.setList(store.list);
    pagination.value.pageSize(store.list.length);
    pagination.value.filter({ name: [] });

    watch(
        () => store.list,
        () => {
            pagination.value.setList(store.list);
            pagination.value.pageSize(store.list.length);
        },
        { deep: true }
    );

    const emptyFilter = computed(() => {
        return (
            pagination.value.state.search == '' && pagination.value.state.filter.name.length == 0
        );
    });
    pagination.value.state.filterCallback = (value: any, index: number) => {
        // If the filter is empty, everything is fine
        value.index = index + 1;
        if (emptyFilter.value) {
            return true;
        }

        // Apply filter, make sure to just return false values here
        if (
            pagination.value.state.filter.name.length > 0 &&
            !pagination.value.state.filter.name.includes(value.name)
        ) {
            return false;
        }

        // Filter for the current value of row.full_name etc.
        return value.name?.toLowerCase().indexOf(pagination.value.state.search.toLowerCase()) > -1;
    };

    const setEdit = (value: Example) => {
        store.doEdit = true;
        store.current = value;
        store.edit = JSON.parse(JSON.stringify(store.current));
    };
    const viewCurrent = (value: Example) => {
        store.doView = true;
        store.current = value;
    };
    const setCreate = () => {
        store.doCreate = true;
    };

    /*const getName = computed(() => {
        return [...new Set(store.list.map((el) => el.name))];
    });*/
</script>
